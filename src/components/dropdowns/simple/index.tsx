import { IonRow } from "@ionic/react"
import { useTranslation } from "react-i18next"
import { MdKeyboardArrowUp, MdLock } from "react-icons/md"
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"

type SimpleDropdownProps = {
    title: string
    currentValue: string
    badge?: boolean
    disabled?: boolean
    children: React.ReactNode
    isOpen: boolean
    openCallback: () => void
    closeCallback: () => void
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({ children, isOpen, title, currentValue, openCallback, closeCallback, badge = false, disabled = false }) => {
    const { t } = useTranslation()
    const { auth } = useAppSelector(state => state.user)
    return (
        <article className={`
                relative
                w-full h-auto
                flex flex-col items-center justify-center
                bg-white rounded-xl text-coffi-black
                border border-gray-300
                p-6
                transition-all duration-300 ease-in-out
                mb-3
                ${!isOpen ? 'shadow-sm' : 'shadow-lg'}
                ${disabled ? 'opacity-20' : ''}
            `}
        >

            <section className={`
                relative
                w-full h-auto
                flex flex-row flex-nowrap items-center justify-between cursor-pointer
            `} onClick={!disabled && !isOpen ? openCallback : closeCallback}>

                <h2 className={`font-bold ${!isOpen ? 'text-lg' : 'text-2xl'} transition-all ease-in-out duration-300 text-start`}>
                    {title}
                </h2>

                {
                    // The user must be subscribe at least to the basic plan to use this feature
                    disabled ? (
                        <article className={`text-sm font-light text-coffi-black ${badge ? 'bg-gray-100 px-4 py-2 rounded-full' : ''}`}>
                            <div className="flex flex-row flex-nowrap items-center justify-end text-end">
                                <span className="mr-2">
                                     { auth.isAuth ? t('messages.permissions.needUpgradePlan') : t('messages.auth.required.message') }
                                </span>
                                <MdLock size={18} color="gray" />
                            </div>
                        </article>
                    ) :
                    !isOpen ? (
                        <span className={`text-xs font-light text-coffi-black capitalize ${badge ? 'bg-gray-100 px-4 py-2 rounded-full' : ''}`}>
                            {currentValue}
                        </span>
                    ) : (
                        <button className="p-1 flex items-center justify-center outline outline-gray-300 cursor-pointer rounded-full">
                            <MdKeyboardArrowUp size={18} color="gray" />
                        </button>
                    )
                }
            </section>


            {/* <IonRow className="w-full flex flex-row flex-nowrap items-center justify-between cursor-pointer" onClick={closeCallback}>
                <h2 className="font-bold text-2xl">
                    {title}
                </h2>

                <button className="p-1 flex items-center justify-center outline outline-gray-300 cursor-pointer rounded-full">
                    <MdKeyboardArrowUp size={18} color="gray" />
                </button>
            </IonRow> */}
            <section className={`
                flex flex-col items-start justify-start w-full overflow-hidden
                ${isOpen ? 'h-auto my-3' : 'h-0'}
                transition-all duration-300 ease-in-out
            `}>
                {
                    children
                }
            </section>

        </article>
    )
}