import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { createWorker, getEmployeesByName } from "@/schemas/schema"
/* eslint-disable */
export const useCheckCashier = async (name: string) => {
    const parentIdent = process.env.MAINPARENTIDENT

    const request = await sendData(getEmployeesByName(name, parentIdent))

    const parseResponse = useParser(request.data).RK7QueryResult.CommandResult
        .RK7Reference

    if (parseResponse.Items.length <= 0) {
        const newCashierSchema = createWorker(name, parentIdent)
        const { error, data, isAxiosError, code } = await sendData(
            newCashierSchema
        )
        return {
            error,
            data: useParser(data),
            isAxiosError,
            code,
            message: `${name} создан`,
        }
    }

    return {
        error: true,
        data: "",
        isAxiosError: false,
        code: null,
        message: `${name} существует`,
    }
}
/* eslint-enable */
