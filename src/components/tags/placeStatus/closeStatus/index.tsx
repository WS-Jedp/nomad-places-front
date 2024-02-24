import { IonChip, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export const PlaceClosedStatus: React.FC = () => {
  const { t } = useTranslation()

  return (
    <IonChip outline className="px-3 py-1 bg-red-100">
      <IonLabel className="text-md font-medium text-red-600">{t('spots.session.closed')}</IonLabel>
    </IonChip>
  );
};
