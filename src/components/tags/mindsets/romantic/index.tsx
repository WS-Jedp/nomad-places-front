import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { heartOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface RomanticMindsetTagProps {
  disabled?: boolean
  onClick: Function
}


export const RomanticMindsetTag: React.FC<RomanticMindsetTagProps> = ({ disabled, onClick }) => {
  const { t } = useTranslation()
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline className={`px-3 ${disabled ? 'bg-gray-200' : 'bg-pink-100'}`} onClick={handleClick}>
      <IonIcon icon={heartOutline} className={`mr-1 ${disabled ? 'text-gray-400' : 'text-pink-600'}`} />
      <IonLabel className={`text-xs font-medium ${disabled ? 'text-gray-400' : 'text-pink-600'}`}>{ t('filters.mindsets.romantic') }</IonLabel>
    </IonChip>
  );
};
