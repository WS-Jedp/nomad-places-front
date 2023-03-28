import { useParams, useHistory } from "react-router-dom";
import { IonCol, IonRow, IonText } from "@ionic/react";
import { useEffect } from "react";
import { DetailAndSessionActionsLayout } from "../../layouts/DetailAndSessionActionsLayout";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { findPlace } from "../../store/redux/slices/places";
import PlacesService from "../../services/places";
import {
  MAIN_PLACE_COMMODITIES_KEYS,
  MAIN_RULES_KEYS,
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
} from "../../models/places";
import { HandleRuleRender } from "../../components/rules/handleRuleRender";
import { HandleAmenitiesRender } from "../../components/amenities/handleAmenitiesRender";
import { MultimediaMasonryGrid } from "../../components/multimedia/grid/masonry";

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

  function getRuleValue(rule: PLACE_RULES_ENUM): {
    [key: string]: boolean | string | null;
  } {
    return {
      [rule]: currentPlace?.rules[rule] || null,
    };
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
      <DetailAndSessionActionsLayout secondTab={<p>Hello from second tab</p>}>
        <IonRow className="w-full h-auto pb-[210px] flex flex-col flex-nowrap overflow-x-hidden">
          <section className="mb-3">
            <h2 className="font-bold text-lg">Description:</h2>
            <p className="font-regular text-md">
              {
                currentPlace?.description || 
                "There is no description about this spot 🥲"
              }
            </p>
          </section>

          <section className="mb-3">
            <h2 className="font-bold text-lg">Rules:</h2>
            <IonRow className="relative w-full h-auto">
              {currentPlace &&
                MAIN_RULES_KEYS.map((rule, i) => {
                  const ruleValue = getRuleValue(rule);
                  if (typeof ruleValue[rule] === "string") return null;
                  return (
                    <IonCol size="6" className="my-3" key={i}>
                      <HandleRuleRender
                        rule={ruleValue as { [key: string]: boolean | null }}
                      />
                    </IonCol>
                  );
                })}
            </IonRow>
          </section>

          <section className="my-3">
            <h2 className="font-bold text-lg">Commodities:</h2>
            <IonRow className="relative w-full h-auto">
              {currentPlace &&
                MAIN_PLACE_COMMODITIES_KEYS.map((commodity, i) => {
                  let optValue;

                  if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
                    optValue = currentPlace.commodities?.wifiSpeed
                      ? `Speed of ${currentPlace.commodities?.wifiSpeed}Mbs`
                      : undefined;
                  }

                  if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS) {
                    optValue = currentPlace.commodities?.plugsAmount
                      ? `There is around ${currentPlace.commodities?.plugsAmount} plugs`
                      : undefined;
                  }

                  return (
                    <IonCol size="6" className="my-3" key={i}>
                      <HandleAmenitiesRender
                        amenities={commodity}
                        state={
                          currentPlace.commodities
                            ? currentPlace.commodities[commodity]
                              ? true
                              : false
                            : false
                        }
                      />
                    </IonCol>
                  );
                })}
            </IonRow>
          </section>

          <section className="relative my-3 w-full h-72 flex flex-col flex-nowrap overflow-x-auto overflow-y-hidden">
            <h2 className="font-bold text-lg">Multimedia:</h2>
            <MultimediaMasonryGrid multimedia={currentPlace?.multimedia || []} />
          </section>
        </IonRow>
      </DetailAndSessionActionsLayout>
    </IonRow>
  );
};
