import { IonChip, IonLabel } from "@ionic/react";
import { useState } from "react";
import { TextInput } from "../../../../components/form/inputs/text";
import { TextAreaInput } from "../../../../components/form/inputs/textarea";
import TimePicker from "../../../../components/form/inputs/time";
import { ReviewValueAmountOptions } from "../confirmSpotForm";

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
}) => {

  function handleOnNameOption(value: string) {
    onSpotNameChange(value)
  }

  return (
    <section className="w-full mt-1 mb-5">
      <h2 className="font-bold text-lg">General Information</h2>
      <p className="text-sm mb-1">
        Please, provide us with the following information about the place you
        discovered.
      </p>
      <div className="w-full md:w-4/12">
        <TextInput
          label="Name of the spot"
          placeholder="Write the name of the spot"
          value={spotName}
          callback={onSpotNameChange}
          isError={onSpotError}
        />
        {reviewsNameOptions.length > 0 && (
          <div className="flex flex-row py-2 w-fll overflow-x-auto">
            {reviewsNameOptions.map((option, index) => (
              <div key={index} className="bg-gray-200 rounded-md px-2 relative cursor-pointer hover:bg-gray-300 mr-1" onClick={() => handleOnNameOption(option.value)}>
                <IonLabel className="text-xs">{option.value}</IonLabel>
                {option.amount > 1 && (
                  <IonLabel className="text-xs absolute  bg-gray-400 flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                    {option.amount}
                  </IonLabel>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`w-full my-2 ${isConfirmation ? 'flex flex-row flex-nowrap' : 'block'}`}>
        <div className={`${isConfirmation ? 'w-6/12' : 'w-full'}`}>
          <TextAreaInput
            label="About the spot"
            placeholder="Write a little description about the spot"
            value={spotDescription}
            rows={4}
            callback={onSpotDescriptionChange}
            isError={onSpotDescriptionError}
          />
        </div>
        {
          isConfirmation && (
            <div className="relative w-6/12 flex flex-row flex-nowrap items-center overflow-x-auto px-3 pt-6">
              {
                reviewsDescriptionOptions.length > 0 && (
                  reviewsDescriptionOptions.map((option, index) => (
                    <div key={index} className="inline-flex border border-gray-200 rounded-md p-2 min-h-full min-w-[180px] w-5/6  relative cursor-pointer hover:bg-gray-300 mr-2" onClick={() => onSpotDescriptionChange(option.value)}>
                      <IonLabel className="text-xs">{option.value}</IonLabel>
                      {option.amount > 1 && (
                        <IonLabel className="text-xs absolute  bg-gray-400 flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                          {option.amount}
                        </IonLabel>
                      )}
                    </div>
                  ))
                )
              }
            </div>
          )
        }
      </div>

      <div className="my-2 flex flex-row">
        <div className="w-6/12">
          <TimePicker
            label="Opening time"
            onTimePick={onOpeningTimeChange}
            defaultTime={spotOpenAt}
          />
          {
            reviewsOpenAtOptions.length > 0 && (
              <div className="flex flex-row py-2 w-fll overflow-x-auto">
                {reviewsOpenAtOptions.map((option, index) => (
                  <div key={index} className="bg-gray-200 rounded-md px-2 relative cursor-pointer hover:bg-gray-300 mr-1" onClick={() => onOpeningTimeChange(option.value)}>
                    <IonLabel className="text-xs">{option.value}</IonLabel>
                    {option.amount > 1 && (
                      <IonLabel className="text-xs absolute  bg-gray-400 flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                        {option.amount}
                      </IonLabel>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        </div>
        <div className="w-6/12">
          <TimePicker
            label="Closing time"
            onTimePick={onClosingTimeChange}
            defaultDatTime="PM"
            defaultTime={spotCloseAt}
          />
          {
            reviewsCloseAtOptions.length > 0 && (
              <div className="flex flex-row py-2 w-fll overflow-x-auto">
                {reviewsCloseAtOptions.map((option, index) => (
                  <div key={index} className="bg-gray-200 rounded-md px-2 relative cursor-pointer hover:bg-gray-300 mr-1" onClick={() => onClosingTimeChange(option.value)}>
                    <IonLabel className="text-xs">{option.value}</IonLabel>
                    {option.amount > 1 && (
                      <IonLabel className="text-xs absolute  bg-gray-400 flex items-center justify-center text-center rounded-full w-[18px] h-[18px] top-[-6px] right-[-6px]">
                        {option.amount}
                      </IonLabel>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />
    </section>
  );
};
