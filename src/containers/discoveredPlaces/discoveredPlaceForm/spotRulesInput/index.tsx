import { IonCol, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { SimpleCheckbox } from "../../../../components/form/inputs/checkbox";
import {
  consumptionRuleOptions,
  getRuleOptions,
  noisePolicyRuleOptions,
  PLACE_RULES_ENUM,
  PLACE_TIME_LIMIT_RULE,
  placeTimeLimitOptions,
  privacyPolicyRuleOptions,
} from "../../../../models/places";
import { OptionsPicker } from "../../../../components/form/inputs/picker";
import { MutipleOptionsPicker } from "../../../../components/form/inputs/pickerMultipleOptions";

export interface SpotRulesProps {
  onSpotRule: (spotRule: number, value?: string | string[]) => void;
  selectedSpotRules: number[];
  selectedRuleOptions: {
    [key:string]: string | string[] | undefined
  }
}

export const SpotRulesInput: React.FC<SpotRulesProps> = ({
  onSpotRule,
  selectedSpotRules,
  selectedRuleOptions
}) => {
  const { t } = useTranslation();
  const { spotRulesFilters } = useAppSelector((state) => state.filters);
  const advancedRules = [
    PLACE_RULES_ENUM.TIME_LIMIT,
    PLACE_RULES_ENUM.NOISE_POLICY,
    PLACE_RULES_ENUM.CONSUMPTION_POLICY,
  ];

  const multipleOptionsRules = [PLACE_RULES_ENUM.PRIVACY_POLICY];

  function getSelectedOptionsRule(rule: PLACE_RULES_ENUM) {
    switch(rule) {
      case PLACE_RULES_ENUM.PRIVACY_POLICY:
        return selectedRuleOptions[PLACE_RULES_ENUM.PRIVACY_POLICY] as PLACE_RULES_ENUM.PRIVACY_POLICY[] || []
      case PLACE_RULES_ENUM.TIME_LIMIT:
        return selectedRuleOptions[PLACE_RULES_ENUM.TIME_LIMIT] as PLACE_RULES_ENUM.TIME_LIMIT
      case PLACE_RULES_ENUM.NOISE_POLICY:
        return selectedRuleOptions[PLACE_RULES_ENUM.NOISE_POLICY] as PLACE_RULES_ENUM.NOISE_POLICY
      case PLACE_RULES_ENUM.CONSUMPTION_POLICY:
        return selectedRuleOptions[PLACE_RULES_ENUM.CONSUMPTION_POLICY] as PLACE_RULES_ENUM.CONSUMPTION_POLICY
    }
  }

  return (
    <div>
      <label className="text-sm font-semibold my-1">
        {t("forms.inputs.spot.rules.label")}
      </label>
      <IonRow>
        {spotRulesFilters.map((rule) => {
          if (
            advancedRules.includes(rule.rule) ||
            multipleOptionsRules.includes(rule.rule)
          )
            return;
          return (
            <IonCol size="12" sizeMd="6" key={rule.id}>
              <SimpleCheckbox
                label={t(`filters.rules.${rule.rule}`)}
                callback={() => onSpotRule(rule.id)}
                isSelected={selectedSpotRules.includes(rule.id)}
                small
                withInputOptions={advancedRules.includes(rule.rule)}
                options={getRuleOptions(rule.rule)}
              />
            </IonCol>
          );
        })}
      </IonRow>
      <h2 className="text-sm font-semibold my-2 mx-3">
        Selecciona la opcion que aplique
      </h2>

      <IonRow>
        {advancedRules.map((r) => {
          const rule = spotRulesFilters.find((rule) => rule.rule === r);
          if (!rule) return;
          return (
            <IonCol size="12" sizeMd="6" key={rule.id} className="px-3">
              <OptionsPicker
                label={t(`filters.rules.${rule.rule}.label`)}
                small
                options={getRuleOptions(rule.rule)}
                onChangeInputValue={(value) => {
                  onSpotRule(rule.id, value);
                }}
                currentSelection={getSelectedOptionsRule(rule.rule) as string}
              />
            </IonCol>
          );
        })}
      </IonRow>

      <h2 className="text-sm font-semibold my-2 mx-3">
        Selecciona las opciones que apliquen
      </h2>

      <section className="relative w-full px-3">
        {multipleOptionsRules.map((r) => {
          const rule = spotRulesFilters.find((rule) => rule.rule === r);
          if (!rule) return;
          return (
          <MutipleOptionsPicker
            label={t(`filters.rules.${r}.label`)}
            onSelect={(value) => {
              onSpotRule(rule.id, value)
            }}
            small
            options={getRuleOptions(r)}
            id={r}
            selected={getSelectedOptionsRule(r) as string[] | undefined}
          />
        )})}
      </section>

       {/* Divider */}
       <hr className="my-5" />
    </div>
  );
};
