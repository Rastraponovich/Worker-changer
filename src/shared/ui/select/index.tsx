import { Listbox, Transition } from "@headlessui/react"
import { ChangeEvent, Fragment, memo } from "react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { IWorker } from "src/shared/lib/models"

interface SelectTwoProps {
    current: IWorker
    items: IWorker[]
    onChange?: (e: ChangeEvent<HTMLSelectElement> | IWorker) => void
}

export const Select = memo(({ current, items, onChange }: SelectTwoProps) => {
    return (
        <Listbox value={current} onChange={onChange}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer  rounded-lg bg-white py-4 pl-3 pr-10 text-left text-gray-900 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                        {current.OfficialName} : {current.genTaxPayerIdNum}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {items.map((item) => (
                            <Listbox.Option
                                key={item.GUIDString}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                    }`
                                }
                                value={item}
                            >
                                <>
                                    <span
                                        className={`block truncate ${
                                            current.genTaxPayerIdNum === item.genTaxPayerIdNum
                                                ? "font-medium"
                                                : "font-normal"
                                        }`}
                                    >
                                        {item.OfficialName}
                                    </span>
                                    {current.genTaxPayerIdNum === item.genTaxPayerIdNum ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                </>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
})
Select.displayName = "Select"
