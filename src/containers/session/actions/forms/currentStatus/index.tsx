import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { IoMdAlert, IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io"
import { MdPeople } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../../../../common/hooks/useTypedSelectors"
import { SimpleButton } from "../../../../../components/buttons/simple"
import { PLACE_STATUS } from "../../../../../models/placeStatus"
import { PLACE_STATUS_SESSION_ACTION_OPTION } from "../../../../../models/session/actions"
import { resetSessionPlaceStatus, updateSessionPlaceStatus } from "../../../../../store/redux/slices/sessionActions/update"

interface CurrentStatusFormProps {
    onSave: () => void
}

export const CurrentStatusForm: React.FC<CurrentStatusFormProps> = ({ onSave }) => {

    const {t} = useTranslation()
    const { payload: currentStatusOption } = useAppSelector(state => state.placeSession.sessionPlaceStatusAction)
    const dispatch = useAppDispatch()

    const opts: PLACE_STATUS_SESSION_ACTION_OPTION[] = [
        {
            id: 0,
            value: true,
            name: 'Open',
            type: PLACE_STATUS.OPEN,
        },
        {
            id: 1,
            value: false,
            name: 'Closed',
            type: PLACE_STATUS.CLOSED,
        }
    ]

    const [options, setOptions] = useState(opts)
    const [optionSelected, setOptionSelected] = useState<PLACE_STATUS_SESSION_ACTION_OPTION | null>(currentStatusOption)

    function handleBackgroundColor(type: PLACE_STATUS) {
        switch (type) {
            case PLACE_STATUS.OPEN:
                return 'bg-green-100 hover:bg-green-200'
            case PLACE_STATUS.CLOSED:
                return 'bg-red-100 hover:bg-red-200'
        }
    }

    function handleTextColor(type: PLACE_STATUS) {
        switch (type) {
            case PLACE_STATUS.OPEN:
                return 'text-green-500'
            case PLACE_STATUS.CLOSED:
                return 'text-red-500'
        }
    }

    function handleIcon(type: PLACE_STATUS) {
        switch (type) {
            case PLACE_STATUS.OPEN:
                return <IoMdCheckmarkCircleOutline size={30}  color="green"/>
            case PLACE_STATUS.CLOSED:
                return <IoMdCloseCircleOutline size={30}  color="red"/>
        }
    }

    function isOptionSelected(optionID: number) {
        return optionSelected?.id === optionID
    }

    function handleOptionSelectd(option: PLACE_STATUS_SESSION_ACTION_OPTION) {
        if(option.id === optionSelected?.id) {
            setOptionSelected(null)
            return
        }
        setOptionSelected(option)
    }

    function handleOnSave() {
        if(!optionSelected) {
            dispatch( resetSessionPlaceStatus() )
        } else {
            dispatch( updateSessionPlaceStatus({ placeStatus: optionSelected }) )
        }
        onSave()
    }

    return (
        <>
            <IonRow className='relative w-full h-auto flex flex-row'>
                {
                    options.map((option, index) => (
                        <IonCol size="6" 
                        key={index}
                        className={`
                                relative
                                flex flex-col items-center justify-center 
                                w-full border 
                                border-solid border-gray-100 
                                text-center text-black
                                h-32
                        `}
                            onClick={() => handleOptionSelectd(option)}
                        >
                            <div className={`
                                w-full h-full flex flex-col items-center justify-center
                                cursor-pointer
                                ${isOptionSelected(option.id) ? 'bg-gray-200' : 'bg-white'}
                                ${handleBackgroundColor(option.type)}
                            `}>
                                {
                                    handleIcon(option.type)
                                }
                                <h3 className="font-light text-md my-3">
                                    { t(`spots.session.${option.name.toLowerCase()}`) }
                                </h3>
                            </div>
                        </IonCol>
                    ))
                }
            </IonRow>
            <IonRow className="flex items-center justify-center p-6 w-full">
                <SimpleButton 
                    text={t('actions.general.save')}
                    action={handleOnSave}
                />
            </IonRow>
        </>
    )
}