import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

import {
    IWorker,
    IWorkerChangeRespose,
    IWorkerGetInfoResult,
} from "interfaces/types"
import { WorkerAction, WorkerActionTypes } from "interfaces/workerType"

// import { showInformAction } from "./informActions"
// const SERVER = process.env.NEXT_PUBLIC_SERVER
// const PORT = process.env.NEXT_PUBLIC_PORT

export const getAllWorkersAction = (params?: any) => {
    return async (dispatch: Dispatch<WorkerAction>) => {
        try {
            const response = await axios.get(`/api/workers`)

            dispatch({
                type: WorkerActionTypes.GET_ALL_WORKERS,
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: WorkerActionTypes.GET_ALL_WORKERS_ERROR,
                payload: {
                    error: true,
                    message: "Произошла ошибка загрузки пользователей",
                },
            })
        }
    }
}

export const getOneWorkerAction = (guid: string) => {
    return async (dispatch: Dispatch<WorkerAction>) => {
        try {
            const response: AxiosResponse<IWorkerGetInfoResult> = await axios.get(
                `/api/workers/${guid}`
            )
            dispatch({
                type: WorkerActionTypes.GET_ONE_WORKER,
                payload: response.data,
            })
        } catch (error) {
            dispatch({
                type: WorkerActionTypes.GET_ONE_WORKER_ERROR,
                payload: {
                    error: true,
                    message: "Произошла ошибка загрузки пользователя",
                },
            })
        }
    }
}

export const saveWorkerAction = (worker: IWorker) => {
    return async (dispatch: Dispatch<WorkerAction>) => {
        try {
            const response: AxiosResponse<IWorkerChangeRespose> = await axios.post(
                `/api/setworker`,
                { worker }
            )
            dispatch({
                type: WorkerActionTypes.SAVE_WORKER,
            })
        } catch (error) {
            dispatch({
                type: WorkerActionTypes.SAVE_WORKER_ERROR,
                payload: {
                    error: true,
                    message: "Произошла ошибка загрузки пользователя",
                },
            })
        }
    }
}

export const closeModalAction = (): WorkerAction => ({
    type: WorkerActionTypes.CLOSE_MODAL,
})
