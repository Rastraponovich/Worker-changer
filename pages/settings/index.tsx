import { GetStaticProps, NextPage } from "next"

import { $getSettingsPending, $settings, createNewSettings, getSettings } from "features/settings"

import Link from "next/link"
import { Layout } from "src/widgets/layout"
import { useEvent, useList, useStore } from "effector-react"
import { allSettled, fork, serialize } from "effector"

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
                    <div className="grid w-full grid-cols-1 p-4">
                        <Link href={`/settings/${item.id}`}>
                            <a className="col-span-1 flex flex-col rounded bg-sky-900 p-4">
                                <span>Наименование : {item.name}</span>
                            </a>
                        </Link>
                    </div>
                ),
            })}
        </Layout>
    )
}

export default SettingsPage

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(getSettings, { scope })
    const serialized = serialize(scope)

    return {
        props: { initialState: serialized },
    }
}
