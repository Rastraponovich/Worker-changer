import {
    ISettings,
    MainAction,
    MainActionTypes,
} from "@/interfaces/mainStoreType"
import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

export const startInitAction = (): MainAction => ({
    type: MainActionTypes.START_INIT,
})
export const getSettinsAciton = () => {
    return async (dispatch: Dispatch<MainAction>) => {
        try {
            const response: AxiosResponse<ISettings[]> = await axios.get(
                `/api/settings`
            )

            dispatch({
                type: MainActionTypes.GET_SETTINGS,
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const saveSettinsAciton = (settings: ISettings) => {
    return async (dispatch: Dispatch<MainAction>) => {
        try {
            const response: AxiosResponse<ISettings> = await axios.post(
                `/api/settings`,
                settings
            )

            dispatch({
                type: MainActionTypes.SAVE_SETTINGS,
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}
