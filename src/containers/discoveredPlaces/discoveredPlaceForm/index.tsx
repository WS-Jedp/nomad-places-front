import { IonCol, IonRow } from "@ionic/react";
import { PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdAddAPhoto, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { handleSpotTypeIcon } from "../../../common/utils/icons/icons";
import { SimpleButton } from "../../../components/buttons/simple";
import { SimpleDropdown } from "../../../components/dropdowns/simple";
import { SimpleCheckbox } from "../../../components/form/inputs/checkbox";
import { TextInput } from "../../../components/form/inputs/text";
import { TextAreaInput } from "../../../components/form/inputs/textarea";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { SimpleMindsetCard } from "../../../components/mindsets/cards/simpleCardMindset";
import { SimplePlaceTypeCard } from "../../../components/places/types/cards/simple";
import { DiscoveredSpotByUserResponseDTO, DiscoverSpotDTO } from "../../../dto/places";
import {
  SpotCommoditiesFilters,
  SpotRulesFilters,
} from "../../../models/filters";
import { MINDSETS } from "../../../models/mindsets";
import { PLACE_RULES } from "../../../models/placeRules";
import { PLACE_COMMODITIES_ENUM, PLACE_RULES_ENUM } from "../../../models/places";
import { PLACE_TYPES } from "../../../models/placeTypes";
import { addDiscoverSpotIntoNearPlaces, newSpotDiscover } from "../../../store/redux/slices/places";
import { getUserGeoLocation, setPointsToUser } from "../../../store/redux/slices/user";
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
  const { spotRulesFilters, spotCommoditiesFilter } = useAppSelector(state => state.filters)
  const { location: userLocation, auth, userData  } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  function handleCommodityWithDetailInput(
    commodity: SpotCommoditiesFilters,
    value: string
  ) {

    if (commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
      setWifiSpeed(value);
    }

    if (commodity.commodity === PLACE_COMMODITIES_ENUM.PLUGS_AMOUNT) {
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
    if(!userLocation || !userLocation.latitude || !userLocation.longitude) {
      throw new Error("User location not found")
    }

    if(!auth || !userData || !userData.id) {
      throw new Error("User data not found")
    }

    if(!spotName || !spotDescription || !spotTypeID || !spotKnownFor || !spotZone || !spotCity) {
      throw new Error("Missing required fields")
    }

    const currentRules = {
      petFriendly: selectedRules.includes(spotRulesFilters.find(rule => rule.rule === PLACE_RULES_ENUM.PET_FRIENDLY)?.id || 0),
      smoking: selectedRules.includes(spotRulesFilters.find(rule => rule.rule === PLACE_RULES_ENUM.SMOKING)?.id || 0),
      underAge: selectedRules.includes(spotRulesFilters.find(rule => rule.rule === PLACE_RULES_ENUM.UNDER_AGE)?.id || 0),
    }

    const advancedCommodities = {
      plugs: {
        public: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS)?.id || 0),
        amount: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS)?.id || 0) ? typeof Number(plugsAmount) === 'number' ? Number(plugsAmount) : null : null,
      },
      wifi: {
        public: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI)?.id || 0),
        speed: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI)?.id || 0) ? typeof Number(wifiSpeed) === 'number' ? Number(wifiSpeed) : null : null,
      },
    }

    return {
      name: spotName,
      description: spotDescription,
      type: [ spotTypeID ],
      knownFor: spotKnownFor,
      rules: {
        closedAt: closingTime,
        openAt: openingTime,
        ...currentRules,
      },
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zone: spotZone,
        city: spotCity,
        country: "COLOMBIA",
      },
      commodities: {
        publicPlugs: advancedCommodities.plugs.public,
        plugsAmount: advancedCommodities.plugs.amount ? advancedCommodities.plugs.amount : null,
        publicWifi: advancedCommodities.wifi.public,
        wifiSpeed: advancedCommodities.wifi.speed ? advancedCommodities.wifi.speed : null,
        parking: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PARKING)?.id || 0),
        coworkSpace: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.COWORK_SPACE)?.id || 0),
        publicBathrooms: selectedCommodities.includes(spotCommoditiesFilter.find(commodity => commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS)?.id || 0),
      },
      multimedia: files.map((file) => file.slice(0, file.size, file.type)),
      discoveredByID: userData.id,
    };
  }

  async function handleUserGeoLocation() {
    await dispatch(getUserGeoLocation());
  }
  
  useEffect(() => {
    if(!userLocation || !userLocation.latitude || !userLocation.longitude) {
      handleUserGeoLocation()
      return
    }
  }, [userLocation])

  async function handleSaveSpot() {
    try {
      setIsSaving(true)
      const spot = handleGetSpotData()
      const resp = await dispatch( newSpotDiscover({ spot, files: spot.multimedia || [] }) ) as PayloadAction<DiscoveredSpotByUserResponseDTO>
      if(resp.payload) {
        const { userGamification } = resp.payload
        if(userGamification.earnedPoints) {
          toast.success(t("gamification.discovery.earned.share", { points: userGamification.earnedPoints }))
          dispatch( setPointsToUser({ points: userGamification.points }) )
        }
        dispatch( addDiscoverSpotIntoNearPlaces( resp.payload.discoveredPlace ) )
        onSave()
      }
    } catch (error) {
      console.error(error)
      toast.error(String(error))
    } finally {
      setIsSaving(false)
    }
  } 

  return (
    <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto text-start">
      <h2 className="font-bold text-2xl mb-1 text-start">
        { t("discover.titles.aboutTheSpot") }
      </h2>
      <p className="text-sm font-light">
        { t("discover.texts.provideSpotInformation") }
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
          handleCommodityWithDetailInput={handleCommodityWithDetailInput}
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
        {
          isSaving ? <LoaderSpinner /> : <SimpleButton text={t("actions.discover.shareDiscovery")} action={handleSaveSpot} />
        }
      </div>
    </section>
  );
};
