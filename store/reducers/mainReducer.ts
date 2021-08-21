import {
    ISettings,
    MainAction,
    MainActionTypes,
    MainState,
} from "@/interfaces/mainStoreType"

const initialState: MainState = {
    init: false,
    noFooter: true,
    hasConfig: false,
    settings: [],
    currentSettingsId: null,
    currentSettings: {} as ISettings,
}

export const mainReducer = (
    state = initialState,
    action: MainAction
): MainState => {
    switch (action.type) {
        case MainActionTypes.START_INIT:
            return {
                ...state,
                init: !state.init,
            }

        case MainActionTypes.SAVE_SETTINGS:
            return {
                ...state,
                currentSettings: action.payload,
                currentSettingsId: action.payload.id,
            }

        case MainActionTypes.GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                currentSettings: action.payload.find((item) => item.selected),
                currentSettingsId: action.payload.find((item) => item.selected)
                    .id,
            }
        default:
            return state
    }
}
