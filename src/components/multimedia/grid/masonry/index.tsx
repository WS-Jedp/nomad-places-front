import { IonRow } from "@ionic/react"
import { useTranslation } from "react-i18next"
import { PlaceMultimedia } from "../../../../models/multimedia"
import { HandleMultimediaCard } from "../../cards/helpers/handleMultimediaCard"
import './styles.css'

interface MultimediaMasonryGridProps {
    multimedia: PlaceMultimedia[]
}

export const MultimediaMasonryGrid:React.FC<MultimediaMasonryGridProps> = ({ multimedia }) => {
    const { t } = useTranslation();
    return (
        <IonRow className="relative w-full h-full">
            <section className="w-full grid-multimedia-container">
                {
                    multimedia.length > 0 ? multimedia.map((media, i) => (
                        <figure className="relative w-full h-full rounded-md overflow-hidden" key={i}>
                            <HandleMultimediaCard type={media.type} url={media.url} />
                        </figure>
                    )) : (
                        <p>
                            { t('spots.messages.noMultimedia') }
                        </p>
                    )
                }
            </section>
        </IonRow>
    )
}