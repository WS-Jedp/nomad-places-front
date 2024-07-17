import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { AppModal } from "../../../components/modals/container";
import { VisitedPlaceDTO } from "../../../models/places";
import { placesServices } from "../../../services/places";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { MULTIMEDIA_TYPE } from "../../../models/multimedia";
import { useHistory } from "react-router";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { findPlace } from "../../../store/redux/slices/places";
import { useTranslation } from "react-i18next";

export interface SpotsDiscoveredModalProps {
  closeCallback: () => void;
  externalProfileID?: string;
}

export const SpotsDiscoveredModal: React.FC<SpotsDiscoveredModalProps> = ({
  closeCallback,
  externalProfileID,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userData = useAppSelector((state) => state.user.userData);
  const { token } = useAppSelector((state) => state.user.auth);

  const [places, setPlaces] = useState<VisitedPlaceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getUserDiscoveredPlaces() {
    try {
      setLoading(true);
      if (!userData || !token) {
        throw new Error("User data is not available");
      }
      const PlacesServices = new placesServices();
      const visitedPlaces = !externalProfileID
        ? await PlacesServices.getAuthUserVisitedSpots({ token })
        : await PlacesServices.getVisitedSpotsByUser({
            token,
            userID: externalProfileID,
          });
      setPlaces(visitedPlaces);
      setLoading(false);
    } catch (error) {
      dispatch(
        addError(
          new ControlledError(
            String(error),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
    }
  }

  function getSpotFirstImageOrDefaultImage(place: VisitedPlaceDTO) {
    if (place.multimedia.length > 0) {
      const firstImage = place.multimedia.find(
        (media) => media.type === MULTIMEDIA_TYPE.IMAGE
      );
      if (firstImage) {
        return firstImage.url;
      } else {
        return "https://via.placeholder.com/150";
      }
    }

    return "https://via.placeholder.com/150";
  }

  async function goToSpot(placeID: string) {
    await dispatch(findPlace({ placeID }));
    history.push(`/home/detail/${placeID}`);
  }

  useEffect(() => {
    getUserDiscoveredPlaces();
  }, []);

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[720px] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={closeCallback}
          />

          <h2 className="font-bold text-md">{t("visited.titles.visited")}</h2>
        </IonRow>

        <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
          <h2 className="font-bold text-lg mb-2">
            { !externalProfileID ? t("visited.titles.placesHaveBeen") : t("messages.visited.byUser.external.visited") }
          </h2>
          {loading ? (
            <LoaderSpinner />
          ) : places.length > 0 ? (
            <ul className="w-full">
              {places.map((place) => (
                <li
                  className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2"
                  key={place.id}
                >
                  <button
                    className="flex flex-row items-center justify-start hover:underline"
                    onClick={() => goToSpot(place.id)}
                  >
                    <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                      <img
                        src={getSpotFirstImageOrDefaultImage(place)}
                        alt={`${place.name} image`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </figure>
                    <h2 className="font-semibold text-sm ml-3">{place.name}</h2>
                  </button>

                  {/* <p
                          className="
                                          relative
                                          text-xs md:text-md font-light px-3 py-1
                                      "
                        >
                          Discovered the 12 december 2023
                        </p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500">{ !externalProfileID ? t("messages.visited.byUser.empty") : t("messages.visited.byUser.external.empty")}</p>
          )}
        </section>
      </section>
    </AppModal>
  );
};
