import { IonRow } from "@ionic/react";
import { IoMdClose } from "react-icons/io";
import { AppModal } from "../../../components/modals/container";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { DiscoveredPlaceByUserDTO } from "../../../models/places";
import { placesServices } from "../../../services/places";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { MULTIMEDIA_TYPE } from "../../../models/multimedia";
import { getLocalISODate } from "../../../common/utils/dates";
import { format, parseISO } from "date-fns";
import { findPlace } from "../../../store/redux/slices/places";

export interface SpotsRecommendedModalProps {
  closeCallback: () => void;
  externalProfileID?: string
}

export const SpotsRecommendedModal: React.FC<SpotsRecommendedModalProps> = ({
  closeCallback,
  externalProfileID
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userData = useAppSelector((state) => state.user.userData);
  const { token } = useAppSelector((state) => state.user.auth);

  const [places, setPlaces] = useState<DiscoveredPlaceByUserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function goToSpot(placeID: string) {
    await dispatch(findPlace({ placeID }));
    history.push(`/home/detail/${placeID}`);
  }

  function getSpotFirstImageOrDefaultImage(place: DiscoveredPlaceByUserDTO) {
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

  async function getAuthUserDiscoveredPlaces() {
    try {
      setLoading(true);
      if (!userData || !token) {
        throw new Error("User data is not available");
      }
      const PlacesServices = new placesServices();
      const discoveredPlaces = !externalProfileID ? await PlacesServices.getAuthUserDiscoveredSpots({
        token,
      }) : await PlacesServices.getDiscoveredPlacesByUser({ userID: externalProfileID });
      setPlaces(discoveredPlaces);
    } catch (error) {
      dispatch(
        addError(
          new ControlledError(
            String(error),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthUserDiscoveredPlaces();
  }, []);

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[72%] md:max-h-[600px]
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

          <h2 className="font-bold text-md">
            {t("discover.titles.discoveredPlaces")}
          </h2>
        </IonRow>

        <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
          <h2 className="font-bold text-lg mb-3">
            { !externalProfileID ? t("discover.titles.discoveredPlacesByUser") : t('messages.discover.byUser.external.discovered')}
          </h2>
          {loading ? (
            <LoaderSpinner />
          ) : places.length > 0 ? (
            <ul className="w-full">
              {places.map((place) => (
                <li className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2">
                  <button className="flex flex-row items-center justify-start hover:underline" onClick={() => goToSpot(place.id)}>
                    <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                      <img
                        src={getSpotFirstImageOrDefaultImage(place)}
                        alt={`${place.name} image`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </figure>
                    <h2 className="font-semibold text-sm ml-3">{place.name}</h2>
                  </button>

                  <p
                    className="
                                        relative
                                        text-xs md:text-md font-light px-3 py-1
                                    "
                  >
                    {t("messages.discover.spot.discoveredAt", {
                      date: format(
                        parseISO(getLocalISODate(place.discoveredDate)),
                        "d/MM/yyyy, p"
                      ),
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500">
              { !externalProfileID ? t("messages.discover.byUser.empty") : t('messages.discover.byUser.external.empty') }
            </p>
          )}
        </section>
      </section>
    </AppModal>
  );
};
