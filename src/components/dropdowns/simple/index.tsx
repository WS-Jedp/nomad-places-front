import { IonRow } from "@ionic/react"
import { MdKeyboardArrowUp } from "react-icons/md"

type SimpleDropdownProps = {
    title: string
    currentValue: string
    badge?: boolean
    children: React.ReactNode
    isOpen: boolean
    openCallback: () => void
    closeCallback: () => void
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({ children, isOpen, title, currentValue, openCallback, closeCallback, badge = false }) => {
    return (
        <article className={`
                relative
                w-full h-auto
                flex flex-col items-center justify-center
                bg-white rounded-xl text-black
                border border-gray-300
                p-6
                transition-all duration-300 ease-in-out
                mb-3
                ${!isOpen ? 'shadow-sm' : 'shadow-lg'}
            `}
        >

            <section className={`
                relative
                w-full h-auto
                flex flex-row flex-nowrap items-center justify-between cursor-pointer
            `} onClick={!isOpen ? openCallback : closeCallback}>
                <h2 className={`font-bold ${!isOpen ? 'text-lg' : 'text-2xl'} transition-all ease-in-out duration-300 `}>
                    {title}
                </h2>

                {
                    !isOpen ? (
                        <span className={`text-xs font-light text-black capitalize ${badge ? 'bg-gray-100 px-4 py-2 rounded-full' : ''}`}>
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