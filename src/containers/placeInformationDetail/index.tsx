import { IonCol, IonRow } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { HandleAmenitiesRender } from "../../components/amenities/handleAmenitiesRender";
import { AppModal } from "../../components/modals/container";
import { MultimediaMasonryGrid } from "../../components/multimedia/grid/masonry";
import { HandleRuleRender } from "../../components/rules/handleRuleRender";
import { PlaceDetailMultimediaSlider } from "../../components/slider/placeDetailMultimediaSlider";
import {
  MAIN_PLACE_COMMODITIES_KEYS,
  MAIN_RULES_KEYS,
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
} from "../../models/places";
import { MultimediaSliderModal } from "../multimediaSliderModal";

export const PlaceInformationDetail: React.FC = () => {
  const { t } = useTranslation()
  const { currentPlace } = useAppSelector((state) => state.places);

  const [multimediaModalOpen, setMultimediaOpen] = useState<boolean>(false);
  const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);

  function handleSelectMedia(index: number) {
    setMediaSelectedIndex(index);
    setMultimediaOpen(true);
  }

  const [isMobile] = useIsMobile();

  function getRuleValue(rule: PLACE_RULES_ENUM): {
    [key: string]: boolean | string | null;
  } {
    return {
      [rule]: currentPlace?.rules[rule] || null,
    };
  }

  return (
    <IonRow className="w-full h-auto pb-[210px] flex flex-col flex-nowrap overflow-x-hidden p-3">
      <section className="mb-3">
        <h2 className="font-bold text-lg">{t('spots.information.description')}:</h2>
        <p className="font-regular text-md">
          {currentPlace?.description ||
            t('spots.messages.noDescription')}
        </p>
      </section>

      <section className="mb-3">
        <h2 className="font-bold text-lg">{t('spots.information.rules')}:</h2>
        <IonRow className="relative w-full h-auto">
          {currentPlace &&
            MAIN_RULES_KEYS.map((rule, i) => {
              const ruleValue = getRuleValue(rule);
              if (typeof ruleValue[rule] === "string") return null;
              return (
                <IonCol size="12" sizeMd="6" className="my-3" key={i}>
                  <HandleRuleRender
                    rule={ruleValue as { [key: string]: boolean | null }}
                  />
                </IonCol>
              );
            })}
        </IonRow>
      </section>

      <section className="my-3">
        <h2 className="font-bold text-lg">{t('spots.information.commodities')}:</h2>
        <IonRow className="relative w-full h-auto">
          {currentPlace &&
            MAIN_PLACE_COMMODITIES_KEYS.map((commodity, i) => {
              let optValue;

              if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
                optValue = currentPlace.commodities?.wifiSpeed
                  ? `${t('spots.messages.commodities.publicWifi')} ${currentPlace.commodities?.wifiSpeed}Mbs`
                  : undefined;
              }

              if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS) {
                optValue = currentPlace.commodities?.plugsAmount
                  ? `${t('spots.messages.commodities.plugs')} ${currentPlace.commodities?.plugsAmount}`
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

      <section className="relative my-3 w-full flex flex-col flex-nowrap overflow-x-auto">
        <h2 className="font-bold text-lg">{t('spots.information.multimedia')}</h2>
        <section>
          <PlaceDetailMultimediaSlider
            multimedia={currentPlace?.multimedia || []}
            callback={handleSelectMedia}
          />
        </section>
      </section>

      {/* Multimedia detail view with app modal */}
      {multimediaModalOpen && (
        <AppModal>
          <MultimediaSliderModal
            images={currentPlace?.multimedia || []}
            closeCallback={() => setMultimediaOpen(false)}
            currentImage={mediaSelectedIndex}
          />
        </AppModal>
      )}
    </IonRow>
  );
};
