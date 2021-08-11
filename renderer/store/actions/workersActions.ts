import { sendData } from "@/hooks/useGetData"
import { getEmployees } from "@/schemas/schema"
import {
    IEmployeesData,
    IWorker,
    IWorkerChangeRespose,
    IWorkerGetInfoResult,
} from "interfaces/types"
import { WorkerAction, WorkerActionTypes } from "interfaces/workerType"
import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { useStore } from "react-redux"
// import { showInformAction } from "./informActions"
// const SERVER = process.env.NEXT_PUBLIC_SERVER
// const PORT = process.env.NEXT_PUBLIC_PORT
const SERVER = "localhost"
const PORT = 3001

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
            console.log(response.data)
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
            console.log(response.data)
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

// export const deleteAllUsersAction = () => {
//     return async (dispatch: Dispatch<UserAction | InformAction>) => {
//         try {
//             const response: AxiosResponse<number> = await axios.delete(
//                 `http://${SERVER}:${PORT}/users`
//             )
//             dispatch({
//                 type: InformActionTypes.SHOW_INFORM,
//                 payload: {
//                     type: "inform",
//                     message: `${response.data} Удалены`,
//                     source: "common",
//                 },
//             })
//             dispatch({
//                 type: UserActionTypes.DELETE_ALL_USERS,
//                 payload: response.data,
//             })
//         } catch (error) {
//             dispatch({
//                 type: UserActionTypes.GET_ONE_USER_ERROR,
//                 payload: {
//                     isError: true,
//                     errorMessage: error,
//                 },
//             })
//         }
//     }
// }

// export const deleteOneUserAction = (user: IUser) => {
//     return async (dispatch: Dispatch<UserAction | InformAction>) => {
//         try {
//             const response: AxiosResponse<number> = await axios.delete(
//                 `http://${SERVER}:${PORT}/users/${user.id}`
//             )
//             dispatch({
//                 type: InformActionTypes.SHOW_INFORM,
//                 payload: {
//                     type: "inform",
//                     message: `${user.email} Удален`,
//                     source: "common",
//                 },
//             })
//             dispatch({
//                 type: UserActionTypes.DELETE_ONE_USER,
//                 payload: response.data,
//             })
//         } catch (error) {
//             dispatch({
//                 type: UserActionTypes.GET_ONE_USER_ERROR,
//                 payload: {
//                     isError: true,
//                     errorMessage: error,
//                 },
//             })
//         }
//     }
// }

// export const modifyUserAction = (user: IUser) => {
//     return async (dispatch: Dispatch<UserAction>) => {
//         try {
//             const response = await axios.patch(
//                 `http://${SERVER}:${PORT}/users/${user.id}`,
//                 user
//             )
//             dispatch({
//                 type: UserActionTypes.MODIFY_USER,
//                 payload: response.data,
//             })
//         } catch (error) {
//             dispatch({
//                 type: UserActionTypes.GET_ONE_USER_ERROR,
//                 payload: {
//                     isError: true,
//                     errorMessage: "Произошла ошибка загрузки пользователя",
//                 },
//             })
//         }
//     }
// }

// export const addUserAction = (user: IUser) => {
//     return async (dispatch: Dispatch<UserAction | InformAction>) => {
//         try {
//             const response: AxiosResponse<IUser> = await axios.post(
//                 `http://${SERVER}:${PORT}/users`,
//                 user
//             )
//             dispatch({
//                 type: InformActionTypes.SHOW_INFORM,
//                 payload: {
//                     type: "inform",
//                     message: `${response.data.email} создан`,
//                     source: "common",
//                 },
//             })
//             dispatch({
//                 type: UserActionTypes.ADD_USER,
//                 payload: response.data,
//             })
//         } catch (error) {
//             dispatch({
//                 type: UserActionTypes.GET_ONE_USER_ERROR,
//                 payload: {
//                     isError: true,
//                     errorMessage: "Произошла ошибка загрузки пользователя",
//                 },
//             })
//         }
//     }
// }

// export const selectWorkerAction = (worker: IWorker): WorkerAction => ({
//     type: WorkerActionTypes.SELECT_WORKER,
//     payload: worker,
// })

export const closeModalAction = (): WorkerAction => ({
    type: WorkerActionTypes.CLOSE_MODAL,
})
