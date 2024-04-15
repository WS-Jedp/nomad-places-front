import { TextInput } from "../../../../components/form/inputs/text";
import { TextAreaInput } from "../../../../components/form/inputs/textarea";

export interface GeneralInformationInputsProps {
  spotName: string;
  onSpotNameChange: (value: string) => void;
  onSpotError?: boolean;
  spotDescription: string;
  onSpotDescriptionChange: (value: string) => void;
  onSpotDescriptionError?: boolean;
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
}) => {
  return (
    <section className="w-full">
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
    </section>
  );
};
