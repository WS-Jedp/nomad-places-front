import { IonCol, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { SimpleCheckbox } from "../../../../components/form/inputs/checkbox";

export interface SpotRulesProps {
    onSpotRule: (spotRule: number) => void;
    selectedSpotRules: number[];
}

export const SpotRulesInput: React.FC<SpotRulesProps> = ({
  onSpotRule,
  selectedSpotRules,
}) => {
  const { t } = useTranslation();
  const { spotRulesFilters } = useAppSelector((state) => state.filters);
  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">Spot Rules</label>
      <IonRow>
        {spotRulesFilters.map((rule) => (
          <IonCol size="12" sizeMd="6" key={rule.id}>
            <SimpleCheckbox
              label={t(`filters.rules.${rule.rule}`)}
              callback={() => onSpotRule(rule.id)}
              isSelected={selectedSpotRules.includes(rule.id)}
              small
            />
          </IonCol>
        ))}
      </IonRow>
    </div>
  );
};
