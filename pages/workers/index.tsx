import { useStore } from "effector-react"
import { GetServerSideProps } from "next"
import { fork, allSettled, serialize } from "effector"

import { $errorGetWorker, $loadingWorkers, getWorkers } from "features/workers"

import { CashierList } from "@/components/index"

import { Layout } from "src/widgets/layout"
import { InfoBlock } from "src/widgets/info-block"

const WorkersPage = () => {
    const loading = useStore($loadingWorkers)

    const error = useStore($errorGetWorker)

    return (
        <Layout title="Настройка кассиров">
            <InfoBlock />
            {loading && <h2 className="my-4">Идет загрузка</h2>}
            {!loading && error && <p className="my-4">произошла ошибка. перезагрузите страницу</p>}
            {!loading && !error && <CashierList />}
        </Layout>
    )
}

export default WorkersPage

export const getServerSideProps: GetServerSideProps = async () => {
    const scope = fork()

    await allSettled(getWorkers, { scope })

    const serialized = serialize(scope)
    return { props: { initialState: serialized } }
}
