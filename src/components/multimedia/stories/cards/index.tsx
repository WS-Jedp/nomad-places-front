import { IonRow, IonAvatar, IonText } from "@ionic/react";
import { MULTIMEDIA_TYPE } from "../../../../models/multimedia";
import { User } from "../../../../models/user";

type StoryMultimediaCardProps = {
  user?: User;
  multimediaUrl: string;
  multimediaType: MULTIMEDIA_TYPE;
  callback?: () => void;
};

export const StoryMultimediaCard: React.FC<StoryMultimediaCardProps> = ({
  user,
  multimediaType,
  multimediaUrl,
  callback
}) => {


  function handleMediaType() {

    if(multimediaType === MULTIMEDIA_TYPE.IMAGE) {
      return (
          <figure className="relative w-full h-full">
            <img
              src={multimediaUrl}
              alt="Story multimedia"
              className="object-cover w-full h-full rounded-xl"
            />
          </figure>
      )
    }

    if(multimediaType === MULTIMEDIA_TYPE.VIDEO) {
      return (
          <figure className="relative w-full h-full">
            <video
              src={multimediaUrl}
              className="object-cover w-full h-full rounded-xl"
            />
          </figure>
      )
    }
    
  }

  return (
    <article
      className="
                relative
                inline-block flex-column items-start justify-start
                min-w-[210px] w-full max-w-[240px] h-80
                rounded-xl
                shadow-md
                bg-gray-200
            "
      onClick={callback}
    >
      {user && (
        <IonRow className="relative flex flex-row w-full items-center justify-start p-3">
          <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-3"></figure>
          <IonText>
            <strong className="text-black text-sm font-semibold">
              {user.username}
            </strong>
          </IonText>
        </IonRow>
      )}
      {
        handleMediaType()
      }
    </article>
  );
};
