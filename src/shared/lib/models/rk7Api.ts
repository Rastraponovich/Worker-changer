export interface RK7QueryResult {
    ServerVersion: string
    XmlVersion: number
    NetName: string
    Status: string
    Processed: number
    ArrivalDateTime: string
    CommandResult: CommandResult
}

export interface CommandResult {
    CMD: string
    Status: string
    ErrorText: string
    DateTime: string
    WorkTime: number
    SourceCommand?: SourceCommand
    SystemInfo?: SystemInfo
}

export type SourceCommand = {
    RK7Command2: { CMD: string }
}

export type SystemInfo = {
    SystemTime: number
    ReqSysVer: number
    NetName: string
    ProcessID: number
}

export type RK7Reference<T> = {
    DataVersion?: number
    ClassName?: string
    Items: { Item: T[] }
}
