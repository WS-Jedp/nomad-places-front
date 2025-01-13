import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { book } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface StudyMindsetTagProps {
  disabled?: boolean,
  onClick: Function
}

export const StudyMindsetTag: React.FC<StudyMindsetTagProps> = ({ disabled, onClick }) => {
  const { t } = useTranslation()
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline  className={`px-3 ${disabled ? 'bg-gray-200' : 'bg-coffi-purple-50'}`} onClick={handleClick}>
      <IonIcon icon={book} className={`mr-1 ${disabled ? 'text-gray-400' : 'text-coffi-purple-400'}`} />
      <IonLabel className={`text-xs font-medium ${disabled ? 'text-gray-400' : 'text-coffi-purple-400'}`}>{ t('filters.mindsets.study') }</IonLabel>
    </IonChip>
  );
};
