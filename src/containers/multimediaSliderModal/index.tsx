import { useState } from "react";
import { IonCol, IonRow } from "@ionic/react";
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from "react-icons/md";
import { PlaceMultimedia, RecentActivity } from "../../models/multimedia";
import { HandleMultimediaCard } from "../../components/multimedia/cards/helpers/handleMultimediaCard";
import { AvatarSingleCircle } from "../../components/avatar/singleCircle";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { getLocalISODate } from "../../common/utils/dates";
import { format, parseISO } from "date-fns";

interface MultimediaSliderModalProps {
  images: PlaceMultimedia[] | RecentActivity[];
  recentActivity?: boolean;
  currentImage?: number;
  closeCallback: () => void;
  onChangeRecentActivity?: (index: number) => void;
}

export const MultimediaSliderModal: React.FC<MultimediaSliderModalProps> = ({
  currentImage,
  images,
  closeCallback,
  onChangeRecentActivity,
  recentActivity = false,
}) => {
  const [currentImages, setCurrentImages] = useState<
    PlaceMultimedia[] | RecentActivity[]
  >(images);
  const [currentRecentActivities, setCurrentRecentActivities] = useState<
    RecentActivity[]
  >(recentActivity ? (images as RecentActivity[]) : []);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(
    currentImage || 0
  );

  function handleNextImage() {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    onChangeRecentActivity && onChangeRecentActivity(currentImageIndex + 1);
  }

  function handlePrevImage() {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }

    onChangeRecentActivity && onChangeRecentActivity(currentImageIndex - 1);
  }

  // Method to compute how many hours ago was the recent activity
  function computeHoursAgo(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  }

  const [isMobile] = useIsMobile();

  return (
    <IonCol
      size="12"
      className="relative w-full h-dvh md:h-full bg-black/[.84]"
    >
      <IonRow className="h-6 p-9">
        <IonCol size="6" className="flex items-start justify-start">
          <button
            className="flex items-center justify-center border border-white rounded-full"
            onClick={closeCallback}
          >
            <MdClose size={24} className="fill-white" />
          </button>
        </IonCol>
        <IonCol size="6" className="flex items-start justify-start">
          <article className="text-white">
            <span>{currentImageIndex + 1}</span>
            <span>/</span>
            <span>{currentImages.length}</span>
          </article>
        </IonCol>
      </IonRow>

      {/* Images container */}
      {currentImages.length > 0 && (
        <IonRow className="h-[500px] md:h-[100%] flex items-center justify-center">
          {!isMobile && (
            <IonCol size="2" className="flex items-center justify-center">
              <button
                className="border-solid border border-white rounded-full h-[39px] w-[39px] flex items-center justify-center cursor-pointer text-center"
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <MdArrowBackIos color="white" size={15} className="ml-1" />
              </button>
            </IonCol>
          )}

          <IonCol
            size="8"
            sizeMd="6"
            className="flex flex-col items-center justify-center"
          >
            {/* --------------------------------- */}
            {/* User who made the recent activity */}
            {recentActivity && (
              <IonCol
                size="12"
                className="flex items-center justify-between my-3"
              >
                <div className="flex items-center">
                  <AvatarSingleCircle
                    url={
                      currentRecentActivities[currentImageIndex].userPhotoURL ||
                      "random"
                    }
                  />
                  <p className="ml-3">
                    @{currentRecentActivities[currentImageIndex].username}
                  </p>
                </div>

                <span className="text-sm">
                  {format(
                    parseISO(
                      getLocalISODate(
                        currentRecentActivities[currentImageIndex].createdDate
                      )
                    ),
                    "p"
                  )}
                </span>
              </IonCol>
            )}
            {/* User who made the recent activity */}
            {/* --------------------------------- */}
            <IonRow className="h-[690px] md:h-[500px] w-[390px] md:w-[720px]">
              <HandleMultimediaCard
                type={currentImages[currentImageIndex].type}
                url={currentImages[currentImageIndex].url}
              />
            </IonRow>
          </IonCol>

          {!isMobile && (
            <IonCol size="2" className="flex items-center justify-center">
              <button
                className="border-solid border border-white rounded-full h-[39px] w-[39px] flex items-center justify-center cursor-pointer text-center"
                onClick={handleNextImage}
                disabled={!(currentImageIndex < currentImages.length - 1)}
              >
                <MdArrowForwardIos size={15} color="white" />
              </button>
            </IonCol>
          )}
        </IonRow>
      )}

      {isMobile && (
        <IonRow>
          <IonCol size="12" className="flex items-center justify-center">
            <button
              className="border-solid border border-white rounded-full h-[42px] w-[42px] flex items-center justify-center cursor-pointer text-center"
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
            >
              <MdArrowBackIos color="white" size={21} className="ml-2" />
            </button>
            <button
              className="border-solid border border-white rounded-full h-[42px] w-[42px] flex items-center justify-center cursor-pointer text-center ml-3"
              onClick={handleNextImage}
              disabled={!(currentImageIndex < currentImages.length - 1)}
            >
              <MdArrowForwardIos size={21} color="white" />
            </button>
          </IonCol>
        </IonRow>
      )}
    </IonCol>
  );
};
