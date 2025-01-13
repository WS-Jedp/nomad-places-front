import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { glassesOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface WorkMindsetTagProps {
  disabled?: boolean
  onClick: Function
}


export const WorkMindsetTag: React.FC<WorkMindsetTagProps> = ({ disabled, onClick }) => {
  const { t } = useTranslation()
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline className={`px-3 ${disabled ? 'bg-gray-200' : 'bg-coffi-blue-100'}`} onClick={handleClick}>
      <IonIcon icon={glassesOutline} className={`mr-1 ${disabled ? 'text-gray-400' : 'text-coffi-blue'}`} />
      <IonLabel className={`text-xs font-medium ${disabled ? 'text-gray-400' : 'text-coffi-blue'}`}>{ t('filters.mindsets.work') }</IonLabel>
    </IonChip>
  );
};
