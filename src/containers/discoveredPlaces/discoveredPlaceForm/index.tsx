import { PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { SimpleButton } from "../../../components/buttons/simple";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import {
  DiscoveredSpotByUserResponseDTO,
  DiscoverSpotDTO,
} from "../../../dto/places";
import { MINDSETS } from "../../../models/mindsets";
import {
  AMBIENCE_TAG_ENUM,
  COMFORT_LEVEL_COMMODITY_ENUM,
  COMMODITY_QUALITY,
  CONSUMPTION_POLICY_RULE_ENUM,
  FOOD_COMMODITY_ENUM,
  MOBILE_SIGNAL_COMMODITY_ENUM,
  NOISE_POLICY_RULE_ENUM,
  PARKING_COMMODITY_ENUM,
  PLACE_APPROXIMATE_DAILY_CONST_ENUM,
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
  PLACE_TIME_LIMIT_RULE,
  PRIVACY_POLICY_RULE_ENUM,
  TEMPERATURE_CONTROL_COMMODITY_ENUM,
  THEME_TAG_ENUM,
  WIFI_SPEED_COMMODITY_ENUM,
} from "../../../models/places";
import { PLACE_TYPES } from "../../../models/placeTypes";
import {
  addDiscoverSpotIntoNearPlaces,
  newSpotDiscover,
} from "../../../store/redux/slices/places";
import {
  getUserGeoLocation,
  setPointsToUser,
} from "../../../store/redux/slices/user";
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
  const { spotRulesFilters, spotCommoditiesFilter } = useAppSelector(
    (state) => state.filters
  );
  const {
    location: userLocation,
    auth,
    userData,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [spotName, setSpotName] = useState<string>("");
  const [spotDescription, setSpotDescription] = useState<string>("");

  const [approximateDailyCost, setApproximateDailyCost] = useState<PLACE_APPROXIMATE_DAILY_CONST_ENUM>()
  const [ambianceTags, setAmbianceTags] = useState<AMBIENCE_TAG_ENUM[]>([])
  const [themeTags, setThemeTags] = useState<THEME_TAG_ENUM[]>([])


  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");

  const [spotZone, setSpotZone] = useState<string>("");
  const [spotCity, setSpotCity] = useState<string>("");

  const [spotTypeID, setSpotTypeID] = useState<PLACE_TYPES>();
  const [spotKnownFor, setSpotKnownFor] = useState<MINDSETS>();

  // Rules with values
  const [selectedTimLimiteRule, setSelectedTimeLimitRule] =
    useState<PLACE_TIME_LIMIT_RULE>();
  const [selectedNoisePolicyRule, setSelectedNoisePolicyRule] =
    useState<NOISE_POLICY_RULE_ENUM>();
  const [selectedConsumptionPolicyRule, setSelectedConsumptionPolicyRule] =
    useState<CONSUMPTION_POLICY_RULE_ENUM>();
  const [selectedPrivacyPolicyRule, setSelectedPrivacyPolicyRule] = useState<
    PRIVACY_POLICY_RULE_ENUM[]
  >([]);

  const rulesSelectedOptions = useMemo(
    () => ({
      [PLACE_RULES_ENUM.PRIVACY_POLICY]: selectedPrivacyPolicyRule,
      [PLACE_RULES_ENUM.TIME_LIMIT]: selectedTimLimiteRule,
      [PLACE_RULES_ENUM.NOISE_POLICY]: selectedNoisePolicyRule,
      [PLACE_RULES_ENUM.CONSUMPTION_POLICY]: selectedConsumptionPolicyRule,
    }),
    [
      selectedTimLimiteRule,
      selectedNoisePolicyRule,
      selectedConsumptionPolicyRule,
      selectedPrivacyPolicyRule,
    ]
  );

  const handlePrivacyPolicySelection = (option: PRIVACY_POLICY_RULE_ENUM) => {
    !selectedPrivacyPolicyRule.includes(option)
      ? setSelectedPrivacyPolicyRule([...selectedPrivacyPolicyRule, option])
      : setSelectedPrivacyPolicyRule([
          ...selectedPrivacyPolicyRule.filter((opt) => opt !== option),
        ]);
  };

  const handleAmbianceTag = (ambiance: AMBIENCE_TAG_ENUM) => {
    ambianceTags.includes(ambiance) ? setAmbianceTags(old => [...old.filter(a => a !== ambiance)]) : setAmbianceTags(old => [...old, ambiance])
  }

  const handleThemeTag = (theme: THEME_TAG_ENUM) => {
    themeTags.includes(theme) ? setThemeTags(old => [...old.filter(t => t !== theme)]) : setThemeTags(old => [...old, theme])
  }

  const [selectedRules, setSelectedRules] = useState<number[]>([]);

  const handleRuleInput = (id: number, value?: string | string[]) => {
    const currentRule = spotRulesFilters.find((r) => r.id === id);
    if (!currentRule) return;

    if (selectedRules.includes(id)) {
      setSelectedRules(selectedRules.filter((rule) => rule !== id));
    } else {
      setSelectedRules([...selectedRules, id]);
    }

    if (value) {
      if (typeof value === "string") {
        switch (currentRule.rule) {
          case PLACE_RULES_ENUM.CONSUMPTION_POLICY:
            setSelectedConsumptionPolicyRule(
              value as CONSUMPTION_POLICY_RULE_ENUM
            );
            break;
          case PLACE_RULES_ENUM.NOISE_POLICY:
            setSelectedNoisePolicyRule(value as NOISE_POLICY_RULE_ENUM);
            break;
          case PLACE_RULES_ENUM.TIME_LIMIT:
            setSelectedTimeLimitRule(value as PLACE_TIME_LIMIT_RULE);
            break;
          case PLACE_RULES_ENUM.PRIVACY_POLICY:
            handlePrivacyPolicySelection(value as PRIVACY_POLICY_RULE_ENUM);
            break;
        }
      }
    }
  };

  const [selectedCommodities, setSelectedCommodities] = useState<number[]>([]);

  //  Commodities with detail
  const [plugsAmount, setPlugsAmonunt] = useState<string>();

  // Commodities with selection value
  const [wifiSpeed, setWifiSpeed] = useState<WIFI_SPEED_COMMODITY_ENUM>();
  const [selectedParkingCommodity, setSelectedParkingCommodity] =
    useState<PARKING_COMMODITY_ENUM>();
  const [selectedMobileSignalCommodity, setSelectedMobileSignalCommodity] =
    useState<MOBILE_SIGNAL_COMMODITY_ENUM>();

  const [selectedFoodCommodity, setSelectedFoodCommodity] = useState<
    FOOD_COMMODITY_ENUM[]
  >([]);
  const handleFoodOptionSelection = (option: FOOD_COMMODITY_ENUM) => {
    !selectedFoodCommodity.includes(option)
      ? setSelectedFoodCommodity((old) => [...old, option])
      : setSelectedFoodCommodity((old) => [
          ...old.filter((opt) => opt !== option),
        ]);
  };

  const [selectedFoodQuality, setSelectedFoodQuality] =
    useState<COMMODITY_QUALITY>();
  const [selectedComfortLevel, setSelectedComfortLevel] =
    useState<COMFORT_LEVEL_COMMODITY_ENUM>();
  const [selectedTemperatureControl, setSelectedTemperatureControl] = useState<
    TEMPERATURE_CONTROL_COMMODITY_ENUM[]
  >([]);
  const handleTemperatureControlOptionSelection = (
    option: TEMPERATURE_CONTROL_COMMODITY_ENUM
  ) => {
    !selectedTemperatureControl.includes(option)
      ? setSelectedTemperatureControl((old) => [...old, option])
      : setSelectedTemperatureControl((old) => [
          ...old.filter((opt) => opt !== option),
        ]);
  };
  const [selectedCafeQuality, setSelectedCafeQuality] =
    useState<COMMODITY_QUALITY>();
  const [selectedBakeryQuality, setSelectedBakeryeQuality] =
    useState<COMMODITY_QUALITY>();

  const commoditiesSelectedOptions = useMemo(
    () => ({
      [PLACE_COMMODITIES_ENUM.WIFI_SPEED]: wifiSpeed,
      [PLACE_COMMODITIES_ENUM.PARKING]: selectedParkingCommodity,
      [PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL]: selectedMobileSignalCommodity,
      [PLACE_COMMODITIES_ENUM.FOOD]: selectedFoodCommodity,
      [PLACE_COMMODITIES_ENUM.FOOD_QUALITY]: selectedFoodQuality,
      [PLACE_COMMODITIES_ENUM.COMFORT_LEVEL]: selectedComfortLevel,
      [PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL]: selectedTemperatureControl,
      [PLACE_COMMODITIES_ENUM.CAFE_QUALITY]: selectedCafeQuality,
      [PLACE_COMMODITIES_ENUM.BAKERY]: selectedBakeryQuality,
    }),
    [
      wifiSpeed,
      selectedParkingCommodity,
      selectedMobileSignalCommodity,
      selectedFoodCommodity,
      selectedFoodQuality,
      selectedComfortLevel,
      selectedTemperatureControl,
      selectedCafeQuality,
      selectedBakeryQuality,
    ]
  );

  const handleCommodityInput = (id: number, value?: string | string[]) => {
    const currentCommodity = spotCommoditiesFilter.find((c) => c.id === id);
    if (!currentCommodity) return;

    if (selectedCommodities.includes(id)) {
      setSelectedCommodities(
        selectedCommodities.filter((commodity) => commodity !== id)
      );
    } else {
      setSelectedCommodities([...selectedCommodities, id]);
    }

    if (value) {
      if (typeof value === "string") {
        const currValue = value == "0" ? undefined : value
        switch (currentCommodity.commodity) {
          case PLACE_COMMODITIES_ENUM.WIFI_SPEED:
            setWifiSpeed(currValue as WIFI_SPEED_COMMODITY_ENUM | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.PLUGS_AMOUNT:
            setPlugsAmonunt(currValue);
            break;
          case PLACE_COMMODITIES_ENUM.PARKING:
            setSelectedParkingCommodity(currValue as PARKING_COMMODITY_ENUM | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL:
            setSelectedMobileSignalCommodity(currValue as MOBILE_SIGNAL_COMMODITY_ENUM | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.FOOD:
            handleFoodOptionSelection(currValue as FOOD_COMMODITY_ENUM);
            break;
          case PLACE_COMMODITIES_ENUM.FOOD_QUALITY:
            setSelectedFoodQuality(currValue as COMMODITY_QUALITY | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.COMFORT_LEVEL:
            setSelectedComfortLevel(currValue as COMFORT_LEVEL_COMMODITY_ENUM | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL:
            handleTemperatureControlOptionSelection(currValue as TEMPERATURE_CONTROL_COMMODITY_ENUM )
            break;
          case PLACE_COMMODITIES_ENUM.CAFE_QUALITY:
            setSelectedCafeQuality(currValue as COMMODITY_QUALITY | undefined);
            break;
          case PLACE_COMMODITIES_ENUM.BAKERY_QUALITY:
            setSelectedBakeryeQuality(currValue as COMMODITY_QUALITY | undefined);
            break;
        }
      }
    }
  };

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

  function isBooleanCommoditySelected(
    commodity: PLACE_COMMODITIES_ENUM
  ): boolean {
    return selectedCommodities.includes(
      spotCommoditiesFilter.find((c) => c.commodity === commodity)?.id || 0
    );
  }

  function handleGetSpotData(): DiscoverSpotDTO {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      throw new Error("User location not found");
    }

    if (!auth || !userData || !userData.id) {
      throw new Error("User data not found");
    }

    if (
      !spotName ||
      !spotDescription ||
      !spotTypeID ||
      !spotKnownFor ||
      !spotZone ||
      !spotCity
    ) {
      throw new Error("Missing required fields");
    }

    const currentRules = {
      petFriendly: selectedRules.includes(
        spotRulesFilters.find(
          (rule) => rule.rule === PLACE_RULES_ENUM.PET_FRIENDLY
        )?.id || 0
      ),
      smoking: selectedRules.includes(
        spotRulesFilters.find((rule) => rule.rule === PLACE_RULES_ENUM.SMOKING)
          ?.id || 0
      ),
      underAge: selectedRules.includes(
        spotRulesFilters.find(
          (rule) => rule.rule === PLACE_RULES_ENUM.UNDER_AGE
        )?.id || 0
      ),
    };

    const advancedCommodities = {
      plugs: {
        public: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS
          )?.id || 0
        ),
        amount: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS
          )?.id || 0
        )
          ? typeof Number(plugsAmount) === "number"
            ? Number(plugsAmount)
            : null
          : null,
      },
      wifi: {
        public: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI
          )?.id || 0
        ),
        speed: wifiSpeed,
      },
    };

    return {
      name: spotName,
      description: spotDescription,
      type: [spotTypeID],
      knownFor: spotKnownFor,
      approximateDailyCost: approximateDailyCost ? approximateDailyCost : null,
      ambienceTags: ambianceTags,
      themeTags: themeTags,
      rules: {
        closedAt: closingTime,
        openAt: openingTime,
        consumptionPolicy: selectedConsumptionPolicyRule ? selectedConsumptionPolicyRule : null,
        noisePolicy: selectedNoisePolicyRule ? selectedNoisePolicyRule : null,
        privacyPolicy: selectedPrivacyPolicyRule ? selectedPrivacyPolicyRule : null,
        timeLimit: selectedTimLimiteRule ? selectedTimLimiteRule : null,
        ...currentRules,
      },
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zone: spotZone,
        city: spotCity,
        country: "Colombia",
      },
      commodities: {
        publicPlugs: advancedCommodities.plugs.public,
        plugsAmount: advancedCommodities.plugs.amount
          ? advancedCommodities.plugs.amount
          : null,
        publicWifi: advancedCommodities.wifi.public,
        wifiSpeed: wifiSpeed ? wifiSpeed : null,
        parking: selectedParkingCommodity ? selectedParkingCommodity : null,
        greenAreas: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.GREEN_AREAS
        ),
        outdoorSeating: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING
        ),
        coworkSpace: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.COWORK_SPACE
        ),
        publicBathrooms: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS
        ),
        accessibility: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.ACCESSIBILITY
        ),
        alcoholAvailability: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY
        ),
        bakery: isBooleanCommoditySelected(PLACE_COMMODITIES_ENUM.BAKERY),
        bakeryQuality: selectedBakeryQuality ? selectedBakeryQuality : null,
        cafe: isBooleanCommoditySelected(PLACE_COMMODITIES_ENUM.CAFE),
        cafeQuality: selectedCafeQuality ? selectedCafeQuality : null,
        comfortLevel: selectedComfortLevel ? selectedComfortLevel : null,
        eventSpace: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.EVENT_SPACE
        ),
        food: selectedFoodCommodity ? selectedFoodCommodity : null,
        foodQuality: selectedFoodQuality ? selectedFoodQuality : null,
        mobileSignal: selectedMobileSignalCommodity ? selectedMobileSignalCommodity : null,
        temperatureControl: selectedTemperatureControl ? selectedTemperatureControl : null,
      },
      multimedia: files.map((file) => file.slice(0, file.size, file.type)),
      discoveredByID: userData.id,
    };
  }

  async function handleUserGeoLocation() {
    await dispatch(getUserGeoLocation());
  }

  useEffect(() => {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      handleUserGeoLocation();
      return;
    }
  }, [userLocation]);

  async function handleSaveSpot() {
    try {
      setIsSaving(true);
      const spot = handleGetSpotData();
      const resp = (await dispatch(
        newSpotDiscover({ spot, files: spot.multimedia || [] })
      )) as PayloadAction<DiscoveredSpotByUserResponseDTO>;
      if (resp.payload) {
        const { userGamification } = resp.payload;
        if (userGamification.earnedPoints) {
          toast.success(
            t("gamification.discovery.earned.share", {
              points: userGamification.earnedPoints,
            })
          );
          dispatch(setPointsToUser({ points: userGamification.points }));
        }
        dispatch(addDiscoverSpotIntoNearPlaces(resp.payload.discoveredPlace));
        onSave();
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto text-start">
      <h2 className="font-bold text-2xl mb-1 text-start">
        {t("discover.titles.aboutTheSpot")}
      </h2>
      <p className="text-sm font-light">
        {t("discover.texts.provideSpotInformation")}
      </p>

      <form className="py-3 w-full">
        <GeneralInformationInputs
          spotName={spotName}
          onSpotNameChange={(val) => setSpotName(val)}
          spotDescription={spotDescription}
          onSpotDescriptionChange={(val) => setSpotDescription(val)}
          onOpeningTimeChange={(val) => setOpeningTime(val)}
          onClosingTimeChange={(val) => setClosingTime(val)}
          onApproximateDailyCost={(val) => setApproximateDailyCost(val ? val : undefined)}
          onPlaceTheme={(theme) => handleThemeTag(theme)}
          placesThemesSelected={themeTags}
          onPlaceAmbiance={(ambiance) => handleAmbianceTag(ambiance)}
          placeAmbiancesSelected={ambianceTags}
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
          onSpotRule={(rule, value) => handleRuleInput(rule, value)}
          selectedSpotRules={selectedRules}
          selectedRuleOptions={rulesSelectedOptions}
        />

        <SpotCommoditiesInput
          onSpotCommodity={(commodity, value) =>
            handleCommodityInput(commodity, value)
          }
          selectedSpotCommodities={selectedCommodities}
          selectedCommodityOptions={commoditiesSelectedOptions}
          commiditiesWithDetail={{
            [PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS]: plugsAmount || "",
          }}
        />

        <SpotMultimediaInput
          files={files}
          previews={previews}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
        />
      </form>
      <div className="my-5">
        {isSaving ? (
          <LoaderSpinner />
        ) : (
          <SimpleButton
            text={t("actions.discover.shareDiscovery")}
            action={handleSaveSpot}
          />
        )}
      </div>
    </section>
  );
};
