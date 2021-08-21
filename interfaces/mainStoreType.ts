export interface MainState {
    noFooter: boolean
    init: boolean
    hasConfig: boolean
    error?: boolean
    message?: string
    settings: ISettings[]
    currentSettings: ISettings
    currentSettingsId: number
}

export interface ISettings {
    id: number
    name: string
    login: string
    mainParentIdent: number
    password: string
    port: number
    ref: string
    url: string
    isActive: boolean
    selected: boolean
}

export enum MainActionTypes {
    START_INIT = "START_INIT",
    GET_SETTINGS = "GET_SETTINGS",
    SAVE_SETTINGS = "SAVE_SETTINGS",
}

interface startInitMainAction {
    type: MainActionTypes.START_INIT
}

interface saveSettingsMainAction {
    type: MainActionTypes.SAVE_SETTINGS
    payload: ISettings
}

interface getSettingsMainAction {
    type: MainActionTypes.GET_SETTINGS
    payload: ISettings[]
}

export type MainAction =
    | startInitMainAction
    | getSettingsMainAction
    | saveSettingsMainAction
