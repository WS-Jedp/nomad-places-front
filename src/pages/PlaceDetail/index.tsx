import { useParams, useHistory } from "react-router-dom";
import { IonRow, IonText } from "@ionic/react";
import { useEffect } from "react";

import { DetailAndSessionActionsLayout } from "../../layouts/DetailAndSessionActionsLayout";
import { useAppDispatch, useAppSelector } from "../../common/hooks/useTypedSelectors";
import { findPlace } from "../../store/redux/slices/places";
import PlacesService from "../../services/places";
import { PlaceInformationDetail } from "../../containers/placeInformationDetail";
import { PlaceSessionDetail } from "../../containers/placeSessionDetail";
import { socket } from "../../socket";
import { getCurrentISODate } from "../../common/utils/dates";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { BackNavigationHeader } from "../../components/header/backNavigation";
import { createSocket } from "../../store/redux/slices/userSession";


export const PlaceDetailPage = () => {
  const history = useHistory();
  const { userData } = useAppSelector((state) => state.user);
  const { currentPlace } = useAppSelector((state) => state.places);
  const { socket } = useAppSelector((state) => state.userSession);
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>();
  const [isMobile] = useIsMobile();

  function handleEmptyCurrentPlace() {
    findPlace({ placeID: id });
    if (!currentPlace) return handleGoBack();
  }

  function handleGoBack() {
    history.push("/home");
  }

  async function connectUserToSession(placeID: string) {
    if(!socket && userData) {
      await dispatch( createSocket({ placeID: placeID, userID: userData.id, username: userData.username }) )
    }
    if(!socket) return
    await socket?.joinSession()
    socket?.onSessionMessage(message => {
      console.log(message, "THIS IS THE MESSAGE")
    })
  }

  async function getPlaceDetail() {
    const place = await PlacesService.getPlace({ placeID: id });
    await connectUserToSession(place.place.id)
  }

  async function handleCreateComponent() {
    if (!id) return handleGoBack();
    if (!currentPlace) return handleEmptyCurrentPlace();
    await getPlaceDetail();
  }


  useEffect(() => {
    handleCreateComponent()
  }, []);

  useEffect(() => {
    if(!currentPlace) return
    connectUserToSession(currentPlace.id)
  }, [socket])

  return (
    <IonRow className="relative h-screen w-screen overflow-y-hidden bg-white text-black">
      {isMobile && <BackNavigationHeader />}
      <IonRow className={`w-full h-auto ${isMobile ? "p-3" : ""}`}>
        {isMobile && (
            <IonText>
              <h2 className="font-bold text-3xl">{currentPlace?.name}</h2>
              <p className="pt-1">
                <span>Type of place</span> - <span>Zone of the place</span>
              </p>
            </IonText>
        )}
      </IonRow>
      <DetailAndSessionActionsLayout secondTab={<PlaceSessionDetail />}>
        <PlaceInformationDetail />
      </DetailAndSessionActionsLayout>
    </IonRow>
  );
};
