import { ChangeEvent, FC, HTMLAttributes, memo } from "react"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useEvent, useList, useStore } from "effector-react"
import { allSettled, Event, fork, serialize } from "effector"

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

import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
import CustomInput from "@/components/CustomComponents/CustomInput"

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
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={handleChange}
                className={className}
            />
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
            <button onClick={() => handleGetData(query.number.toString())}>
                getSettings
            </button>

            <h2 className="w-full mb-4">
                link:
                {`https://${currentSettings.ref}:${currentSettings.port}/rk7api/v0/xmlinterface.xml`}
            </h2>
            <div className="w-full flex flex-col space-y-4 p-4 bg-sky-900 rounded shadow-lg">
                <CustomInput
                    value={currentSettings.name}
                    name="name"
                    title="название"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.login}
                    name="login"
                    title="логин"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.password}
                    name="password"
                    title="пароль"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.port}
                    name="port"
                    title="порт"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />

                <CustomInput
                    value={currentSettings.ref}
                    name="ref"
                    title="ардес ref сервера"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />
                <CustomInput
                    value={currentSettings.mainParentIdent}
                    name="mainParentIdent"
                    title="mainParentIdent"
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-2 "
                    className="text-white  col-span-3 px-2 py-1 rounded bg-transparent border-gray-300 border-2 focus-visible:outline-white"
                    onChange={changeSelectedSetting}
                />
                <CustomCheckBox
                    title="активен"
                    name="isActive"
                    checked={currentSettings.isActive}
                    onChange={changeSelectedCheckBoxSetting}
                    labelClassName="grid grid-cols-5 "
                    titleClassName="first-letter:uppercase col-span-1 "
                    className="text-sky-900  col-span-1 justify-self-start self-center"
                />

                <CustomCheckBox
                    title="выбран"
                    name="selected"
                    checked={currentSettings.selected}
                    onChange={changeSelectedCheckBoxSetting}
                    labelClassName="grid grid-cols-5"
                    titleClassName="first-letter:uppercase col-span-1 "
                    className="text-sky-900  col-span-1 justify-self-start self-center"
                />
            </div>
            <div className="flex justify-between w-full px-8 mt-4">
                <button
                    onClick={back}
                    className="capitalize px-10 py-2 rounded bg-red-900 text-white shadow-lg hover:bg-red-700 active:opacity-70 transition-all duration-100"
                >
                    назад
                </button>
                <button
                    onClick={handleDelete}
                    className="capitalize px-10 py-2 rounded bg-red-900 text-white shadow-lg hover:bg-red-700 active:opacity-70 transition-all duration-100"
                >
                    {deleteSettingsPending ? "удаление" : "удалить"}
                </button>

                <button
                    onClick={handleSaveSettings}
                    className="capitalize px-10 py-2 rounded bg-sky-900 text-white shadow-lg hover:bg-sky-700 active:opacity-70 transition-all duration-100"
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
