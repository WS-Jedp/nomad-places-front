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
    <IonChip outline  className={`px-3 py-1 ${disabled ? 'bg-gray-200' : 'bg-indigo-100'}`} onClick={handleClick}>
      <IonIcon icon={book} className={`mr-2 ${disabled ? 'text-gray-400' : 'text-indigo-500'}`} />
      <IonLabel className={`text-md font-medium ${disabled ? 'text-gray-400' : 'text-indigo-500'}`}>{ t('filters.mindsets.study') }</IonLabel>
    </IonChip>
  );
};
