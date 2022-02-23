import Cashier from "../Cashier/Cashier"
import {
    $currentIPWorker,
    $currentOOOWorker,
    $newIPWorker,
    $newOOOWorker,
    saveIPWorker,
    saveOOOWorker,
    selectNewIPWorker,
    selectNewOOOWorker,
    $saveIPWorkerPending,
    $saveOOOWorkerPending,
    $refreshIPPending,
    $refreshOOOPending,
    refreshIPWorker,
    refreshOOOWorker,
} from "features/workers"

interface CashierListProps {}

const CashierList = () => {
    return (
        <section className="flex w-full grow flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <Cashier
                    title="ИП"
                    selectedWorker={$newIPWorker}
                    change={selectNewIPWorker}
                    worker={$currentIPWorker}
                    onSave={saveIPWorker}
                    onSavePending={$saveIPWorkerPending}
                    onRefreshPending={$refreshIPPending}
                    onRefresh={refreshIPWorker}
                />
                <Cashier
                    title="ООО"
                    selectedWorker={$newOOOWorker}
                    change={selectNewOOOWorker}
                    worker={$currentOOOWorker}
                    onSave={saveOOOWorker}
                    onSavePending={$saveOOOWorkerPending}
                    onRefreshPending={$refreshOOOPending}
                    onRefresh={refreshOOOWorker}
                />
            </div>
            <div className="bulk" />
            {/* <Modal autoClose={2000}>
                <p>{workerInfo?.OfficialName}</p>
                <button
                    className={clsx(
                        "flex items-center justify-center px-5 py-3 bg-green-700 text-white border-2 rounded border-transparent outline-none hover:bg-white ",
                        "hover:border-green-700 hover:text-green-700"
                    )}
                    onClick={handleOpenModal}
                >
                    Продолжить
                </button>
            </Modal> */}
        </section>
    )
}

export default CashierList
