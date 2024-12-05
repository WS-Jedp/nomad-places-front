import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { colorWandOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { useMemo } from "react";

interface AllPlaceTypesTagProps {
  onClick: Function;
}

export const AllPlaceTypesTag: React.FC<AllPlaceTypesTagProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { selectedSpotTypesFilter, spotTypesFilter } = useAppSelector(
    (state) => state.filters
  );
  const handleClick: React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault();
    onClick();
  };

  // Is only able when all filters are selected or none filter is selected
  const isDisabled = useMemo(() => {
    if (selectedSpotTypesFilter.length === 0) return false;
    if (selectedSpotTypesFilter.length === spotTypesFilter.length)
      return false;

    return true;
  }, [selectedSpotTypesFilter, spotTypesFilter]);
  return (
    <IonChip
      outline
      className={`px-3 py-1 ${isDisabled ? "bg-gray-200" : "bg-blue-200"}`}
      onClick={handleClick}
    >
      <IonIcon
        icon={colorWandOutline}
        className={`mr-2 ${isDisabled ? "text-gray-400" : "text-blue-600"}`}
      />
      <IonLabel
        className={`text-md font-medium ${
          isDisabled ? "text-gray-400" : "text-blue-600"
        }`}
      >
        {t("filters.labels.all")}
      </IonLabel>
    </IonChip>
  );
};
