import { IonRow } from "@ionic/react"
import { IconType } from "react-icons"

interface AmmenitiesCardProps {
    state: boolean
    Icon: IconType
    amenities: string
    value?: string
}

export const AmenitiesCard: React.FC<AmmenitiesCardProps> = ({ Icon, amenities, state, value }) => {
    return (
        <IonRow className="relative w-full h-auto max-h-6 flex flex-row flex-nowrap align-center">
            <article className="h-full mr-2 flex align-center justify-center">
                <Icon size="21px" />
            </article>
            <article>
                <strong className={`font-bold text-md p-0 m-0 ${!state ? 'line-through' : ''}`}>
                    { amenities }
                </strong>
                {
                    value && (
                        <p className="font-light text-sm p-0 m-0">
                            { value }
                        </p>
                    )
                }
            </article>
        </IonRow>
    )
}