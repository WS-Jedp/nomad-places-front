import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { AppModal } from "../../../../components/modals/container";
import PlacesServices from '../../../../services/places'
import { addError } from "../../../../store/redux/slices/controlledErrors";
import { ControlledError } from "../../../../common/controlledError";
import { ControlledErrorType } from "../../../../common/controlledError/types";
import { LoaderSpinner } from "../../../../components/loaders/spinner";
import { ConfirmDiscoveredSpotForm } from "../../discoveredPlaceForm/confirmSpotForm";
import { DiscoveredPlaceConfirmation } from "../../../../models/placeConfirmation";
import { newSpotDiscoveredConfirmedDTO } from "../../../../dto/places";

export interface ConfirmPlaceDiscoveredProps {
  closeCallback: () => void;
  onSuccess: (spotState: newSpotDiscoveredConfirmedDTO) => void;
}

export const ConfirmPlaceDiscoveredModal: React.FC<ConfirmPlaceDiscoveredProps> = ({
  closeCallback,
  onSuccess,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDiscoveryForm, setShowDiscoveryForm] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.user.auth);
  const currentPlace = useAppSelector((state) => state.places.currentPlace);
  const dispatch = useAppDispatch();

  const [spotReviews, setSpotReviews] = useState<DiscoveredPlaceConfirmation[]>([]);

  function handleOnShareDiscovery() {
    setShowDiscoveryForm(true);
  }

  function hideShareDiscovery() {
    setShowDiscoveryForm(false);
  }

  async function getSpotsConfirmationsData() {
    try {
      if(!currentPlace)  {
        throw new Error('No place selected')
      }

      if(!token) {
        throw new Error('You need to be logged in to be able to confirm the spot.')
      }
      setIsLoading(true)
      const spotReviews = await PlacesServices.getAllSpotReviews({ spotID: currentPlace.id, token})
      setSpotReviews(spotReviews)
    } catch (error) {
      dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
      setTimeout(() => closeCallback(), 500)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSpotsConfirmationsData()
  }, [])

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-2xl h-[720px] max-h-[720px] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row items-center justify-between p-5 px-9 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={closeCallback}
          />

          <h2 className="font-bold text-md">
            {t("discover.discovered.confirm.title")}
          </h2>
        </IonRow>
        {
          isLoading ? (
            <LoaderSpinner />
          ) : (
            <ConfirmDiscoveredSpotForm onSave={onSuccess} onCancel={closeCallback} reviews={spotReviews} />
          )
        }
      </section>
    </AppModal>
  );
};
