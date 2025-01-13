import { IonRow, IonCol } from "@ionic/react";
import { SimpleCheckbox } from "../../form/inputs/checkbox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import {
  selectSpotRuleFilter,
  removeSpotRuleFilter,
  handleValueRuleFilter,
} from "../../../store/redux/slices/filters";
import { useTranslation } from "react-i18next";
import {
  getRuleOptions,
  NOISE_POLICY_RULE_ENUM,
  PLACE_RULES_ENUM,
  PLACE_TIME_LIMIT_RULE,
  PRIVACY_POLICY_RULE_ENUM,
} from "../../../models/places";
import { OptionsPicker } from "../../form/inputs/picker";
import { MutipleOptionsPicker } from "../../form/inputs/pickerMultipleOptions";

export const PlaceRulesSelection: React.FC = () => {
  const { t } = useTranslation();

  const {
    spotRulesFilters,
    selectedSpotRulesFilter,
    selectedValuesSpotRulesFilter,
  } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  function isRuleSelected(id: number) {
    return selectedSpotRulesFilter.includes(id);
  }

  const selectionRules = [
    PLACE_RULES_ENUM.TIME_LIMIT,
    PLACE_RULES_ENUM.NOISE_POLICY,
    PLACE_RULES_ENUM.CONSUMPTION_POLICY,
  ];

  const multipleOptionsRules = [PLACE_RULES_ENUM.PRIVACY_POLICY];

  const booleanRules = [
    PLACE_RULES_ENUM.PET_FRIENDLY,
    PLACE_RULES_ENUM.SMOKING,
    PLACE_RULES_ENUM.UNDER_AGE,
  ];

  function getSelectedOptionsRule(rule: PLACE_RULES_ENUM) {
    switch (rule) {
      case PLACE_RULES_ENUM.PRIVACY_POLICY:
        return selectedValuesSpotRulesFilter.find(
          (r) => r.rule === PLACE_RULES_ENUM.PRIVACY_POLICY
        )?.value as PRIVACY_POLICY_RULE_ENUM[];
      case PLACE_RULES_ENUM.TIME_LIMIT:
        return selectedValuesSpotRulesFilter.find(
          (r) => r.rule === PLACE_RULES_ENUM.TIME_LIMIT
        )?.value as PLACE_TIME_LIMIT_RULE;
      case PLACE_RULES_ENUM.NOISE_POLICY:
        return selectedValuesSpotRulesFilter.find(
          (r) => r.rule === PLACE_RULES_ENUM.NOISE_POLICY
        )?.value as NOISE_POLICY_RULE_ENUM;
      case PLACE_RULES_ENUM.CONSUMPTION_POLICY:
        return selectedValuesSpotRulesFilter.find(
          (r) => r.rule === PLACE_RULES_ENUM.CONSUMPTION_POLICY
        );
    }
  }

  function handleCallback(ruleId: number, value?: string) {
    if (value) {
      const rule = spotRulesFilters.find((c) => c.id == ruleId)?.rule;
      if (!rule) return;
      dispatch(handleValueRuleFilter({ rule, value }));
    } else {
      if (!isRuleSelected(ruleId)) {
        dispatch(selectSpotRuleFilter({ spotRuleFilterID: ruleId }));
      } else {
        dispatch(removeSpotRuleFilter({ spotRuleFilterID: ruleId }));
      }
    }
  }

  return (
    <IonRow class="w-full">
      <IonCol
        size="12"
        className="flex flex-col items-start justify-start px-3 my-3"
      >
        <h2 className="font-bold text-md text-coffi-black">
          {t("filters.labels.checkWhatYouNeed")}
        </h2>
      </IonCol>

      {spotRulesFilters
        .filter((c) => booleanRules.includes(c.rule))
        .map((rule) => (
          <IonCol size="12" sizeMd="4" key={rule.id}>
            <SimpleCheckbox
              label={t(`filters.rules.${rule.rule}`)}
              callback={() => handleCallback(rule.id)}
              isSelected={isRuleSelected(rule.id)}
              small
            />
          </IonCol>
        ))}

      <IonCol
        size="12"
        className="flex flex-col items-start justify-start px-3 my-3"
      >
        <h2 className="font-bold text-md text-coffi-black">
          {t("filters.labels.selectWhatYouNeed")}
        </h2>
      </IonCol>
      <IonRow class="flex flex-row w-full">
        {spotRulesFilters
          .filter((c) => selectionRules.includes(c.rule))
          .map((rule) => (
            <IonCol size="12" sizeMd="6" key={rule.id} className="mb-2">
              <div className="px-3">
                <OptionsPicker
                  key={rule.id}
                  label={t(`filters.rules.${rule.rule}.label`)}
                  small
                  onChangeInputValue={(val) => {
                    handleCallback(rule.id, val);
                  }}
                  options={getRuleOptions(rule.rule)}
                  currentSelection={getSelectedOptionsRule(rule.rule) as string}
                />
              </div>
            </IonCol>
          ))}
      </IonRow>

      <IonCol
        size="12"
        className="flex flex-col items-start justify-start px-3 my-3"
      >
        <h2 className="font-bold text-md text-coffi-black">
          {t("filters.labels.selectAllWhatYouNeed")}
        </h2>
      </IonCol>
      {spotRulesFilters
        .filter((c) => multipleOptionsRules.includes(c.rule))
        .map((rule) => (
          <IonRow class="flex flex-col items-start justify-start w-full px-3">
            <MutipleOptionsPicker
              key={rule.id}
              label={t(`filters.rules.${rule.rule}.label`)}
              small
              onSelect={(val) => {
                handleCallback(rule.id, val);
              }}
              options={getRuleOptions(rule.rule)}
              selected={getSelectedOptionsRule(rule.rule) as string[]}
            />
          </IonRow>
        ))}
    </IonRow>
  );
};
