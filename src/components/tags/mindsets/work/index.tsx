import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { glassesOutline } from "ionicons/icons";

interface WorkMindsetTagProps {
  disabled?: boolean
}


export const WorkMindsetTag: React.FC<WorkMindsetTagProps> = ({ disabled }) => {
  return (
    <IonChip outline className={`px-3 py-1 ${disabled ? 'bg-gray-200' : 'bg-blue-100'}`}>
      <IonIcon icon={glassesOutline} className={`mr-2 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
      <IonLabel className={`text-md font-medium ${disabled ? 'text-gray-400' : 'text-blue-600'}`}>Work</IonLabel>
    </IonChip>
  );
};
