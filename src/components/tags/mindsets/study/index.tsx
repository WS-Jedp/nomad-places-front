import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { book } from "ionicons/icons";

interface StudyMindsetTagProps {
  disabled?: boolean
}

export const StudyMindsetTag: React.FC<StudyMindsetTagProps> = ({ disabled }) => {
  return (
    <IonChip outline  className={`px-3 py-1 ${disabled ? 'bg-gray-200' : 'bg-indigo-100'}`}>
      <IonIcon icon={book} className={`mr-2 ${disabled ? 'text-gray-400' : 'text-indigo-500'}`} />
      <IonLabel className={`text-md font-medium ${disabled ? 'text-gray-400' : 'text-indigo-500'}`}>Study</IonLabel>
    </IonChip>
  );
};
