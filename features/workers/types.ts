import { IWorker } from "@/interfaces/types"
import { Event, Store } from "effector"
import { ChangeEvent } from "react"

export interface FactoryProps {
    $employeesArray: Store<IWorker[]>
    name: string
}

export type FactoryReturn = {
    $currentWorker: Store<IWorker>
    $newWorker: Store<IWorker>
    selectWorker: Event<ChangeEvent<HTMLSelectElement>>
    saveWorker: Event<void>
    refreshWorker: Event<void>
    $getWorkerPending: Store<boolean>
    $saveWorkerPending: Store<boolean>
}
export type WorkerProps = FactoryReturn
