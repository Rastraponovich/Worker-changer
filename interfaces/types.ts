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

export interface ICommandResult {
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
    commandResult?: ICommandResult
    queryResult?: IQueryResult
    error: boolean
    message: string
}

export interface ParserInputProps {
    (xmlData: string): any
}

export interface IEmployeesData {
    error: boolean
    data: string
    isAxiosError?: boolean
    code?: string | number
}

export interface IResponse {
    error: boolean
    data: string
    isAxiosError: boolean
    code: null | number | string
}

export interface IStatusResponse {
    error: boolean
    message: string
    queryResult?: IQueryResult
    commandResult?: ICommandResult
}

export interface IWorkersResponse {
    workers: IWorker[]
    commandResult: ICommandResult
    status?: IStatus
    error: boolean
    isAxiosError: boolean
}

export interface IWorkerGetInfoResult {
    queryResult: IQueryResult
    worker: IWorker
    error?: boolean
    message?: boolean
}

export interface ICasierResponse extends IResponse {
    message: string
}

export type TButtonType = "getinfo" | "get" | "set" | "err"
