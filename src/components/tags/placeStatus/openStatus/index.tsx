import { IonChip, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export const PlaceOpenStatus: React.FC = () => {
  const { t } = useTranslation()
  return (
    <IonChip outline color="success" className="px-3 py-1 bg-emerald-100">
      <IonLabel className="text-md font-medium">{ t('spots.session.open') }</IonLabel>
    </IonChip>
  );
};
