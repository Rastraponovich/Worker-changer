import { TSettings } from "@/interfaces/settings"
import { IWorker } from "@/interfaces/types"
import { iternalAPI } from "lib/api"

const GetSettingsAPI = async () => await iternalAPI.get("/settings")

const GetOneSettingsAPI = async (id: string) => await iternalAPI.get(`/settings/${id}`)

const UpdateSettingsAPI = async (settings: TSettings) => await iternalAPI.patch(`/settings/${settings.id}`, settings)

const CreateNewSettingsAPI = async (settings: TSettings) => await iternalAPI.post("/settings", settings)

const DeleteSettingsAPI = async (id: string) => await iternalAPI.delete(`/settings/${id}`)

const SettingsAPI = {
    GetSettingsAPI,
    GetOneSettingsAPI,
    UpdateSettingsAPI,
    CreateNewSettingsAPI,
    DeleteSettingsAPI,
}

const getStatusAPI = async () => await iternalAPI.get("/status")

const getWorkersAPI = async () => await iternalAPI.get("/workers")

const getWorkerAPI = async (guid: string) => await iternalAPI.get(`/workers/${guid}`)

const SaveWorkerAPI = async (worker: IWorker) => await iternalAPI.post("/setworker", { worker })

const API = { getWorkersAPI, getWorkerAPI, SaveWorkerAPI, getStatusAPI }

export { API, SettingsAPI }
