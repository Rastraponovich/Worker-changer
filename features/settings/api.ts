import { TSettings } from "@/interfaces/settings"
import { AxiosResponse } from "axios"
import { createEffect } from "effector"
import { SettingsAPI } from "features/api"

export const getSettingsFx = createEffect<null, AxiosResponse<TSettings[]>, Error>(SettingsAPI.GetSettingsAPI)
export const createNewSettingsFx = createEffect<TSettings, AxiosResponse<any>, Error>(SettingsAPI.CreateNewSettingsAPI)
export const deleteSettingsFx = createEffect<string, AxiosResponse<any>, Error>(SettingsAPI.DeleteSettingsAPI)
export const updateSettingsFx = createEffect<TSettings, AxiosResponse<any>, Error>(SettingsAPI.UpdateSettingsAPI)
export const getOneSettingsFx = createEffect<string, AxiosResponse<TSettings>, Error>(SettingsAPI.GetOneSettingsAPI)
