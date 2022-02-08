import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useStore } from "effector-react/scope"
import { allSettled, fork, serialize } from "effector"

import { $errorGetWorker, $loadingWorkers, getWorkers } from "features/workers"

import Layout from "@/components/Layout/Layout"
import InfoBlock from "@/components/InfoBlock/InfoBlock"
import CashierList from "@/components/CashierList/CashierList"

interface WorkersPageProps {}

const WorkersPage: NextPage<WorkersPageProps> = () => {
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
