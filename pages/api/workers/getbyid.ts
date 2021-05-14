import { NextApiRequest, NextApiResponse } from "next"
import { sendData } from "../../../hooks/useGetData"
import { useParser } from "../../../hooks/usePareser"

const getUserByGuid = async (guid: string | string[]) => {
    const xmlQuery = `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="GetRefData" RefName="Employees" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
        <PROPFILTERS>
            <PROPFILTER name="GUIDString" value="${guid}" />
        </PROPFILTERS>
    </RK7Command2>
  </RK7Query>`
    return await sendData(xmlQuery)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result = useParser(await getUserByGuid(req.query.guid))
    if (result?.RK7QueryResult) {
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]

        res.status(200).json({
            queryResult,
            commandResult,
            RK7Reference: RK7Reference[0],
            sourceCommand: SourceCommand[0],
        })
    } else {
        res.status(500)
    }
}
