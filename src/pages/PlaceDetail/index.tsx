import { useParams, useHistory } from "react-router-dom";
import { IonCol, IonRow, IonText } from "@ionic/react";
import { useEffect } from "react";
import { DetailAndSessionActionsLayout } from "../../layouts/DetailAndSessionActionsLayout";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { findPlace } from "../../store/redux/slices/places";
import PlacesService from "../../services/places";
import { PlaceInformationDetail } from '../../containers/placeInformationDetail'
import { PlaceSessionDetail } from "../../containers/placeSessionDetail";

export const PlaceDetailPage = () => {
  const history = useHistory();
  const { currentPlace } = useAppSelector((state) => state.places);
  const { id } = useParams<{ id: string }>();

  function handleEmptyCurrentPlace() {
    findPlace({ placeID: id });
    if (!currentPlace) return handleGoBack();
  }

  function handleGoBack() {
    history.push("/home");
  }


  async function getPlaceDetail() {
    const place = await PlacesService.getPlace({ placeID: id });
    console.log(place);
  }

  useEffect(() => {
    if (!id) return handleGoBack();
    if (!currentPlace) return handleEmptyCurrentPlace();

    getPlaceDetail();
  }, []);

  return (
    <IonRow className="relative h-screen w-screen overflow-y-hidden bg-white text-black">
      <IonRow className="w-full h-auto p-3">
        <IonText>
          <h2 className="font-bold text-3xl">{currentPlace?.name}</h2>
          <p className="pt-1">
            <span>Type of place</span> - <span>Zone of the place</span>
          </p>
        </IonText>
      </IonRow>
      <DetailAndSessionActionsLayout secondTab={<PlaceSessionDetail />}>
        <PlaceInformationDetail />
      </DetailAndSessionActionsLayout>
    </IonRow>
  );
};
