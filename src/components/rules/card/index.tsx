import { IonRow } from "@ionic/react"
import { IconType } from 'react-icons'

export interface RuleCard {
    Icon: IconType
    rule: string
    description: string
}

export const RuleCard:React.FC<RuleCard> = ({ Icon, description, rule }) => {

    return (
        <IonRow className="relative w-full h-auto max-h-6 flex flex-row flex-nowrap align-center">
            <article className="h-full mr-2 flex align-center justify-center">
                <Icon size="21px" />
            </article>
            <article>
                <strong className="font-bold text-md p-0 m-0">
                    { rule }
                </strong>
                <p className="font-light text-sm p-0 m-0">
                    { description }
                </p>
            </article>
        </IonRow>
    )
}