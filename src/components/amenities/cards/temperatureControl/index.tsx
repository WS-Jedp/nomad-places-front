import { MdOutlineThermostat } from "react-icons/md";
import { AmenitiesCard } from "../../card";
import { useTranslation } from "react-i18next";
import {
  TEMPERATURE_CONTROL_COMMODITY_ENUM,
} from "../../../../models/places";

interface TemperatureControlAmmenetiesCardProps {
  state?: boolean;
  value?: TEMPERATURE_CONTROL_COMMODITY_ENUM[] | null;
}

export const TemperatureControlAmenitiesCard: React.FC<TemperatureControlAmmenetiesCardProps> = ({
  state,
  value = null,
}) => {
  const { t } = useTranslation();

  function getTemperatureControlText() {
    if (!state || !value || !value.length)
      return t(`filters.commodities.temperatureControl.null`);


    if (value.length === 1) return t(`filters.commodities.temperatureControl.${value[0]}`);

    const options = Array(...value);
    const lastOption = options.pop();
    return `${t("messages.utils.find")} ${options
      .map((r, i) => t(`filters.options.${r}`).toLowerCase())
      .join(", ")}  ${t("messages.utils.and")} ${t(
      `filters.options.${lastOption}`
    ).toLowerCase()}`;
  }
  return (
    <AmenitiesCard
      Icon={MdOutlineThermostat}
      amenities={getTemperatureControlText()}
      state={state || false}
    />
  );
};
