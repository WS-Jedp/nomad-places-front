import { IonRow, IonCol } from "@ionic/react";
import { SimpleCheckbox } from "../../form/inputs/checkbox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import {
  selectCommodityFilter,
  removeCommodityFilter,
  handleValueCommodityFilter,
} from "../../../store/redux/slices/filters";
import { useTranslation } from "react-i18next";
import {
  COMFORT_LEVEL_COMMODITY_ENUM,
  COMMODITY_QUALITY,
  FOOD_COMMODITY_ENUM,
  getCommodityOptions,
  MOBILE_SIGNAL_COMMODITY_ENUM,
  PARKING_COMMODITY_ENUM,
  PLACE_COMMODITIES_ENUM,
  TEMPERATURE_CONTROL_COMMODITY_ENUM,
  WIFI_SPEED_COMMODITY_ENUM,
} from "../../../models/places";
import { useMemo, useState } from "react";
import { OptionsPicker } from "../../form/inputs/picker";
import { MutipleOptionsPicker } from "../../form/inputs/pickerMultipleOptions";

export const PlaceCommoditiesSelection: React.FC = () => {
  const { t } = useTranslation();

  const {
    selectedSpotCommoditiesFilter,
    selectedValuesSpotCommoditiesFilter,
    spotCommoditiesFilter,
  } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  function isComoditySelected(commodityId: number) {
    return selectedSpotCommoditiesFilter.includes(commodityId);
  }

  function handleCallback(commidityId: number, value?: string) {
    if (value) {
      const commodity = spotCommoditiesFilter.find(
        (c) => c.id == commidityId
      )?.commodity;
      if (!commodity) return;
      dispatch(handleValueCommodityFilter({ commodity, value }));
    } else {
      if (!isComoditySelected(commidityId)) {
        dispatch(selectCommodityFilter({ commodityFilterID: commidityId }));
      } else {
        dispatch(removeCommodityFilter({ commodityFilterID: commidityId }));
      }
    }
  }

  function getSelectedOptionsCommodities(commodity: PLACE_COMMODITIES_ENUM) {
    switch (commodity) {
      case PLACE_COMMODITIES_ENUM.WIFI_SPEED:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.WIFI_SPEED
        )?.value as WIFI_SPEED_COMMODITY_ENUM;
      case PLACE_COMMODITIES_ENUM.FOOD:
        return (
          (selectedValuesSpotCommoditiesFilter.find(
            (c) => c.commodity == PLACE_COMMODITIES_ENUM.FOOD
          )?.value as FOOD_COMMODITY_ENUM[]) || []
        );
      case PLACE_COMMODITIES_ENUM.PARKING:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.PARKING
        )?.value as PARKING_COMMODITY_ENUM;
      case PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL
        )?.value as MOBILE_SIGNAL_COMMODITY_ENUM;
      case PLACE_COMMODITIES_ENUM.FOOD_QUALITY:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.FOOD_QUALITY
        )?.value as COMMODITY_QUALITY;
      case PLACE_COMMODITIES_ENUM.COMFORT_LEVEL:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.COMFORT_LEVEL
        )?.value as COMFORT_LEVEL_COMMODITY_ENUM;
      case PLACE_COMMODITIES_ENUM.CAFE_QUALITY:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.CAFE_QUALITY
        )?.value as COMMODITY_QUALITY;
      case PLACE_COMMODITIES_ENUM.BAKERY_QUALITY:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.BAKERY_QUALITY
        )?.value as COMMODITY_QUALITY;
      case PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL:
        return selectedValuesSpotCommoditiesFilter.find(
          (c) => c.commodity == PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL
        )?.value as TEMPERATURE_CONTROL_COMMODITY_ENUM[] | [];
    }
  }

  const commoditiesSelectedOptions = useMemo(
    () => [
      PLACE_COMMODITIES_ENUM.WIFI_SPEED,
      PLACE_COMMODITIES_ENUM.PARKING,
      PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL,
      PLACE_COMMODITIES_ENUM.FOOD_QUALITY,
      PLACE_COMMODITIES_ENUM.COMFORT_LEVEL,
      PLACE_COMMODITIES_ENUM.CAFE_QUALITY,
      PLACE_COMMODITIES_ENUM.BAKERY_QUALITY,
    ],
    []
  );

  const multipleOptionsCommodities = useMemo(
    () => [
      PLACE_COMMODITIES_ENUM.FOOD,
      PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL,
    ],
    []
  );

  const booleanCommodities = useMemo(
    () => [
      PLACE_COMMODITIES_ENUM.PUBLIC_WIFI,
      PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS,
      PLACE_COMMODITIES_ENUM.ACCESSIBILITY,
      PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY,
      PLACE_COMMODITIES_ENUM.BAKERY,
      PLACE_COMMODITIES_ENUM.CAFE,
      PLACE_COMMODITIES_ENUM.COWORK_SPACE,
      PLACE_COMMODITIES_ENUM.EVENT_SPACE,
      PLACE_COMMODITIES_ENUM.ACCESSIBILITY,
    ],
    []
  );

  return (
    <IonRow>
      <IonCol
        size="12"
        className="flex flex-col items-start justify-start px-3 my-3"
      >
        <h2 className="font-bold text-md text-coffi-black">
          {t("filters.labels.checkWhatYouNeed")}
        </h2>
      </IonCol>
      {spotCommoditiesFilter
        .filter((c) => booleanCommodities.includes(c.commodity))
        .map((commodity) => (
          <IonCol size="12" sizeMd="4" key={commodity.id}>
            <SimpleCheckbox
              label={t(
                `filters.commodities.${
                  commodity.commodity === PLACE_COMMODITIES_ENUM.BAKERY
                    ? "bakery.label"
                    : commodity.commodity
                }`
              )}
              callback={() => handleCallback(commodity.id)}
              isSelected={isComoditySelected(commodity.id)}
              small
            />
          </IonCol>
        ))}

      <IonRow class="flex flex-row w-full">
        <IonCol
          size="12"
          className="flex flex-col items-start justify-start px-3 my-3"
        >
          <h2 className="font-bold text-md text-coffi-black">
            {t("filters.labels.selectWhatYouNeed")}
          </h2>
        </IonCol>
        {spotCommoditiesFilter
          .filter((c) => commoditiesSelectedOptions.includes(c.commodity))
          .map((commodity) => (
            <IonCol size="6" sizeMd="6" key={commodity.id} className="mb-2">
              <div className="px-3">
                <OptionsPicker
                  key={commodity.id}
                  label={t(`filters.commodities.${commodity.commodity}.label`)}
                  small
                  onChangeInputValue={(val) => {
                    handleCallback(commodity.id, val);
                  }}
                  options={getCommodityOptions(commodity.commodity)}
                  currentSelection={
                    getSelectedOptionsCommodities(commodity.commodity) as string
                  }
                />
              </div>
            </IonCol>
          ))}
      </IonRow>

      <IonCol
        size="12"
        className="flex flex-col items-start justify-start px-3 my-3"
      >
        <h2 className="font-bold text-md text-coffi-black">
          {t("filters.labels.selectAllWhatYouNeed")}
        </h2>
      </IonCol>
      {spotCommoditiesFilter
        .filter((c) => multipleOptionsCommodities.includes(c.commodity))
        .map((c) => (
          <IonRow
            className="relative w-full flex flex-col items-start justify-start px-3"
            key={c.id}
          >
            <MutipleOptionsPicker
              label={t(`filters.commodities.${c.commodity}.label`)}
              onSelect={(value) => {
                handleCallback(c.id, value);
              }}
              small
              options={getCommodityOptions(c.commodity)}
              id={c.commodity}
              selected={getSelectedOptionsCommodities(c.commodity) as string[]}
            />
          </IonRow>
        ))}
    </IonRow>
  );
};
