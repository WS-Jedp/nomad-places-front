import { IonRow, IonText } from "@ionic/react";
import { IconType } from "react-icons";

export interface RuleCard {
  Icon: IconType;
  rule: string;
  description?: string;
}

export const RuleCard: React.FC<RuleCard> = ({ Icon, rule }) => {
  return (
    <IonRow className="relative w-full h-auto flex flex-row flex-nowrap align-center">
      <Icon size="24px" className="mr-2" />
      <IonText>
        <strong className="font-normal text-md">{rule}</strong>
      </IonText>
    </IonRow>
  );
};
