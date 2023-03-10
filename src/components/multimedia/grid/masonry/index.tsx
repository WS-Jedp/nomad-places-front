import { IonRow } from "@ionic/react"
import './styles.css'

export const MultimediaMasonryGrid:React.FC = () => {

    return (
        <IonRow className="relative w-full h-full">
            <section className="w-full grid-multimedia-container">
                <figure className="relative w-full h-full">
                    <img src="https://picsum.photos/200/300" alt="Hello" className="w-full h-full object-cover bg-gray-300 rounded-md" />
                </figure>
                <figure className="relative w-full h-full">
                    <img src="https://picsum.photos/200/400" alt="Hello" className="w-full h-full object-cover bg-gray-300 rounded-md" />
                </figure>
                <figure className="relative w-full h-full">
                    <img src="https://picsum.photos/200/200" alt="Hello" className="w-full h-full object-cover bg-gray-300 rounded-md" />
                </figure>
                <figure className="relative w-full h-full">
                    <img src="https://picsum.photos/400/400" alt="Hello" className="w-full h-full object-cover bg-gray-300 rounded-md" />
                </figure>
               
            </section>
        </IonRow>
    )
}