import { IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { handleSpotTypeIcon } from "../../../../common/utils/icons/icons";
import { SimplePlaceTypeCard } from "../../../../components/places/types/cards/simple";
import { PLACE_TYPES } from "../../../../models/placeTypes";
import { ReviewValueAmountOptions } from "../confirmSpotForm";

export interface SpotTypeInputProps {
    onSpotType: (spotType: PLACE_TYPES) => void
    selectedSpotType?: PLACE_TYPES
    reviewsSpotTypeOptions?: ReviewValueAmountOptions<PLACE_TYPES>[]
}

export const SpotTypeInput: React.FC<SpotTypeInputProps> = ({ onSpotType, selectedSpotType, reviewsSpotTypeOptions }) => {
    const { t } = useTranslation()
    const { spotTypesFilter } = useAppSelector(state => state.filters)
  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">
        { t("forms.inputs.spot.type.label") }
      </label>
      <IonRow
        className="relative
                    w-full overflow-x-auto overflow-y-hidden py-1
                    flex flex-nowrap items-center justify-start"
      >
        {spotTypesFilter.map((spotType, index) => (
          <div key={index} className="mr-3">
            <SimplePlaceTypeCard
              text={t(`filters.spotTypes.${spotType.name.toLowerCase()}`)}
              icon={handleSpotTypeIcon(spotType.name)}
              callback={() => onSpotType(spotType.name)}
              isSelected={selectedSpotType === spotType.name}
              withBadge
              badgeValue={reviewsSpotTypeOptions?.find(type => type.value === spotType.name)?.amount}
            />
          </div>
        ))}
      </IonRow>
    </div>
  );
};
