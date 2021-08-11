import { NextPage } from "next"
import React, { useEffect } from "react"
import { connect } from "react-redux"

import { RootState } from "store/reducers"
import { NextThunkDispatch } from "store"

import { getAllWorkersAction } from "store/actions/workersActions"
import { getStatusAction } from "store/actions/statusActions"

import Layout from "@/components/Layout/Layout"
import InfoBlock from "@/components/InfoBlock/InfoBlock"
import CashiersBlock from "@/components/CashiersBlock/CashiersBlock"
import { useRouter } from "next/router"

interface InputProps extends RootState {
    dispatch: NextThunkDispatch
}

const StartPage: NextPage<InputProps> = ({
    workersStore,
    statusStore,
    dispatch,
}) => {
    const { workers, reload } = workersStore
    const { status, error } = statusStore
    const { push } = useRouter()

    const initPage = async () => {
        await dispatch(await getAllWorkersAction())
        await dispatch(await getStatusAction())
    }

    useEffect(() => {
        initPage()
    }, [])

    useEffect(() => {
        if (error) {
            push("/401")
        }
    }, [error])

    useEffect(() => {
        if (reload) initPage()
    }, [reload])

    return (
        <Layout>
            <InfoBlock />
            <CashiersBlock />
        </Layout>
    )
}
export default connect((state: RootState) => state)(StartPage)
