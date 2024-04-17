import { IonCol, IonRow } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdAddAPhoto, MdClose } from "react-icons/md";
import { useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { handleSpotTypeIcon } from "../../../common/utils/icons/icons";
import { SimpleButton } from "../../../components/buttons/simple";
import { SimpleDropdown } from "../../../components/dropdowns/simple";
import { SimpleCheckbox } from "../../../components/form/inputs/checkbox";
import { TextInput } from "../../../components/form/inputs/text";
import { TextAreaInput } from "../../../components/form/inputs/textarea";
import { SimpleMindsetCard } from "../../../components/mindsets/cards/simpleCardMindset";
import { SimplePlaceTypeCard } from "../../../components/places/types/cards/simple";
import { DiscoverSpotDTO } from "../../../dto/places";
import {
  SpotCommoditiesFilters,
  SpotRulesFilters,
} from "../../../models/filters";
import { MINDSETS } from "../../../models/mindsets";
import { PLACE_COMMODITIES_ENUM } from "../../../models/places";
import { PLACE_TYPES } from "../../../models/placeTypes";
import { GeneralInformationInputs } from "./generalInformationInputs";
import { LocationInputs } from "./locationInputs";
import { SpotCommoditiesInput } from "./spotCommoditiesInput";
import { SpotKnownForInput } from "./spotKnownForInput";
import { SpotMultimediaInput } from "./spotMultimediaInput";
import { SpotRulesInput } from "./spotRulesInput";
import { SpotTypeInput } from "./spotTypeInput";

export const DiscoveredPlaceForm: React.FC<{
  onSave: () => void;
  onCancel: () => void;
}> = ({ onCancel, onSave }) => {
  const { t } = useTranslation();

  const [spotName, setSpotName] = useState<string>("");
  const [spotDescription, setSpotDescription] = useState<string>("");

  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");

  const [spotZone, setSpotZone] = useState<string>("");
  const [spotCity, setSpotCity] = useState<string>("");

  const [spotTypeID, setSpotTypeID] = useState<PLACE_TYPES>();
  const [spotKnownFor, setSpotKnownFor] = useState<MINDSETS>();

  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const handleRuleInput = (id: number) => {
    if (selectedRules.includes(id)) {
      setSelectedRules(selectedRules.filter((rule) => rule !== id));
    } else {
      setSelectedRules([...selectedRules, id]);
    }
  };

  const [selectedCommodities, setSelectedCommodities] = useState<number[]>([]);
  const handleCommodityInput = (id: number) => {
    if (selectedCommodities.includes(id)) {
      setSelectedCommodities(
        selectedCommodities.filter((commodity) => commodity !== id)
      );
    } else {
      setSelectedCommodities([...selectedCommodities, id]);
    }
  };
  //  Rules with detail
  const [wifiSpeed, setWifiSpeed] = useState<string>();
  const [plugsAmount, setPlugsAmonunt] = useState<string>();

  function handleRuleWithDetailInput(
    rule: SpotCommoditiesFilters,
    value: string
  ) {
    if (rule.name === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
      setWifiSpeed(value);
    }

    if (rule.name === PLACE_COMMODITIES_ENUM.PLUGS_AMOUNT) {
      setPlugsAmonunt(value);
    }
  }

  //   Multimedia content
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      if (files.length > 0) {
        setFiles([...files, ...selectedFiles]);
        updatePreviews(Array.from(files).concat(selectedFiles));
      } else {
        setFiles(selectedFiles);
        updatePreviews(selectedFiles);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    updatePreviews(newFiles);
  };

  const updatePreviews = (selectedFiles: File[]) => {
    const newPreviews = selectedFiles.map((file) => {
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      return { url: URL.createObjectURL(file), type: fileType };
    });
    setPreviews(newPreviews);
  };

  function handleGetSpotData(): DiscoverSpotDTO {
    return {
      name: spotName,
      description: spotDescription,
      type: [],
      knownFor: spotKnownFor,
      rules: {
        closedAt: closingTime,
        openAt: openingTime,
        petFriendly: selectedRules.includes(1),
        smoking: selectedRules.includes(2),
        underAge: selectedRules.includes(3),
      },
      location: {
        latitude: 0,
        longitude: 0,
        zone: spotZone,
        city: spotCity,
        country: "COLOMBIA",
      },
      commodities: {
        plugsAmount: 0,
        wifiSpeed: 0,
        coworkSpace: selectedCommodities.includes(1),
        parking: selectedCommodities.includes(2),
        publicPlugs: selectedCommodities.includes(3),
        publicWifi: selectedCommodities.includes(4),
        publicBathrooms: selectedCommodities.includes(5),
      },
      multimedia: [],
    };
  }

  return (
    <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto text-start">
      <h2 className="font-bold text-2xl mb-1 text-start">
        Tell us about the Spot
      </h2>
      <p className="text-sm font-light">
        Please, provide us with the following information about the place you
        discovered.
      </p>

      <form className="py-3 w-full">
        <GeneralInformationInputs
          spotName={spotName}
          onSpotNameChange={(val) => setSpotName(val)}
          spotDescription={spotDescription}
          onSpotDescriptionChange={(val) => setSpotDescription(val)}
          onOpeningTimeChange={(val) => setOpeningTime(val)}
          onClosingTimeChange={(val) => setClosingTime(val)}
        />

        <LocationInputs
          spotZone={spotZone}
          onSpotZoneChange={(val) => setSpotZone(val)}
          spotCity={spotCity}
          onSpotCityChange={(val) => setSpotCity(val)}
        />

        <SpotTypeInput
          onSpotType={(spotType) => setSpotTypeID(spotType)}
          selectedSpotType={spotTypeID}
        />

        <SpotKnownForInput
          onSpotKnownFor={(mindset) => setSpotKnownFor(mindset)}
          selectedSpotKnownFor={spotKnownFor}
        />

        <SpotRulesInput
          onSpotRule={(rule) => handleRuleInput(rule)}
          selectedSpotRules={selectedRules}
        />

        <SpotCommoditiesInput
          handleRuleWithDetailInput={handleRuleWithDetailInput}
          onSpotCommodity={(commodity) => handleCommodityInput(commodity)}
          selectedSpotCommodities={selectedCommodities}
        />

        <SpotMultimediaInput
          files={files}
          previews={previews}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
        />
      </form>
      <div className="my-5">
        <SimpleButton text="Save" action={() => {}} />
      </div>
    </section>
  );
};
