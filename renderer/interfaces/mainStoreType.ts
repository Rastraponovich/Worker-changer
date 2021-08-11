export interface MainState {
    noFooter: boolean
    init: boolean
    hasConfig: boolean
    error?: boolean
    message?: string
}

export enum MainActionTypes {
    START_INIT = "START_INIT",
}

interface startInitMainAction {
    type: MainActionTypes.START_INIT
}

export type MainAction = startInitMainAction
