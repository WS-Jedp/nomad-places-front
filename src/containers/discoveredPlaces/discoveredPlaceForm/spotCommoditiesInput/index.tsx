import { IonCol, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { SimpleCheckbox } from "../../../../components/form/inputs/checkbox";
import { SpotCommoditiesFilters } from "../../../../models/filters";
import { PLACE_COMMODITIES_ENUM } from "../../../../models/places";


export interface SpotCommoditiesProps {
  onSpotCommodity: (spotCommodity: number) => void;
  selectedSpotCommodities: number[];
  handleRuleWithDetailInput: (commodity: SpotCommoditiesFilters, value: string) => void;
}
export const SpotCommoditiesInput: React.FC<SpotCommoditiesProps> = ({ onSpotCommodity, selectedSpotCommodities, handleRuleWithDetailInput }) => {
    const { t }  = useTranslation()
    const { spotCommoditiesFilter } = useAppSelector(state => state.filters)
  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">Spot Commodities</label>
      <IonRow>
        {spotCommoditiesFilter.map((commodity) => (
          <IonCol size="12" sizeMd="6" key={commodity.id}>
            <SimpleCheckbox
              label={t(`filters.commodities.${commodity.commodity}`)}
              callback={() => onSpotCommodity(commodity.id)}
              isSelected={selectedSpotCommodities.includes(commodity.id)}
              small
              withInputValue={
                (commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI &&
                  selectedSpotCommodities.includes(commodity.id)) ||
                (commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS &&
                  selectedSpotCommodities.includes(commodity.id))
              }
              onChangeInputValue={(value) =>
                handleRuleWithDetailInput(commodity, value)
              }
            />
          </IonCol>
        ))}
      </IonRow>
    </div>
  );
};
