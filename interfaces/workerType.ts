import { ICommandResult, IStatus, IWorker, IWorkerGetInfoResult } from "./types"

export interface WorkerState {
    workers: IWorker[]
    currentOOOWorker: IWorker
    currentIPWorker: IWorker
    status: IStatus
    commandResult: ICommandResult
    isOpenModal: boolean
    error?: boolean
    reload?: boolean
    message?: string
    workerInfo: IWorker
    loading: boolean
}

export enum WorkerActionTypes {
    GET_ALL_WORKERS = "GET_ALL_WORKERS",
    GET_ALL_WORKERS_ERROR = "GET_ALL_WORKERS_ERROR",
    GET_ONE_WORKER = "GET_ONE_WORKER",
    GET_ONE_WORKER_ERROR = "GET_ONE_WORKER_ERROR",
    SAVE_WORKER = "SAVE_WORKER",
    SAVE_WORKER_ERROR = "SAVE_WORKER_ERROR",
    SELECT_WORKER = "SELECT_WORKER",
    SELECT_WORKER_ERROR = "SELECT_WORKER_ERROR",
    SHOW_MODAL = "SHOW_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
}

interface getOneAction {
    type: WorkerActionTypes.GET_ONE_WORKER
    payload: IWorkerGetInfoResult
}

interface getOneErrorAction {
    type: WorkerActionTypes.GET_ONE_WORKER_ERROR
    payload: any
}

interface getAllAction {
    type: WorkerActionTypes.GET_ALL_WORKERS
    payload: {
        workers: IWorker[]
        commandResult: ICommandResult
    }
}

interface getAllErrorAction {
    type: WorkerActionTypes.GET_ALL_WORKERS_ERROR
    payload: any
}

// interface selectWorkerAction {
//     type: WorkerActionTypes.SELECT_WORKER
//     payload: IWorker
// }

// interface selectWorkerErrorAction {
//     type: WorkerActionTypes.SELECT_WORKER_ERROR
//     payload: any
// }

interface showModalAction {
    type: WorkerActionTypes.SHOW_MODAL
}

interface closeModalAction {
    type: WorkerActionTypes.CLOSE_MODAL
}

interface saveWorkerAction {
    type: WorkerActionTypes.SAVE_WORKER
}

interface saveWorkerErrorAction {
    type: WorkerActionTypes.SAVE_WORKER_ERROR
    payload: any
}

export type WorkerAction =
    | getAllErrorAction
    | getOneAction
    | getOneErrorAction
    | getAllAction
    // | selectWorkerAction
    // | selectWorkerErrorAction
    | saveWorkerAction
    | saveWorkerErrorAction
    | showModalAction
    | closeModalAction
