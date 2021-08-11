import {
    StatusAction,
    StatusActionTypes,
    StatusState,
} from "interfaces/statusType"
import { ICommandResult, IStatus } from "interfaces/types"

const defaultStatus: IStatus = {} as IStatus

const initialState: StatusState = {
    isOpenModal: false,
    message: "",
    status: {} as IStatus,
    commandResult: {} as ICommandResult,
    error: false,
}

export const statusReducer = (
    state = initialState,
    action: StatusAction
): StatusState => {
    switch (action.type) {
        case StatusActionTypes.GET_STATUS:
            return {
                ...state,
                status: action.payload.queryResult,
                commandResult: action.payload.commandResult,
                error: action.payload.error,
                message: action.payload.message,
            }

        case StatusActionTypes.GET_STATUS_ERROR:
            return {
                ...state,
                status: { Status: "нет связи" } as IStatus,
                commandResult: {} as ICommandResult,
                error: true,
                message: action.payload,
            }
        case StatusActionTypes.REFRESH_STATUS:
            return {
                ...state,
            }
        case StatusActionTypes.REFRESH_STATUS_ERROR:
            return {
                ...state,
            }

        default:
            return state
    }
}
