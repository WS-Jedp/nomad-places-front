import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { colorWandOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface AllMindsetTagProps {
  disabled?: boolean,
  onClick: Function
}

export const AllMindsetTag: React.FC<AllMindsetTagProps> = ({ disabled, onClick }) => {
  const { t } = useTranslation()
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline  className={`px-3 py-1 ${disabled ? 'bg-gray-200' : 'bg-amber-100'}`} onClick={handleClick}>
      <IonIcon icon={colorWandOutline} className={`mr-2 ${disabled ? 'text-gray-400' : 'text-amber-400'}`} />
      <IonLabel className={`text-md font-medium ${disabled ? 'text-gray-400' : 'text-amber-500'}`}>{ t('filters.labels.all') }</IonLabel>
    </IonChip>
  );
};
