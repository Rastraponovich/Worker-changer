export interface IWorker {
    genTaxPayerIdNum?: number
    Code: number
    Ident: number
    Name: string
    OfficialName?: string
    Status: string
    GUIDString: string
}

export interface IAuth {
    username: string
    password: string
}

export interface InputProps {
    workers: IWorker[]
    status: {}
    commandResult: {}
    host: string
    username: string
}

interface ICommandResult {
    CMD: string
    SourceCommand: []
    DateTime: Date
    ErrorText: string
    Status: string
    WorkTime: number
}
interface IQueryResult {
    ServerVersion: string
    XmlVersion: number
    NetName: string
    Status: string
    Processed: number
    ArrivalDateTime: Date
}

export interface IWorkerChangeRespose {
    commandResult: ICommandResult
    queryResult: IQueryResult
}
