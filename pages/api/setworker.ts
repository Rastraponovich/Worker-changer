import { NextApiRequest, NextApiResponse } from "next"
import { IAuth, IWorker } from "../../types/types"
import { sendData } from "../../hooks/useGetData"
import { useParser } from "../../hooks/usePareser"

const handleSave = async (worker: IWorker) => {
    const xmlQuery = `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="SetRefData" RefName="Employees">
        <Items>
            <Item 
              GUIDString="${worker.GUIDString}" 
              genTaxPayerIdNum="${worker.genTaxPayerIdNum}"
              OfficialName="${worker.OfficialName}"/>
        </Items>
    </RK7Command2>
  </RK7Query>`
    return await sendData(xmlQuery)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { worker } = req.body
    if (worker.GUIDString === "") {
        return res.status(200).json({ commandResult: { Status: "noChanges" } })
    }
    const result = useParser(await handleSave(worker))
    if (result?.RK7QueryResult) {
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]

        res.status(200).json({ queryResult, commandResult: CommandResult[0] })
    } else {
        res.status(500)
    }
}
