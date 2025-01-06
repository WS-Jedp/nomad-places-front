import { IonChip, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export const PlaceOpenStatus: React.FC = () => {
  const { t } = useTranslation()
  return (
    <article className="px-3 bg-emerald-100 rounded-xl">
      <IonLabel className="text-sm font-medium text-emerald-500">{ t('spots.session.open') }</IonLabel>
    </article>
  );
};
