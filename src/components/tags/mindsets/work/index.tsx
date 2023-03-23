import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { glassesOutline } from "ionicons/icons";

interface WorkMindsetTagProps {
  disabled?: boolean
  onClick: Function
}


export const WorkMindsetTag: React.FC<WorkMindsetTagProps> = ({ disabled, onClick }) => {
  const handleClick:React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault()
    onClick()
  }
  return (
    <IonChip outline className={`px-3 py-1 ${disabled ? 'bg-gray-200' : 'bg-blue-100'}`} onClick={handleClick}>
      <IonIcon icon={glassesOutline} className={`mr-2 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
      <IonLabel className={`text-md font-medium ${disabled ? 'text-gray-400' : 'text-blue-600'}`}>Work</IonLabel>
    </IonChip>
  );
};
