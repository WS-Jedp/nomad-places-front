import { useParams, useHistory } from "react-router-dom";
import { IonCol, IonRow, IonText } from "@ionic/react";
import { useEffect } from "react";
import { DetailAndSessionActionsLayout } from "../../layouts/DetailAndSessionActionsLayout";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { findPlace } from "../../store/redux/slices/places";
import PlacesService from "../../services/places";
import { PlaceInformationDetail } from '../../containers/placeInformationDetail'
import { PlaceSessionDetail } from "../../containers/placeSessionDetail";
import { socket } from "../../socket";
import { getCurrentISODate } from "../../common/utils/dates";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { BackNavigationHeader } from "../../components/header/backNavigation";
import { AppModal } from "../../components/modals/container";

export const PlaceDetailPage = () => {
  const history = useHistory();
  const { currentPlace } = useAppSelector((state) => state.places);
  const { id } = useParams<{ id: string }>();
  const [ isMobile ] = useIsMobile()

  function handleEmptyCurrentPlace() {
    findPlace({ placeID: id });
    if (!currentPlace) return handleGoBack();
  }

  function handleGoBack() {
    history.push("/home");
  }


  async function getPlaceDetail() {
    const place = await PlacesService.getPlace({ placeID: id });
    // await socket.connect()

    // const date = getCurrentISODate().toISOString()
    // await socket.emit('join-place-session', { placeID: currentPlace?.id, userID: '6434c701801055bcd667b937', username: 'Juanes', currentDateISO: date })
  }

  useEffect(() => {
    if(!currentPlace) return
    socket.on(`place-session-message`, (paylaod) => {
      console.log(paylaod, 'THIS IS THE PAYLOAD')
    })
  }, [])

  useEffect(() => {
    if (!id) return handleGoBack();
    if (!currentPlace) return handleEmptyCurrentPlace();

    getPlaceDetail();
  }, []);

  return (
    <IonRow className="relative h-screen w-screen overflow-y-hidden bg-white text-black">
      <AppModal>
        <div className="w-32 h-32 bg-white">
          <h1>Modal</h1>
        </div>
      </AppModal>
      {
        isMobile && (
          <BackNavigationHeader />
        )
      }
      <IonRow className={`w-full h-auto ${isMobile ? 'p-3' : ''}`}>
        {
          isMobile && (
            <IonText>
              <h2 className="font-bold text-3xl">{currentPlace?.name}</h2>
              <p className="pt-1">
                <span>Type of place</span> - <span>Zone of the place</span>
              </p>
            </IonText>
          )
        }
      </IonRow>
      <DetailAndSessionActionsLayout secondTab={<PlaceSessionDetail />}>
        <PlaceInformationDetail />
      </DetailAndSessionActionsLayout>
    </IonRow>
  );
};