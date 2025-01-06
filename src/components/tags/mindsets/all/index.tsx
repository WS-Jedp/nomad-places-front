import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { colorWandOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { useMemo } from "react";

interface AllMindsetTagProps {
  onClick: Function;
}

export const AllMindsetTag: React.FC<AllMindsetTagProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { selectedSpotMindsetFilter, spotMindsetFilter } = useAppSelector(
    (state) => state.filters
  );
  const handleClick: React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault();
    onClick();
  };

  // Is only able when all filters are selected or none filter is selected
  const isDisabled = useMemo(() => {
    if (selectedSpotMindsetFilter.length === 0) return false;
    if (selectedSpotMindsetFilter.length === spotMindsetFilter.length)
      return false;

    return true;
  }, [selectedSpotMindsetFilter, spotMindsetFilter]);
  return (
    <IonChip
      outline
      className={`px-3 ${isDisabled ? "bg-gray-200" : "bg-amber-100"}`}
      onClick={handleClick}
    >
      <IonIcon
        icon={colorWandOutline}
        className={`mr-1 ${isDisabled ? "text-gray-400" : "text-amber-400"}`}
      />
      <IonLabel
        className={`text-xs font-medium ${
          isDisabled ? "text-gray-400" : "text-amber-500"
        }`}
      >
        {t("filters.labels.all")}
      </IonLabel>
    </IonChip>
  );
};
