import { IonChip, IonCol, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../../../components/form/inputs/text";
import { TextAreaInput } from "../../../../components/form/inputs/textarea";
import TimePicker from "../../../../components/form/inputs/time";
import { ReviewValueAmountOptions } from "../confirmSpotForm";
import { OptionsPicker } from "../../../../components/form/inputs/picker";
import {
  AMBIENCE_TAG_ENUM,
  ambienceTagsOptions,
  PLACE_APPROXIMATE_DAILY_CONST_ENUM,
  placeApproximateDailyCostOptions,
  THEME_TAG_ENUM,
  themeTagOptions,
} from "../../../../models/places";
import { SimpleDropdown } from "../../../../components/dropdowns/simple";
import { SmallDropdown } from "../../../../components/dropdowns/small";
import { useState } from "react";

export interface GeneralInformationInputsProps {
  spotName: string;
  onSpotNameChange: (value: string) => void;
  onSpotError?: boolean;
  spotDescription: string;
  onSpotDescriptionChange: (value: string) => void;
  onSpotDescriptionError?: boolean;
  spotOpenAt?: string;
  onOpeningTimeChange: (value: string) => void;
  spotCloseAt?: string;
  onClosingTimeChange: (value: string) => void;

  isConfirmation?: boolean;

  reviewsNameOptions?: ReviewValueAmountOptions<string>[];
  reviewsDescriptionOptions?: ReviewValueAmountOptions<string>[];
  reviewsOpenAtOptions?: ReviewValueAmountOptions<string>[];
  reviewsCloseAtOptions?: ReviewValueAmountOptions<string>[];

  approximateDailyCostSelected?: PLACE_APPROXIMATE_DAILY_CONST_ENUM;
  onApproximateDailyCost: (value: PLACE_APPROXIMATE_DAILY_CONST_ENUM) => void;
  placesThemesSelected?: THEME_TAG_ENUM[];
  onPlaceTheme: (value: THEME_TAG_ENUM) => void;
  placeAmbiancesSelected?: AMBIENCE_TAG_ENUM[];
  onPlaceAmbiance: (value: AMBIENCE_TAG_ENUM) => void;
}

export const GeneralInformationInputs: React.FC<
  GeneralInformationInputsProps
> = ({
  spotName,
  onSpotError,
  onSpotNameChange,
  spotDescription,
  onSpotDescriptionChange,
  onSpotDescriptionError,
  onOpeningTimeChange,
  onClosingTimeChange,
  spotCloseAt,
  spotOpenAt,
  isConfirmation = false,
  reviewsNameOptions = [],
  reviewsDescriptionOptions = [],
  reviewsOpenAtOptions = [],
  reviewsCloseAtOptions = [],
  approximateDailyCostSelected,
  onApproximateDailyCost,
  placesThemesSelected,
  onPlaceTheme,
  placeAmbiancesSelected,
  onPlaceAmbiance,
}) => {
  const { t } = useTranslation();
  function handleOnNameOption(value: string) {
    onSpotNameChange(value);
  }

  const [isAmbianceDropdownOpen, setIsAmbianceDropdownOpen] =
    useState<boolean>(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] =
    useState<boolean>(false);

  return (
    <section className="w-full mt-1 mb-5">
      <h2 className="font-bold text-lg">
        {t("discover.discovered.generalInformation.title")}
      </h2>
      <p className="text-sm mb-1">
        {t("discover.discovered.generalInformation.message")}
      </p>
      <div className="w-full md:w-4/12">
        <TextInput
          label={t("forms.inputs.spot.name.label")}
          placeholder={t("forms.inputs.spot.name.placeholder")}
          value={spotName}
          callback={onSpotNameChange}
          isError={onSpotError}
        />
        {reviewsNameOptions.length > 0 && (
          <div className="flex flex-row py-2 w-fll overflow-x-auto">
            {reviewsNameOptions.map((option, index) => (
              <div
                key={index}
                className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                onClick={() => handleOnNameOption(option.value)}
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

      <div
        className={`w-full my-2 ${
          isConfirmation ? "flex flex-row flex-nowrap" : "block"
        }`}
      >
        <div className={`${isConfirmation ? "w-6/12" : "w-full"}`}>
          <TextAreaInput
            label={t("forms.inputs.spot.description.label")}
            placeholder={t("forms.inputs.spot.description.placeholder")}
            value={spotDescription}
            rows={4}
            callback={onSpotDescriptionChange}
            isError={onSpotDescriptionError}
          />
        </div>
        {isConfirmation && (
          <div className="relative w-6/12 flex flex-row flex-nowrap items-center overflow-x-auto px-3 pt-6">
            {reviewsDescriptionOptions.length > 0 &&
              reviewsDescriptionOptions.map((option, index) => (
                <div
                  key={index}
                  className="inline-flex border border-gray-200 rounded-md p-2 min-h-full min-w-[180px] w-5/6  relative cursor-pointer hover:bg-gray-300 mr-2"
                  onClick={() => onSpotDescriptionChange(option.value)}
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

      <div className="my-2 flex flex-row">
        <div className="w-6/12">
          <TimePicker
            label={t("forms.inputs.spot.openingTime.label")}
            onTimePick={onOpeningTimeChange}
            defaultTime={spotOpenAt}
          />
          {reviewsOpenAtOptions.length > 0 && (
            <div className="flex flex-row py-2 w-fll overflow-x-auto">
              {reviewsOpenAtOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                  onClick={() => onOpeningTimeChange(option.value)}
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
        <div className="w-6/12">
          <TimePicker
            label={t("forms.inputs.spot.closingTime.label")}
            onTimePick={onClosingTimeChange}
            defaultDatTime="PM"
            defaultTime={spotCloseAt}
          />
          {reviewsCloseAtOptions.length > 0 && (
            <div className="flex flex-row py-2 w-fll overflow-x-auto">
              {reviewsCloseAtOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                  onClick={() => onClosingTimeChange(option.value)}
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

      <div className="w-full">
        <IonCol size="6" sizeMd="6">
          <OptionsPicker
            id="approximateDailyCost"
            label="Costo Aproximado Diario"
            onChangeInputValue={(val) =>
              onApproximateDailyCost(val as PLACE_APPROXIMATE_DAILY_CONST_ENUM)
            }
            currentSelection={approximateDailyCostSelected}
            small
            options={placeApproximateDailyCostOptions}
          />
        </IonCol>

        <div className="flex flex-col align-start justify-start text-start">
          <SmallDropdown
            title="Selecciona las tematicas representan mejor el lugar:"
            isOpen={isThemeDropdownOpen}
            openCallback={() => setIsThemeDropdownOpen(true)}
            closeCallback={() => setIsThemeDropdownOpen(false)}
          >
            <div className="flex flex-row flex-wrap align-start justify-start">
              {themeTagOptions.map((theme, index) => (
                <IonChip
                  onClick={() => onPlaceTheme(theme)}
                  outline
                  key={index}
                  className={`cursor-pointer px-3 my-1 mr-1 ${
                    placesThemesSelected?.includes(theme)
                      ? "bg-indigo-100 text-indigo-500"
                      : "bg-gray-200 text-gray-500"
                  } `}
                >
                  <IonLabel className="text-xs font-medium capitalize">
                    {t(`filters.options.places.themes.${theme.toUpperCase()}`)}
                  </IonLabel>
                </IonChip>
              ))}
            </div>
          </SmallDropdown>
        </div>

        <div className="flex flex-col align-start justify-start text-start mt-3">
          <SmallDropdown
            title="Selecciona que ambiente transmite mejor el lugar:"
            isOpen={isAmbianceDropdownOpen}
            openCallback={() => setIsAmbianceDropdownOpen(true)}
            closeCallback={() => setIsAmbianceDropdownOpen(false)}
          >
            <div className="flex flex-row flex-wrap align-start justify-start">
              {ambienceTagsOptions.map((ambiance, index) => (
                <IonChip
                  key={index}
                  onClick={() => onPlaceAmbiance(ambiance)}
                  outline
                  className={`cursor-pointer px-3 my-1 mr-1 ${
                    placeAmbiancesSelected?.includes(ambiance)
                      ? "bg-indigo-100 text-indigo-500"
                      : "bg-gray-200 text-gray-500"
                  } `}
                >
                  <IonLabel className="text-xs font-medium capitalize">
                    {t(
                      `filters.options.places.ambiances.${ambiance.toUpperCase()}`
                    )}
                  </IonLabel>
                </IonChip>
              ))}
            </div>
          </SmallDropdown>
        </div>
      </div>
    </section>
  );
};
