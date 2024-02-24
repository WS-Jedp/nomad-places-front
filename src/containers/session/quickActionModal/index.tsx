import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { AmountOfPeopleCircleCard } from "../../../components/amountOfPeople/cards/circleCard"
import { SimpleButton } from "../../../components/buttons/simple"
import { CircleMindsetActions } from "../../../components/mindsets/cards/circleMindsetActions"
import { MINDSETS } from "../../../models/mindsets"
import { PLACE_STATUS } from "../../../models/placeStatus"
import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM, UPDATE_ACTIONS } from "../../../models/session"
import { PlaceSessionAction, PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION, PLACE_AMOUNT_OF_PEOPLE_OPTIONS } from "../../../models/session/actions"

interface QuickActionModalProps {
    onCancel: () => void
    actionType: UPDATE_ACTIONS
    value: string
}

export const QuickActionModal:React.FC<QuickActionModalProps> = ({ onCancel, actionType, value }) => {

    const { t } = useTranslation();
    const { sessionID, socket } = useAppSelector(state => state.userSession)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ currentData, setCurrentData ] = useState(value)

    function getActionTypeText() {
        switch (actionType) {
            case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
                return "Amount of people"
            case UPDATE_ACTIONS.PLACE_MINDSET:
                return "Environment"
            case UPDATE_ACTIONS.PLACE_STATUS:
                return "Status"
        }
    }

    function getActionTypeValue() {

        switch (actionType) {
            case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
                return <p className="text-sm font-medium my-2">{t('spots.messages.session.confirmation.amountOfPeople')}</p>
            case UPDATE_ACTIONS.PLACE_MINDSET:
                return <p className="text-sm font-medium my-2">{t('spots.messages.session.confirmation.perfectTo')}</p>
            case UPDATE_ACTIONS.PLACE_STATUS:
                return <p className="text-sm font-medium my-2">{t('spots.messages.session.confirmation.status')}</p>
        }
    }

    function handleActionIcon() {
        switch (actionType) {
            case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
                return <AmountOfPeopleCircleCard amount={value} actionsAmount={1} withBadge={false} />
            case UPDATE_ACTIONS.PLACE_MINDSET:
                    return <CircleMindsetActions actionsAmount={1} mindset={value as MINDSETS} withBadge={false} />
            case UPDATE_ACTIONS.PLACE_STATUS:
                return <p>{t('spots.messages.session.updateStatus')} {  t(`spots.session.${value.toLowerCase()}`)  } </p>
        }
    }

    function getCurrentDataFormat() {
        switch(actionType) {
            case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
                return PLACE_AMOUNT_OF_PEOPLE_OPTIONS.find(option => option.amount === value)
            case UPDATE_ACTIONS.PLACE_MINDSET:
                return value
            case UPDATE_ACTIONS.PLACE_STATUS:
                return value
        }
    }

    async function uploadAction() {
        if(!socket || !sessionID) return
        setIsLoading(true)
        const data: PlaceSessionActionDataPayload['UPDATE'] = {
            type: actionType,
            data: {
                data: getCurrentDataFormat() as any
            }
        } 
        await socket.updateSesssion({ 
            sessionID,
            actionType: PLACE_SESSION_ACTIONS_ENUM.UPDATE,
            actionData: data as any
        })

        setIsLoading(false)
        onCancel()
    }

    return (
        <article className="
            relative
            flex flex-col
            w-10/12 md:w-[420px]
            p-4
            items-center justify-center
            bg-white rounded-md shadow-md
            text-black
        ">

            <h2 className="font-bold text-black text-2xl m-3">
                Quick Update
            </h2>

            <div className=" my-3 w-100 flex flex-col items-center justify-center text-center">
                {
                    handleActionIcon()
                }
                {
                    getActionTypeValue()
                }
            </div>


            <div className="
                relative
                m-3
                flex flex-row
                w-100
                items-center justify-center
            ">

                <SimpleButton 
                    action={uploadAction}
                    text={ t('actions.confirmation.yes')}
                    loading={isLoading}
                />

                <span className="cursor-pointer text-red-400 underline mx-3" onClick={onCancel}>
                    { t('actions.general.cancel') }
                </span>

            </div>
        </article>
    )
}