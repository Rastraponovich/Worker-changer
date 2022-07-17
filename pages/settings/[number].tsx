import { GetStaticPaths, GetStaticProps, NextPage } from "next"

import {
    $selectedSetting,
    $settings,
    getOneSettings,
    getSettings,
    changeSelectedSetting,
    changeSelectedCheckBoxSetting,
    updateSettings,
    $updateSettingsPending,
    deleteSettings,
    $deleteSettingsPending,
} from "features/settings"

import { Layout } from "src/widgets/layout"
import { useRouter } from "next/router"
import CustomInput from "@/components/CustomComponents/CustomInput"
import { fork, allSettled, serialize, Event } from "effector"
import { useEvent, useStore } from "effector-react"
import { ChangeEvent, FC, memo } from "react"

interface CustomCheckBoxProps {
    name?: string
    checked: boolean
    title?: string
    onChange: Event<ChangeEvent<HTMLInputElement>>
    labelClassName?: string
    titleClassName?: string
    className?: string
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({
    name,
    checked,
    title,
    onChange,
    labelClassName,
    titleClassName,
    className,
}) => {
    const handleChange = useEvent(onChange)

    return (
        <label className={labelClassName}>
            <span className={titleClassName}>{title}</span>
            <input type="checkbox" name={name} checked={checked} onChange={handleChange} className={className} />
        </label>
    )
}

const SettingsPage: NextPage = () => {
    const handleGetData = useEvent(getOneSettings)

    const { query, back } = useRouter()

    const currentSettings = useStore($selectedSetting)

    const updateSettingsPending = useStore($updateSettingsPending)
    const deleteSettingsPending = useStore($deleteSettingsPending)

    const handleSaveSettings = useEvent(updateSettings)
    const handleDelete = useEvent(deleteSettings)
    return (
        <Layout title="Настройки">
            <button onClick={() => handleGetData(query.number.toString())}>getSettings</button>

            <h2 className="mb-4 w-full">
                link:
                {`https://${currentSettings.ref}:${currentSettings.port}/rk7api/v0/xmlinterface.xml`}
            </h2>
            <div className="flex w-full flex-col space-y-4 rounded bg-sky-900 p-4 shadow-lg">
                <CustomInput
                    value={currentSettings.name}
                    name="name"
                    title="название"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.login}
                    name="login"
                    title="логин"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.password}
                    name="password"
                    title="пароль"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.port}
                    name="port"
                    title="порт"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.ref}
                    name="ref"
                    title="ардес ref сервера"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />
                <CustomInput
                    value={currentSettings.mainParentIdent}
                    name="mainParentIdent"
                    title="mainParentIdent"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="col-span-3  rounded border-2 border-gray-300 bg-transparent px-2 py-1 text-white focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />
                <CustomCheckBox
                    title="активен"
                    name="isActive"
                    checked={currentSettings.isActive}
                    onChange={changeSelectedCheckBoxSetting}
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-1 "
                    className="col-span-1  self-center justify-self-start text-sky-900"
                />

                <CustomCheckBox
                    title="выбран"
                    name="selected"
                    checked={currentSettings.selected}
                    onChange={changeSelectedCheckBoxSetting}
                    labelClassName="grid grid-cols-5"
                    titleClassName="first-letter:uppercase col-span-1 "
                    className="col-span-1  self-center justify-self-start text-sky-900"
                />
            </div>
            <div className="mt-4 flex w-full justify-between px-8">
                <button
                    onClick={back}
                    className="rounded bg-red-900 px-10 py-2 capitalize text-white shadow-lg transition-all duration-100 hover:bg-red-700 active:opacity-70"
                >
                    назад
                </button>
                <button
                    onClick={handleDelete}
                    className="rounded bg-red-900 px-10 py-2 capitalize text-white shadow-lg transition-all duration-100 hover:bg-red-700 active:opacity-70"
                >
                    {deleteSettingsPending ? "удаление" : "удалить"}
                </button>

                <button
                    onClick={handleSaveSettings}
                    className="rounded bg-sky-900 px-10 py-2 capitalize text-white shadow-lg transition-all duration-100 hover:bg-sky-700 active:opacity-70"
                >
                    {updateSettingsPending ? "сохраненяется" : "сохранить"}
                </button>
            </div>
        </Layout>
    )
}

export default memo(SettingsPage)

export const getStaticPaths: GetStaticPaths = async () => {
    const scope = fork()

    allSettled(getSettings, { scope })

    const settings = scope.getState($settings)

    const paths = settings.map((item) => ({
        params: { number: item.id.toString() },
    }))

    return {
        fallback: "blocking",
        paths,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const scope = fork()

    await allSettled(getOneSettings, { scope, params: params.number })
    const serialized = serialize(scope)

    return {
        props: { initialState: serialized },
    }
}
