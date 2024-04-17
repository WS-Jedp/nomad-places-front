import { useState } from "react";
import { TextInput } from "../../../../components/form/inputs/text";
import { TextAreaInput } from "../../../../components/form/inputs/textarea";
import TimePicker from "../../../../components/form/inputs/time";

export interface GeneralInformationInputsProps {
  spotName: string;
  onSpotNameChange: (value: string) => void;
  onSpotError?: boolean;
  spotDescription: string;
  onSpotDescriptionChange: (value: string) => void;
  onSpotDescriptionError?: boolean;
  onOpeningTimeChange: (value: string) => void;
  onClosingTimeChange: (value: string) => void;
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
  onClosingTimeChange
}) => {


  return (
    <section className="w-full mt-1 mb-5">
      <h2 className="font-bold text-lg">General Information</h2>
      <p className="text-sm mb-1">
        Please, provide us with the following information about the place you discovered.
      </p>
      <div className="w-full md:w-4/12">
        <TextInput
          label="Name of the spot"
          placeholder="Write the name of the spot"
          value={spotName}
          callback={onSpotNameChange}
          isError={onSpotError}
        />
      </div>

      <div className="w-full my-2">
        <TextAreaInput
          label="About the spot"
          placeholder="Write a little description about the spot"
          value={spotDescription}
          rows={4}
          callback={onSpotDescriptionChange}
          isError={onSpotDescriptionError}
        />
      </div>

      <div className="my-2 flex flex-row">
        <div className="w-6/12">
          <TimePicker 
            label="Opening time"
            onTimePick={onOpeningTimeChange}
          />
        </div>
        <div  className="w-6/12">
          <TimePicker 
            label="Closing time"
            onTimePick={onOpeningTimeChange}
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />
    </section>
  );
};
