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
  LANGUAGE_ENUM,
  languageOptions,
  PLACE_APPROXIMATE_DAILY_CONST_ENUM,
  placeApproximateDailyCostOptions,
  THEME_TAG_ENUM,
  themeTagOptions,
} from "../../../../models/places";
import { SimpleDropdown } from "../../../../components/dropdowns/simple";
import { SmallDropdown } from "../../../../components/dropdowns/small";
import { useState } from "react";
import { MutipleOptionsPicker } from "../../../../components/form/inputs/pickerMultipleOptions";
import NumberPicker from "../../../../components/form/inputs/number";

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

  spotCapacity?: number;
  onSpotCapacity: (value: number) => void;

  isConfirmation?: boolean;

  reviewsNameOptions?: ReviewValueAmountOptions<string>[];
  reviewsDescriptionOptions?: ReviewValueAmountOptions<string>[];
  reviewsOpenAtOptions?: ReviewValueAmountOptions<string>[];
  reviewsCloseAtOptions?: ReviewValueAmountOptions<string>[];
  reviewsCapacityOptions?: ReviewValueAmountOptions<number>[];

  reviewsApproximateDailyCostOptions?: ReviewValueAmountOptions<PLACE_APPROXIMATE_DAILY_CONST_ENUM>[];
  reviewsThemesOptions?: ReviewValueAmountOptions<THEME_TAG_ENUM>[];
  reviewsAmbiancesOptions?: ReviewValueAmountOptions<AMBIENCE_TAG_ENUM>[];

  reviewsLanguagesOptions?: ReviewValueAmountOptions<LANGUAGE_ENUM>[];

  approximateDailyCostSelected?: PLACE_APPROXIMATE_DAILY_CONST_ENUM;
  onApproximateDailyCost: (
    value: PLACE_APPROXIMATE_DAILY_CONST_ENUM | null
  ) => void;
  placesThemesSelected?: THEME_TAG_ENUM[];
  onPlaceTheme: (value: THEME_TAG_ENUM) => void;
  placeAmbiancesSelected?: AMBIENCE_TAG_ENUM[];
  onPlaceAmbiance: (value: AMBIENCE_TAG_ENUM) => void;
  onPlaceLanguages: (value: LANGUAGE_ENUM) => void;
  selectedLanguages?: LANGUAGE_ENUM[];
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
  spotCapacity,
  onSpotCapacity,
  isConfirmation = false,
  reviewsNameOptions = [],
  reviewsDescriptionOptions = [],
  reviewsOpenAtOptions = [],
  reviewsCloseAtOptions = [],
  reviewsCapacityOptions = [],
  reviewsApproximateDailyCostOptions = [],
  approximateDailyCostSelected,
  onApproximateDailyCost,
  placesThemesSelected,
  onPlaceTheme,
  placeAmbiancesSelected,
  onPlaceAmbiance,
  reviewsAmbiancesOptions,
  reviewsThemesOptions,
  onPlaceLanguages,
  reviewsLanguagesOptions,
  selectedLanguages
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
                <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                  {option.amount}
                </IonLabel>
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
                  <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                    {option.amount}
                  </IonLabel>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="my-2 flex flex-row">
        <div className="w-4/12">
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
                  <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                    {option.amount}
                  </IonLabel>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-4/12">
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
                  <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                    {option.amount}
                  </IonLabel>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-4/12">
          <NumberPicker label={t("forms.inputs.spot.capacity.label")} onChange={onSpotCapacity} defaultValue={spotCapacity} />
          {reviewsCapacityOptions.length > 0 && (
          <div className="flex flex-row py-2 w-fll overflow-x-auto">
            {reviewsCapacityOptions.map((option, index) => (
              <div
                key={index}
                className="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-2 relative cursor-pointer hover:bg-indigo-200 mr-1"
                onClick={() => onSpotCapacity(option.value)}
              >
                <IonLabel className="text-xs">{option.value} {option.value > 1 ? t("filters.titles.people") : t("filters.titles.person") }</IonLabel>
                <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                  {option.amount}
                </IonLabel>
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
            label={t("filters.labels.approximateDailyCost")}
            onChangeInputValue={(val) =>
              onApproximateDailyCost(
                val ? (val as PLACE_APPROXIMATE_DAILY_CONST_ENUM) : null
              )
            }
            currentSelection={approximateDailyCostSelected}
            small
            options={placeApproximateDailyCostOptions}
          />
          {isConfirmation && reviewsApproximateDailyCostOptions.length > 0 && (
            <article className="flex flex-row flex-nowrap w-full h-auto overflow-y-visible overflow-x-auto pt-1 mb-1">
              {reviewsApproximateDailyCostOptions.map((rev) => (
                <div
                  onClick={() => onApproximateDailyCost(rev.value)}
                  key={rev.value}
                  className="inline-flex w-auto h-auto bg-indigo-50 text-indigo-700 font-semibold rounded-md py-1 px-2 relative cursor-pointer hover:bg-indigo-200 mr-1 overflow-visible"
                >
                  <IonLabel className="text-xs">
                    {t(`filters.options.${rev.value}`)}
                  </IonLabel>
                  <IonLabel className="text-xs absolute bg-indigo-400 text-white flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                    {rev.amount}
                  </IonLabel>
                </div>
              ))}
            </article>
          )}
        </IonCol>

        <div className="flex flex-col align-start justify-start text-start mt-3">
          <IonCol size="12">
            <MutipleOptionsPicker
              label={t(`filters.labels.languages`)}
              onSelect={(value) => {
                onPlaceLanguages(value as LANGUAGE_ENUM);
              }}
              small
              options={languageOptions.map((lang) => lang)}
              selected={selectedLanguages}
            />
          </IonCol>
        </div>

        <div className="flex flex-col align-start justify-start text-start my-3">
          <SmallDropdown
            title={t("filters.labels.themeTags")}
            isOpen={isThemeDropdownOpen}
            openCallback={() => setIsThemeDropdownOpen(true)}
            closeCallback={() => setIsThemeDropdownOpen(false)}
          >
            <div className="flex flex-row flex-wrap align-start justify-start overflow-visible">
              {themeTagOptions.map((theme, index) => (
                <IonChip
                  onClick={() => onPlaceTheme(theme)}
                  outline
                  key={index}
                  className={`relative overflow-visible cursor-pointer px-3 my-1 mr-1 ${
                    placesThemesSelected?.includes(theme)
                      ? "bg-indigo-100 text-indigo-500"
                      : "bg-gray-200 text-gray-500"
                  } `}
                >
                  <IonLabel className="text-xs font-medium capitalize">
                    {t(`filters.options.places.themes.${theme.toUpperCase()}`)}
                  </IonLabel>
                  {reviewsThemesOptions?.find((rev) => rev.value === theme)
                    ?.amount && (
                    <div
                      className={`text-xs text-white font-medium absolute w-[18px] h-[18px] rounded-full flex items-center justify-center top-[-3px] right-[-6px]
                        ${
                          placesThemesSelected?.includes(theme)
                            ? "bg-indigo-500"
                            : "bg-gray-400"
                        }
                        `}
                    >
                      {
                        reviewsThemesOptions?.find((rev) => rev.value === theme)
                          ?.amount
                      }
                    </div>
                  )}
                </IonChip>
              ))}
            </div>
          </SmallDropdown>
        </div>

        <div className="flex flex-col align-start justify-start text-start mt-3">
          <SmallDropdown
            title={t("filters.labels.ambianceTags")}
            isOpen={isAmbianceDropdownOpen}
            openCallback={() => setIsAmbianceDropdownOpen(true)}
            closeCallback={() => setIsAmbianceDropdownOpen(false)}
          >
            <div className="flex flex-row flex-wrap align-start justify-start overflow-visible">
              {ambienceTagsOptions.map((ambiance, index) => (
                <IonChip
                  key={index}
                  onClick={() => onPlaceAmbiance(ambiance)}
                  outline
                  className={`relative overflow-visible cursor-pointer px-3 my-1 mr-1 ${
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
                  {reviewsAmbiancesOptions?.find(
                    (rev) => rev.value === ambiance
                  )?.amount && (
                    <div
                      className={`text-xs text-white font-medium absolute w-[18px] h-[18px] rounded-full flex items-center justify-center top-[-3px] right-[-6px]
                        ${
                          placeAmbiancesSelected?.includes(ambiance)
                            ? "bg-indigo-500"
                            : "bg-gray-400"
                        }
                        `}
                    >
                      {
                        reviewsAmbiancesOptions?.find(
                          (rev) => rev.value === ambiance
                        )?.amount
                      }
                    </div>
                  )}
                </IonChip>
              ))}
            </div>
          </SmallDropdown>
        </div>
      </div>
    </section>
  );
};
