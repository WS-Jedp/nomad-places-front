import { IonChip, IonLabel } from "@ionic/react";

export const PlaceClosedStatus: React.FC = () => {
  return (
    <IonChip outline className="px-3 py-1 bg-red-100">
      <IonLabel className="text-md font-medium text-red-600">Closed</IonLabel>
    </IonChip>
  );
};
