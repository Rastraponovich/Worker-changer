import React, { FC, memo, useCallback } from "react"

import { IWorker } from "interfaces/types"

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
} from "features/workers"

interface CashierListProps {}

const CashierList: FC<CashierListProps> = () => {
    return (
        <section className="flex flex-col grow w-full">
            <div className="flex flex-wrap justify-center">
                <Cashier
                    title="ИП"
                    selectedWorker={$newIPWorker}
                    change={selectNewIPWorker}
                    worker={$currentIPWorker}
                    onSave={saveIPWorker}
                />
                <Cashier
                    title="ООО"
                    selectedWorker={$newOOOWorker}
                    change={selectNewOOOWorker}
                    worker={$currentOOOWorker}
                    onSave={saveOOOWorker}
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

export default memo(CashierList)
