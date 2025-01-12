import { IonCol, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { SimpleCheckbox } from "../../../../components/form/inputs/checkbox";
import { SpotCommoditiesFilters } from "../../../../models/filters";
import {
  getCommodityOptions,
  PLACE_COMMODITIES_ENUM
} from "../../../../models/places";
import { useMemo } from "react";
import { OptionsPicker } from "../../../../components/form/inputs/picker";
import { MutipleOptionsPicker } from "../../../../components/form/inputs/pickerMultipleOptions";

export interface SpotCommoditiesProps {
  onSpotCommodity: (spotCommodity: number, value?: string | string[]) => void;
  selectedSpotCommodities: number[];
  selectedCommodityOptions: {
    [key:string]: string | string[] | undefined
  }
  commiditiesWithDetail?: { [key: string]: string };
}
export const SpotCommoditiesInput: React.FC<SpotCommoditiesProps> = ({
  onSpotCommodity,
  selectedSpotCommodities,
  selectedCommodityOptions,
  commiditiesWithDetail,
}) => {
  const { t } = useTranslation();
  const { spotCommoditiesFilter } = useAppSelector((state) => state.filters);

  const selectCommodities = [
    PLACE_COMMODITIES_ENUM.WIFI_SPEED,
    PLACE_COMMODITIES_ENUM.PARKING,
    PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL,
    PLACE_COMMODITIES_ENUM.FOOD_QUALITY,
    PLACE_COMMODITIES_ENUM.COMFORT_LEVEL,
    PLACE_COMMODITIES_ENUM.CAFE_QUALITY,
    PLACE_COMMODITIES_ENUM.BAKERY_QUALITY,
  ];

  const multipleOptionsCommodities = [
    PLACE_COMMODITIES_ENUM.FOOD,
    PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL,
  ];

  

  function getSelectedOptionsCommodities(rule: PLACE_COMMODITIES_ENUM) {
    switch(rule) {
      case PLACE_COMMODITIES_ENUM.WIFI_SPEED:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.WIFI_SPEED] as PLACE_COMMODITIES_ENUM.WIFI_SPEED
      case PLACE_COMMODITIES_ENUM.FOOD:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.FOOD] as PLACE_COMMODITIES_ENUM.FOOD[] || []
      case PLACE_COMMODITIES_ENUM.PARKING:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.PARKING] as PLACE_COMMODITIES_ENUM.PARKING
      case PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL] as PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL
      case PLACE_COMMODITIES_ENUM.FOOD_QUALITY:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.FOOD_QUALITY] as PLACE_COMMODITIES_ENUM.FOOD_QUALITY
      case PLACE_COMMODITIES_ENUM.COMFORT_LEVEL:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.COMFORT_LEVEL] as PLACE_COMMODITIES_ENUM.COMFORT_LEVEL
      case PLACE_COMMODITIES_ENUM.CAFE_QUALITY:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.CAFE_QUALITY] as PLACE_COMMODITIES_ENUM.CAFE_QUALITY
      case PLACE_COMMODITIES_ENUM.BAKERY_QUALITY:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.BAKERY_QUALITY] as PLACE_COMMODITIES_ENUM.BAKERY_QUALITY
      case PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL:
        return selectedCommodityOptions[PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL] as PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL[] || []
    }
  }

  const currentBooleanCommodities = useMemo(
    () =>
      spotCommoditiesFilter.filter(
        (commodity) =>
          !selectCommodities.includes(commodity.commodity) &&
          !multipleOptionsCommodities.includes(commodity.commodity)
      ),
    [spotCommoditiesFilter]
  );
  const currentSelectCommodities = useMemo(
    () =>
      spotCommoditiesFilter.filter((commodity) =>
        selectCommodities.includes(commodity.commodity)
      ),
    [spotCommoditiesFilter]
  );
  const currentMultipleOptionsCommodities = useMemo(
    () =>
      spotCommoditiesFilter.filter((commodity) =>
        multipleOptionsCommodities.includes(commodity.commodity)
      ),
    [spotCommoditiesFilter]
  );

  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">
        {t("forms.inputs.spot.commodities.label")}
      </label>
      <IonRow>
        {currentBooleanCommodities.map((commodity) => (
          <IonCol size="12" sizeMd="6" key={commodity.id}>
            <SimpleCheckbox
              label={t(`filters.commodities.${commodity.commodity === PLACE_COMMODITIES_ENUM.BAKERY ? 'bakery.label' : commodity.commodity}`)}
              callback={() => onSpotCommodity(commodity.id)}
              isSelected={selectedSpotCommodities.includes(commodity.id)}
              small
              withInputValue={
                (commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS &&
                  selectedSpotCommodities.includes(commodity.id))
              }
              inputValue={
                commiditiesWithDetail &&
                commiditiesWithDetail[commodity.commodity]
              }
              inputPlaceholder={
                commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI
                  ? "Ej. 120mbps"
                  : commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS
                  ? "Ej. 9"
                  : ""
              }
            />
          </IonCol>
        ))}
      </IonRow>
      <h2 className="text-sm font-semibold my-2 mx-3">
        {t('filters.labels.selectBestOption')}
      </h2>
      <IonRow>
        {currentSelectCommodities.map((commodity) => (
          <IonCol size="12" sizeMd="6" key={commodity.id} className="px-3">
            <OptionsPicker
              key={commodity.id}
              label={t(`filters.commodities.${commodity.commodity}.label`)}
              small
              onChangeInputValue={(val) => {
                onSpotCommodity(commodity.id, val)
              }}
              options={getCommodityOptions(commodity.commodity)}
              currentSelection={getSelectedOptionsCommodities(commodity.commodity) as string}
            />
          </IonCol>
        ))}
      </IonRow>
      <h2 className="text-sm font-semibold my-2 mx-3">
        {t('filters.labels.pickBestOptions')}
      </h2>
      <IonRow className="px-3">
        {currentMultipleOptionsCommodities.map((c) => (
          <IonCol size="12" key={c.id}>
            <MutipleOptionsPicker
              label={t(`filters.commodities.${c.commodity}.label`)}
              onSelect={(value) => {
                onSpotCommodity(c.id, value)
              }}
              small
              options={getCommodityOptions(c.commodity)}
              id={c.commodity}
              selected={getSelectedOptionsCommodities(c.commodity) as string[]}
            />
          </IonCol>
        ))}
      </IonRow>

       {/* Divider */}
       <hr className="my-5" />
    </div>
  );
};
