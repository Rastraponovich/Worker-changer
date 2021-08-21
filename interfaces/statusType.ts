import { ICommandResult, IStatus, IStatusResponse } from "./types"

export interface StatusState {
    status: IStatus
    isOpenModal: boolean
    commandResult: ICommandResult
    error?: boolean
    message?: string
}

export enum StatusActionTypes {
    GET_STATUS = "GET_STATUS",
    GET_STATUS_ERROR = "GET_STATUS_ERROR",
    REFRESH_STATUS = "REFRESH_STATUS",
    REFRESH_STATUS_ERROR = "REFRESH_STATUS_ERROR",
}

interface getStatusAction {
    type: StatusActionTypes.GET_STATUS
    payload: IStatusResponse
}

interface getStatusErrorAction {
    type: StatusActionTypes.GET_STATUS_ERROR
    payload: any
}

interface refreshStatusAction {
    type: StatusActionTypes.REFRESH_STATUS
    payload?: any
}

interface refreshStatueErrorAction {
    type: StatusActionTypes.REFRESH_STATUS_ERROR
    payload?: any
}

export type StatusAction =
    | getStatusAction
    | getStatusErrorAction
    | refreshStatusAction
    | refreshStatueErrorAction
