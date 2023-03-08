import { IonRow, IonAvatar, IonText } from "@ionic/react"

export const StoryMultimediaCard: React.FC = () => {

    return (
        <article className="
            relative
            inline-block flex-column items-start justify-start
            min-w-[210px] w-full max-w-[240px] h-80
            rounded-xl
            shadow-md
            bg-gray-200
            "
        >
            <IonRow className="relative flex flex-row w-full items-center justify-start p-3">
                <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-3"></figure>
                <IonText>
                    <strong className="text-black text-sm font-semibold">
                        Name of the user
                    </strong>
                </IonText>

            </IonRow>
        </article>
    )
}