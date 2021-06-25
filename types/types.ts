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

export interface IStatus {
    ArrivalDateTime?: Date
    NetName?: string
    Processed: number
    XmlVersion?: number
    ServerVersion?: string
    Status?: string
}

export interface InputProps {
    workers: IWorker[]
    status: IStatus
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
export interface IQueryResult {
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

export interface ParserInputProps {
    (xmlData: string): any
}
