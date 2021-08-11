import {
    MainAction,
    MainActionTypes,
    MainState,
} from "@/interfaces/mainStoreType"

const initialState: MainState = {
    init: false,
    noFooter: true,
    hasConfig: false,
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

        default:
            return state
    }
}
