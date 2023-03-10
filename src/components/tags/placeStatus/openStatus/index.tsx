import { IonChip, IonLabel } from "@ionic/react";

export const PlaceOpenStatus: React.FC = () => {
  return (
    <IonChip outline color="success" className="px-3 py-1 bg-emerald-100">
      <IonLabel className="text-md font-medium">Open</IonLabel>
    </IonChip>
  );
};
