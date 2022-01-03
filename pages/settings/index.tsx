import { memo } from "react"
import { GetStaticProps, NextPage } from "next"
import { useEvent, useList, useStore } from "effector-react"
import { allSettled, fork, serialize } from "effector"

import {
    $getSettingsPending,
    $settings,
    createNewSettings,
    getSettings,
} from "features/settings"

import Link from "next/link"
import Layout from "@/components/Layout/Layout"

const SettingsPage: NextPage = () => {
    const handleGetData = useEvent(getSettings)
    const handleCreateNewSettings = useEvent(createNewSettings)
    const pending = useStore($getSettingsPending)

    return (
        <Layout title="Настройки">
            <button onClick={handleGetData}>getSettings</button>
            <button onClick={handleCreateNewSettings}>create</button>

            {useList($settings, {
                keys: [pending, $settings],
                fn: (item) => (
                    <div className="grid grid-cols-1 w-full p-4">
                        <Link href={`/settings/${item.id}`}>
                            <a className="col-span-1 rounded p-4 flex flex-col bg-sky-900">
                                <span>Наименование : {item.name}</span>
                            </a>
                        </Link>
                    </div>
                ),
            })}
        </Layout>
    )
}

export default memo(SettingsPage)

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(getSettings, { scope })
    const serialized = serialize(scope)

    return {
        props: { initialState: serialized },
    }
}
