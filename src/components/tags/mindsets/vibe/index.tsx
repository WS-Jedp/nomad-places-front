import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { starOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface VibeMindsetTagProps {
  disabled?: boolean
  onClick: Function
}


export const VibeMindsetTag: React.FC<VibeMindsetTagProps> = ({ disabled, onClick }) => {
  const { t } = useTranslation()
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline className={`px-3 ${disabled ? 'bg-gray-200' : 'bg-amber-100'}`} onClick={handleClick}>
      <IonIcon icon={starOutline} className={`mr-1 ${disabled ? 'text-gray-400' : 'text-amber-500'}`} />
      <IonLabel className={`text-xs font-medium ${disabled ? 'text-gray-400' : 'text-amber-500'}`}>{ t('filters.mindsets.vibe') }</IonLabel>
    </IonChip>
  );
};
