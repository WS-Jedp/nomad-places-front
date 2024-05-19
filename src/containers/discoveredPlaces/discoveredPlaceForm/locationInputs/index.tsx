import { IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../../../components/form/inputs/text";
import { ReviewValueAmountOptions } from "../confirmSpotForm";

export interface LocationInputsProps {
  spotZone: string;
  onSpotZoneChange: (value: string) => void;
  reviewsZoneOptions?: ReviewValueAmountOptions<string>[];
  spotCity: string;
  onSpotCityChange: (value: string) => void;
  reviewsCityOptions?: ReviewValueAmountOptions<string>[];
}

export const LocationInputs: React.FC<LocationInputsProps> = ({
  spotZone,
  onSpotZoneChange,
  spotCity,
  onSpotCityChange,
  reviewsCityOptions = [],
  reviewsZoneOptions = [],
}) => {
  const { t } = useTranslation();
  return (
    <section className="w-full mt-1 mb-5">
      <h2 className="font-bold text-lg">
        {t("discover.discovered.location.title")}
      </h2>
      <p className="text-sm mb-1">
        {t("discover.discovered.location.message")}
      </p>
      <div className="w-full my-2 flex flex-col md:flex-row">
        <div className="w-full md:w-6/12 md:mr-1">
          <TextInput
            label={t("forms.inputs.spot.zone.label")}
            placeholder={t("forms.inputs.spot.zone.placeholder")}
            value={spotZone}
            callback={onSpotZoneChange}
          />
          {reviewsZoneOptions.length > 0 && (
            <div className="flex flex-row py-2 w-fll overflow-x-auto">
              {reviewsZoneOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                  onClick={() => onSpotZoneChange(option.value)}
                >
                  <IonLabel className="text-xs">{option.value}</IonLabel>
                  {option.amount > 1 && (
                    <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                      {option.amount}
                    </IonLabel>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-6/12 md:ml-1">
          <TextInput
            label={t("forms.inputs.spot.city.label")}
            placeholder={t("forms.inputs.spot.city.placeholder")}
            value={spotCity}
            callback={onSpotCityChange}
          />

          {reviewsCityOptions.length > 0 && (
            <div className="flex flex-row py-2 w-fll overflow-x-auto">
              {reviewsCityOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                  onClick={() => onSpotCityChange(option.value)}
                >
                  <IonLabel className="text-xs">{option.value}</IonLabel>
                  {option.amount > 1 && (
                    <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                      {option.amount}
                    </IonLabel>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="my-5" />
    </section>
  );
};
