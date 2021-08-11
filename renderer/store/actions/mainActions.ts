import { MainAction, MainActionTypes } from "@/interfaces/mainStoreType"
import { Dispatch } from "react"

export const startInitAction = (): MainAction => ({
    type: MainActionTypes.START_INIT,
})
