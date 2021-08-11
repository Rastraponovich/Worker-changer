import { ICommandResult, IStatus, IWorker } from "interfaces/types"
import {
    WorkerActionTypes,
    WorkerAction,
    WorkerState,
} from "interfaces/workerType"

const defaultWoker: IWorker = {
    genTaxPayerIdNum: null,
    Code: null,
    Ident: null,
    Name: "",
    OfficialName: "",
    Status: "",
    GUIDString: "",
} as IWorker

const initialState: WorkerState = {
    workers: [],
    status: {} as IStatus,
    commandResult: {} as ICommandResult,
    currentIPWorker: defaultWoker,
    currentOOOWorker: defaultWoker,
    isOpenModal: false,
    reload: false,
    workerInfo: {} as IWorker,
}

export const workerReducer = (
    state = initialState,
    action: WorkerAction
): WorkerState => {
    switch (action.type) {
        case WorkerActionTypes.GET_ALL_WORKERS_ERROR:
            return {
                ...state,
                error: action.payload.isError,
                message: action.payload.errorMessage,
            }

        case WorkerActionTypes.GET_ALL_WORKERS:
            return {
                ...state,
                ...action.payload,
                reload: false,
                error: false,
                currentOOOWorker: action.payload.workers.find(
                    (item) => item.Name === "Кассир ООО"
                ),
                currentIPWorker: action.payload.workers.find(
                    (item) => item.Name === "Кассир ИП"
                ),
                message: "",
            }
        case WorkerActionTypes.GET_ONE_WORKER:
            return {
                ...state,
                isOpenModal: true,
                workerInfo: action.payload.worker,
            }

        case WorkerActionTypes.SAVE_WORKER:
            return {
                ...state,
                reload: true,
                // selectedWorkers: {...state.selectedWorkers, ...action.payload}
            }
        case WorkerActionTypes.SHOW_MODAL:
            return {
                ...state,
                isOpenModal: true,
            }

        case WorkerActionTypes.CLOSE_MODAL:
            return {
                ...state,
                isOpenModal: false,
            }
        default:
            return state
    }
}
