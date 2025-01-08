import { MdLaptop } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { RuleCard } from "../../card";
import { RuleCardState } from "../../cardState";
import { PRIVACY_POLICY_RULE_ENUM } from "../../../../models/places";

interface RuleCardProps {
  state: PRIVACY_POLICY_RULE_ENUM[] | null;
}

export const PrivacyPolicy: React.FC<RuleCardProps> = ({ state }) => {
  const { t } = useTranslation();

  function getPrivacyPolicyText() {
    if (!state || !state.length) return t(`filters.rules.privacyPolicy.null`);

    if (state.length === 1) return t(`filters.rules.privacyPolicy.${state[0]}`);

    const rules = Array(...state);
    const lastRule = rules.pop();
    return `${t("messages.utils.workOn")} ${rules
      .map((r, i) => t(`filters.options.${r}`).toLowerCase())
      .join(", ")} ${t("messages.utils.or")} ${t(
      `filters.options.${lastRule}`
    ).toLowerCase()}`;
  }
  return (
    <RuleCardState
      state={state ? (state.length ? true : false) : false}
      positiveState={<RuleCard Icon={MdLaptop} rule={getPrivacyPolicyText()} />}
      negativeState={
        <RuleCard
          Icon={MdLaptop}
          rule={t(`filters.rules.privacyPolicy.null`)}
        />
      }
    />
  );
};
