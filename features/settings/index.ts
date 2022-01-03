import { TSettings } from "@/interfaces/settings"
import { AxiosResponse } from "axios"
import {
    createApi,
    createEffect,
    createEvent,
    createStore,
    Event,
    forward,
    sample,
} from "effector"
import { iternalAPI } from "lib/api"
import { ChangeEvent } from "react"

const GetSettingsAPI = async () => await iternalAPI.get("/settings")

const GetOneSettingsAPI = async (id: string) =>
    await iternalAPI.get(`/settings/${id}`)

const getSettings = createEvent()
const getSettingsFx = createEffect<never, AxiosResponse<TSettings[]>, Error>(
    GetSettingsAPI
)

const $settings = createStore<TSettings[]>([])

forward({
    from: getSettings,
    to: getSettingsFx,
})

sample({
    clock: getSettingsFx.doneData,
    fn: (res) => res.data,
    target: $settings,
})

const getOneSettings = createEvent<string>()

const getOneSettingsFx = createEffect<string, AxiosResponse<TSettings>, Error>(
    GetOneSettingsAPI
)

const $selectedSetting = createStore<TSettings>({} as TSettings)

const changeSelectedSetting = createEvent<ChangeEvent<HTMLInputElement>>()
const changeSelectedCheckBoxSetting =
    createEvent<ChangeEvent<HTMLInputElement>>()

forward({
    from: getOneSettings,
    to: getOneSettingsFx,
})

sample({
    clock: getOneSettingsFx.doneData,
    fn: (res) => res.data,
    target: $selectedSetting,
})

sample({
    clock: changeSelectedSetting,
    source: $selectedSetting,
    fn: (selected, value) => ({
        ...selected,
        [value.target.name]: value.target.value,
    }),
    target: $selectedSetting,
})

sample({
    clock: changeSelectedCheckBoxSetting,
    source: $selectedSetting,
    fn: (selected, value) => ({
        ...selected,
        [value.target.name]: value.target.checked,
    }),
    target: $selectedSetting,
})

export {
    getSettings,
    $settings,
    $selectedSetting,
    getOneSettings,
    changeSelectedSetting,
    changeSelectedCheckBoxSetting,
}
