import { TextInput } from "../../../../components/form/inputs/text";

export interface LocationInputsProps {
    spotZone: string;
    onSpotZoneChange: (value: string) => void;
    spotCity: string;
    onSpotCityChange: (value: string) => void;
}

export const LocationInputs: React.FC<LocationInputsProps> = ({ spotZone,  onSpotZoneChange,  spotCity, onSpotCityChange }) => {
  return (
    <section className="w-full mt-1 mb-5">
      <h2 className="font-bold text-lg">Location</h2>
      <p className="text-sm mb-1">
        Please, provide us with the following information about the location of the spot. Have in mind, that you're current location will be used as the spot's location, so make sure be at the spot's location before submitting. 
      </p>
      <div className="w-full my-2 flex flex-col md:flex-row">
        <div className="w-full md:w-6/12 md:mr-1">
          <TextInput
            label="Zone"
            placeholder="Write the zone of the spot"
            value={spotZone}
            callback={onSpotZoneChange}
          />
        </div>
        <div className="w-full md:w-6/12 md:ml-1">
          <TextInput
            label="City"
            placeholder="Write the city of the spot"
            value={spotCity}
            callback={onSpotCityChange}
          />
        </div>
      </div>

      <hr className="my-5" />
    </section>
  );
};
