import { IonChip, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export const PlaceClosedStatus: React.FC = () => {
  const { t } = useTranslation()

  return (
    <article className="px-3 rounded-xl bg-red-100">
      <IonLabel className="text-sm font-medium text-red-500">{t('spots.session.closed')}</IonLabel>
    </article>
  );
};
