import { useState } from 'react'
import { IonCol, IonRow } from "@ionic/react"
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from 'react-icons/md'
import { PlaceMultimedia } from '../../models/multimedia'
import { HandleMultimediaCard } from '../../components/multimedia/cards/helpers/handleMultimediaCard'

interface MultimediaSliderModalProps {
    images: PlaceMultimedia[]
    currentImage?: number
    closeCallback: () => void
}

export const MultimediaSliderModal: React.FC<MultimediaSliderModalProps> = ({ currentImage, images, closeCallback }) => {

    const [currentImages, setCurrentImages] = useState<PlaceMultimedia[]>(images)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(currentImage || 0)

    function handleNextImage() {
        if (currentImageIndex < currentImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
        }
    }

    function handlePrevImage() {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
        }
    }

    return (
        <IonCol size="12" className="w-full h-full bg-black">
            <IonRow className="h-6 p-9">
                <IonCol size="6" className="flex items-start justify-start"> 
                    <button className="flex items-center justify-center border border-white rounded-full" onClick={closeCallback}>
                        <MdClose size={24} />
                    </button>
                </IonCol>
                <IonCol size="6" className="flex items-start justify-start">
                    <article>
                        <span>{ currentImageIndex + 1 }</span>
                        <span>/</span>
                        <span>{currentImages.length}</span>
                    </article>
                </IonCol>
            </IonRow>

            {/* Images container */}
            <IonRow className="h-screen felx items-center justify-center">
                <IonCol className="flex items-center justify-center">
                    <button className="border border-white rounded-full" onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                        <MdArrowBackIos />
                    </button>
                </IonCol>
                <IonCol className="flex items-center justify-center">
                    <HandleMultimediaCard type={currentImages[currentImageIndex].type} url={currentImages[currentImageIndex].url} />
                </IonCol>
                <IonCol className="flex items-center justify-center">
                    <button className="border-1 border-gray-400 rounded-full" onClick={handleNextImage} disabled={!(currentImageIndex < currentImages.length - 1)}>
                        <MdArrowForwardIos />
                    </button>
                </IonCol>
            </IonRow>
            <IonRow></IonRow>
        </IonCol>
    )

}
