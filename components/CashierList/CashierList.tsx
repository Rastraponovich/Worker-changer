import Cashier from "../Cashier/Cashier"
import { oooWorker, ipWorker } from "features/workers"
import Alert from "../UI/Alert/Alert"

const CashierList = () => {
    return (
        <section className="flex w-full grow flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <Cashier title="ИП" workerProps={ipWorker} />
                <Cashier title="ООО" workerProps={oooWorker} />
            </div>
            <div className="bulk" />
            {/* <Alert /> */}
        </section>
    )
}

export default CashierList
