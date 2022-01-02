import {
    CommandResult,
    RK7QueryResult,
    RK7Reference,
    SystemInfo,
} from "./rk7Api"

export type ParsedSystemInfo = {
    RK7QueryResult: RK7QueryResult
}

export type ParsedGetWorkers<T = any> = {
    RK7QueryResult: {
        CommandResult: {
            RK7Reference: RK7Reference<T>
        } & CommandResult
    } & RK7QueryResult
}

export type ParsedSetWorkerResponse = {
    RK7QueryResult: RK7QueryResult
}
