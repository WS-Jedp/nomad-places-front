import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

export const UnknownMindsetTag: React.FC = () => {
  const { t } = useTranslation()
  return (
    <IonChip outline className="px-3 py-1 bg-gray-200">
      <IonIcon icon={helpCircleOutline} className="mr-2 text-gray-600" />
      <IonLabel className="text-md font-medium text-gray-600">{t('filters.labels.unknown')}</IonLabel>
    </IonChip>
  );
};
