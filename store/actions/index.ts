import * as WorkerActions from "./workersActions"
import * as StatusActions from "./statusActions"
import * as MainActions from "./mainActions"

export default {
    ...WorkerActions,
    ...StatusActions,
    ...MainActions,
}
