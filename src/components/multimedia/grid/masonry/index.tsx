import { IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { PlaceMultimedia } from "../../../../models/multimedia";
import { HandleMultimediaCard } from "../../cards/helpers/handleMultimediaCard";
import "./styles.css";
import { MdImageNotSupported } from "react-icons/md";

interface MultimediaMasonryGridProps {
  multimedia: PlaceMultimedia[];
  onMultimedia: (index: number) => void;
}

export const MultimediaMasonryGrid: React.FC<MultimediaMasonryGridProps> = ({
  multimedia,
  onMultimedia,
}) => {
  const { t } = useTranslation();
  return (
    <IonRow className="grid grid-cols-2 grid-rows-2 gap-4 relative w-full h-full">
      {/* Big square on the left */}
      <figure
        className="relative w-full h-full rounded-md overflow-hidden shadow-sm cursor-pointer col-span-1 row-span-2 bg-gray-300"
        onClick={() => onMultimedia(0)}
      >
        <HandleMultimediaCard
          type={multimedia[0]?.type}
          url={multimedia[0]?.url}
        />
      </figure>
      {/* Top-right image */}
      <div
        className="relative w-full h-full rounded-md overflow-hidden shadow-sm cursor-pointer col-span-1 row-span-1 bg-gray-300"
        onClick={() => onMultimedia(1)}
      >
        <HandleMultimediaCard
          type={multimedia[1]?.type}
          url={multimedia[1]?.url}
        />
      </div>
      {/* Bottom-right image */}
      <div
        className="relative w-full h-full rounded-md overflow-hidden shadow-sm cursor-pointer col-span-1 row-span-1 bg-gray-300"
        onClick={() => onMultimedia(2)}
      >
        <HandleMultimediaCard
          type={multimedia[2]?.type}
          url={multimedia[2]?.url}
        />
      </div>

      {
        !multimedia.length && (
            <div className="absolute top-0 left-0 bg-black/60 rounded-md w-full h-full flex flex-col items-center justify-center">
                <MdImageNotSupported size={42} color='white' />
                <p className="text-white text-md font-light">
                    {t('spots.messages.noMultimedia')}
                </p>
            </div>
        )
      }
    </IonRow>
  );
};
