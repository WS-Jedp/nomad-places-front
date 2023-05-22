import { useState } from "react";
import { IonCol, IonRow } from "@ionic/react";
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from "react-icons/md";
import { PlaceMultimedia, RecentActivity } from "../../models/multimedia";
import { HandleMultimediaCard } from "../../components/multimedia/cards/helpers/handleMultimediaCard";
import { AvatarSingleCircle } from "../../components/avatar/singleCircle";

interface MultimediaSliderModalProps {
  images: PlaceMultimedia[] | RecentActivity[];
  recentActivity?: boolean;
  currentImage?: number;
  closeCallback: () => void;
}

export const MultimediaSliderModal: React.FC<MultimediaSliderModalProps> = ({
  currentImage,
  images,
  closeCallback,
  recentActivity = false,
}) => {
  const [currentImages, setCurrentImages] = useState<PlaceMultimedia[] | RecentActivity[]>(images);
  const [currentRecentActivities, setCurrentRecentActivities] = useState<RecentActivity[]>(recentActivity ? images as RecentActivity[] : []);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(
    currentImage || 0
  );

  function handleNextImage() {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  function handlePrevImage() {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }


  // Method to compute how many hours ago was the recent activity
  function computeHoursAgo(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  }

  return (
    <IonCol size="12" className="w-full h-full bg-black">
      <IonRow className="h-6 p-9">
        <IonCol size="6" className="flex items-start justify-start">
          <button
            className="flex items-center justify-center border border-white rounded-full"
            onClick={closeCallback}
          >
            <MdClose size={24} />
          </button>
        </IonCol>
        <IonCol size="6" className="flex items-start justify-start">
          <article>
            <span>{currentImageIndex + 1}</span>
            <span>/</span>
            <span>{currentImages.length}</span>
          </article>
        </IonCol>
      </IonRow>

      {/* Images container */}
      {currentImages.length > 0 && (
        <IonRow className="h-screen felx items-center justify-center">
          <IonCol size="2" className="flex items-center justify-center">
            <button
              className="border-1 border-gray-400 rounded-full outline outline-gray-300 outline-1 p-3"
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
            >
              <MdArrowBackIos />
            </button>
          </IonCol>
          <IonCol size="8" sizeMd="6" className="flex flex-col items-center justify-center">

            {/* --------------------------------- */}
            {/* User who made the recent activity */}
            {recentActivity && (
                <IonCol size="12" className="flex items-center justify-between my-3">
                  <div className="flex items-center">
                    <AvatarSingleCircle url={currentRecentActivities[currentImageIndex].userPhotoURL || 'random'} />
                    <p className="ml-3">Username</p>
                  </div>

                  <span className="text-sm">
                   12h
                  </span>
              </IonCol>
            )}
            {/* User who made the recent activity */}
            {/* --------------------------------- */
            }
              <IonRow className="h-[500px] min-h-[500px] md:min-h-auto md:h-auto">
                <HandleMultimediaCard
                  type={currentImages[currentImageIndex].type}
                  url={currentImages[currentImageIndex].url}
                />
              </IonRow>
          </IonCol>
          <IonCol size="2" className="flex items-center justify-center">
            <button
              className="border-1 border-gray-400 rounded-full outline outline-gray-300 outline-1 p-3"
              onClick={handleNextImage}
              disabled={!(currentImageIndex < currentImages.length - 1)}
            >
              <MdArrowForwardIos />
            </button>
          </IonCol>
        </IonRow>
      )}
    </IonCol>
  );
};
