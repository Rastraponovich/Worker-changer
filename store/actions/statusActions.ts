import { StatusAction, StatusActionTypes } from "@/interfaces/statusType"
import { IStatus, IStatusResponse } from "@/interfaces/types"
import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

export const getStatusAction = () => {
    return async (dispatch: Dispatch<StatusAction>) => {
        try {
            const response: AxiosResponse<IStatusResponse> = await axios.get(
                `/api/status`
            )

            if (response.data.error) {
                dispatch({
                    type: StatusActionTypes.GET_STATUS_ERROR,
                    payload: {
                        error: true,
                        message: "Произошла ошибка",
                    },
                })
            } else {
                dispatch({
                    type: StatusActionTypes.GET_STATUS,
                    payload: response.data,
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: StatusActionTypes.GET_STATUS_ERROR,
                payload: {
                    error: true,
                    message: "Произошла ошибка загрузки пользователей",
                },
            })
        }
    }
}
