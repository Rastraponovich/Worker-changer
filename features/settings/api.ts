import { TSettings } from "@/interfaces/settings"
import { AxiosResponse } from "axios"
import { createEffect } from "effector"
import { iternalAPI } from "lib/api"

const GetSettingsAPI = async () => await iternalAPI.get("/settings")

const GetOneSettingsAPI = async (id: string) =>
    await iternalAPI.get(`/settings/${id}`)

const UpdateSettingsAPI = async (settings: TSettings) =>
    await iternalAPI.patch(`/settings/${settings.id}`, settings)

const CreateNewSettingsAPI = async (settings: TSettings) =>
    await iternalAPI.post("/settings", settings)

const DeleteSettingsAPI = async (id: string) =>
    await iternalAPI.delete(`/settings/${id}`)

export const getSettingsFx = createEffect<
    null,
    AxiosResponse<TSettings[]>,
    Error
>(GetSettingsAPI)
export const createNewSettingsFx = createEffect<
    TSettings,
    AxiosResponse<any>,
    Error
>(CreateNewSettingsAPI)
export const deleteSettingsFx = createEffect<string, AxiosResponse<any>, Error>(
    DeleteSettingsAPI
)

export const updateSettingsFx = createEffect<
    TSettings,
    AxiosResponse<any>,
    Error
>(UpdateSettingsAPI)

export const getOneSettingsFx = createEffect<
    string,
    AxiosResponse<TSettings>,
    Error
>(GetOneSettingsAPI)
