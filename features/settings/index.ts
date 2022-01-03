import { TSettings } from "@/interfaces/settings"
import { createEvent, createStore, forward, sample } from "effector"
import { ChangeEvent } from "react"
import {
    createNewSettingsFx,
    deleteSettingsFx,
    getSettingsFx,
    updateSettingsFx,
    getOneSettingsFx,
} from "./api"

const bulkSettings: TSettings = {
    name: "",
    ref: "",
    url: "",
    login: "",
    password: "",
    mainParentIdent: 0,
    port: 0,
    isActive: false,
    selected: false,
}

const getSettings = createEvent()

const $settings = createStore<TSettings[]>([])

const $getSettingsPending = createStore<boolean>(false).on(
    getSettingsFx.pending,
    (state, payload) => payload
)
const $updateSettingsPending = createStore<boolean>(false).on(
    updateSettingsFx.pending,
    (state, newState) => newState
)

const $deleteSettingsPending = createStore<boolean>(false).on(
    deleteSettingsFx.pending,
    (state, payload) => payload
)

sample({
    clock: [getSettings, createNewSettingsFx.doneData],
    fn: () => null,
    target: getSettingsFx,
})

sample({
    clock: getSettingsFx.doneData,
    fn: (res) => res.data,
    target: $settings,
})

const getOneSettings = createEvent<string>()

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

const updateSettings = createEvent()

sample({
    clock: updateSettings,
    source: $selectedSetting,
    fn: (settings, _) => ({
        ...settings,
        url: `https://${settings.ref}:${settings.port}/rk7api/v0/xmlinterface.xml`,
    }),
    target: updateSettingsFx,
})

sample({
    clock: updateSettingsFx.doneData,
    source: $selectedSetting,
    fn: (settings, _) => settings.id.toString(),
    target: getOneSettings,
})

const createNewSettings = createEvent()

sample({
    clock: createNewSettings,
    fn: (_) => bulkSettings,
    target: createNewSettingsFx,
})

const deleteSettings = createEvent()

sample({
    clock: deleteSettings,
    source: $selectedSetting,
    fn: (settings) => settings.id.toString(),
    target: deleteSettingsFx,
})

export {
    getSettings,
    $settings,
    $selectedSetting,
    getOneSettings,
    changeSelectedSetting,
    changeSelectedCheckBoxSetting,
    updateSettings,
    $updateSettingsPending,
    createNewSettings,
    $getSettingsPending,
    deleteSettings,
    $deleteSettingsPending,
}
