import React, { FC, memo, useEffect } from "react"

import CashierList from "@/components/CashierForm/CashierList"
import NoData from "@/components/NoData/NoData"
import { IWorker } from "@/types/types"
import { useRouter } from "next/router"

interface InputProps {
    state: boolean
    workers?: IWorker[]
    showModal?: (text: string) => void
    styles: {
        readonly [key: string]: string
    }
}

const CashiersBlock: FC<InputProps> = ({
    state,
    workers,
    showModal,
    styles,
}) => {
    // const { push } = useRouter()
    // useEffect(() => {
    //     if (!state) {
    //         push("/404")
    //     }
    // }, [state])

    return (
        <section className={styles.section}>
            {state ? (
                <CashierList
                    workers={workers}
                    showModal={showModal}
                    serverState={state}
                />
            ) : (
                <NoData />
            )}
            <div className="bulk" />
        </section>
    )
}

export default memo(CashiersBlock)
