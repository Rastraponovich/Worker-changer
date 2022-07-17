import type { IWorker } from "src/shared/lib/models"
import { Event, Store } from "effector"

export interface FactoryProps {
    $employeesArray: Store<IWorker[]>
    name: string
}

export type FactoryReturn = {
    $currentWorker: Store<IWorker>
    $newWorker: Store<IWorker>
    selectWorker: Event<IWorker>
    saveWorker: Event<void>
    refreshWorker: Event<void>
    $getWorkerPending: Store<boolean>
    $saveWorkerPending: Store<boolean>
}
export type WorkerProps = FactoryReturn
