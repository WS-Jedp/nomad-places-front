import { useParams, useHistory } from "react-router-dom";
import { IonRow, IonText } from "@ionic/react";
import { useEffect } from "react";

import { DetailAndSessionActionsLayout } from "../../layouts/DetailAndSessionActionsLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { findPlace } from "../../store/redux/slices/places";
import PlacesService from "../../services/places";
import { PlaceInformationDetail } from "../../containers/placeInformationDetail";
import { PlaceSessionDetail } from "../../containers/placeSessionDetail";
import { socket } from "../../socket";
import { getCurrentISODate } from "../../common/utils/dates";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { BackNavigationHeader } from "../../components/header/backNavigation";
import { createSocket } from "../../store/redux/slices/userSession";
import { getSpotCachedSession } from "../../store/redux/slices/spotSession";
import { useDistanceToSpot } from "../../common/hooks/useDistanceToSpot";
import { PLACE_CONFIRMATION_STATUS } from "../../models/places";
import { PlaceQuickSession } from "../../containers/placeQuickSession";

export const PlaceDetailPage = () => {
  const history = useHistory();
  const { currentPlace } = useAppSelector((state) => state.places);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [isMobile] = useIsMobile();

  function handleEmptyCurrentPlace() {
    findPlace({ placeID: id });
    if (!currentPlace) return handleGoBack();
  }

  function handleGoBack() {
    history.push("/home");
  }

  async function handleCreateComponent() {
    if (!id) return handleGoBack();
    if (!currentPlace) return handleEmptyCurrentPlace();
  }

  async function getCachedSession() {
    if (!currentPlace || !currentPlace.id) return;
    await dispatch(getSpotCachedSession({ spotID: currentPlace.id }));
  }

  useEffect(() => {
    handleCreateComponent();
    getCachedSession();
  }, []);

  return (
    <IonRow className="relative h-screen w-screen overflow-y-hidden bg-white text-black">
      {isMobile && <BackNavigationHeader />}
      <DetailAndSessionActionsLayout secondTab={<PlaceSessionDetail />}>
        <PlaceQuickSession />
      </DetailAndSessionActionsLayout>
    </IonRow>
  );
};
