import { IWorker } from "../interfaces/types"

import { v4 } from "uuid"

export const getEmployeesByGuid = (guid: string | string[]) => {
    return `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="GetRefData" RefName="Employees" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
        <PROPFILTERS>
            <PROPFILTER name="GUIDString" value="${guid}" />
        </PROPFILTERS>
    </RK7Command2>
    </RK7Query>`
}

export const getEmployeesByName = (name: string, parentIdent: string) => {
    return `<?xml version="1.0" encoding="utf-8"?>
  <RK7Query>
    <RK7Command2 CMD="GetRefData" RefName="Employees" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
      <PROPFILTERS>
          <PROPFILTER name="Name" value="${name}" />
          <PROPFILTER name="MainParentIdent" value="${parentIdent}" />

      </PROPFILTERS>
  </RK7Command2>
  </RK7Query>`
}

export const getEmployees = () => `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="${process.env.MAINPARENTIDENT}"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`

export const setWorker = (worker: IWorker) => {
    return `<?xml version="1.0" encoding="utf-8"?>
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
}

export const createWorker = (name: string, parentIdent: string) => {
    const guid = v4()
    return `<?xml version="1.0" encoding="utf-8"?>
  <RK7Query>
    <RK7Command2 CMD="SetRefData" RefName="Employees">
      <Items>
          <Item 
          MainParentIdent="${parentIdent}"
            GUIDString="{${guid}}" 
            Name="${name}"
            Status="rsActive"
            genTaxPayerIdNum=""
            OfficialName=""/>
      </Items>
  </RK7Command2>
</RK7Query>`
}

export const getSystemInfo = () => `<?xml version="1.0" encoding="utf-8"?>
<RK7Query>
  <RK7Command2 CMD="GetSystemInfo" />
 
</RK7Query>`
