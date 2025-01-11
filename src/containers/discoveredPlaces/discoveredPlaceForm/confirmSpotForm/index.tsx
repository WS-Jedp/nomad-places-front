import { PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillLike } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { ControlledError } from "../../../../common/controlledError";
import { ControlledErrorType } from "../../../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { SimpleButton } from "../../../../components/buttons/simple";
import { LoaderSpinner } from "../../../../components/loaders/spinner";
import {
  DiscoverSpotDTO,
  newSpotDiscoveredConfirmedDTO,
} from "../../../../dto/places";
import {
  SpotCommoditiesFilters,
  SpotRulesFilters,
} from "../../../../models/filters";
import { MINDSETS } from "../../../../models/mindsets";
import { DiscoveredPlaceConfirmation } from "../../../../models/placeConfirmation";
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
} from "../../../../models/places";
import { PLACE_TYPES } from "../../../../models/placeTypes";
import { addError } from "../../../../store/redux/slices/controlledErrors";
import { confirmNewSpotDiscovered } from "../../../../store/redux/slices/places";
import {
  getUserGeoLocation,
  setPointsToUser,
} from "../../../../store/redux/slices/user";
import { GeneralInformationInputs } from "../generalInformationInputs";
import { LocationInputs } from "../locationInputs";
import { SpotCommoditiesInput } from "../spotCommoditiesInput";
import { SpotKnownForInput } from "../spotKnownForInput";
import { SpotRulesInput } from "../spotRulesInput";
import { SpotTypeInput } from "../spotTypeInput";

export type ReviewValueAmountOptions<T> = {
  value: T;
  amount: number;
};

export const ConfirmDiscoveredSpotForm: React.FC<{
  onSave: (spotState: newSpotDiscoveredConfirmedDTO) => void;
  onCancel: () => void;
  reviews: DiscoveredPlaceConfirmation[];
}> = ({ onCancel, onSave, reviews }) => {
  const { t } = useTranslation();
  const currentPlace = useAppSelector((state) => state.places.currentPlace);
  const { spotRulesFilters, spotCommoditiesFilter } = useAppSelector(
    (state) => state.filters
  );

  const {
    location: userLocation,
    auth,
    userData,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isRecommendByAuthUser, setIsRecommendedByAuthUser] =
    useState<boolean>(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [spotName, setSpotName] = useState<string>(currentPlace?.name || "");
  const [spotDescription, setSpotDescription] = useState<string>(
    currentPlace?.description || ""
  );

  const [openingTime, setOpeningTime] = useState<string>(
    currentPlace?.rules?.openAt || ""
  );
  const [closingTime, setClosingTime] = useState<string>(
    currentPlace?.rules?.closedAt || ""
  );

  const [spotZone, setSpotZone] = useState<string>(
    currentPlace?.location.zone || ""
  );
  const [spotCity, setSpotCity] = useState<string>(
    currentPlace?.location.city || ""
  );

  const [spotTypeID, setSpotTypeID] = useState<PLACE_TYPES | undefined>(
    currentPlace?.type[0] || undefined
  );
  const [spotKnownFor, setSpotKnownFor] = useState<MINDSETS | undefined>(
    currentPlace?.knownFor || undefined
  );

  const [spotReviews, setSpotReviews] =
    useState<DiscoveredPlaceConfirmation[]>(reviews);
  const [reviewsNameOptions, setReviewsNameOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsDescriptionOptions, setReviewsDescriptionOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsOPenAtOptions, setReviewsOPenAtOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsClosedAtOptions, setReviewsClosedAtOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsZoneOptions, setReviewsZoneOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsCityOptions, setReviewsCityOptions] =
    useState<ReviewValueAmountOptions<string>[]>();
  const [reviewsSpotTypeOptions, setReviewsSpotTypeOptions] =
    useState<ReviewValueAmountOptions<PLACE_TYPES>[]>();
  const [reviewsKnownForOptions, setReviewsKnownForOptions] =
    useState<ReviewValueAmountOptions<MINDSETS>[]>();
  const [reviewsApproximateDailyCost, setReviewsApproximateDailyCost] =
    useState<ReviewValueAmountOptions<PLACE_APPROXIMATE_DAILY_CONST_ENUM>[]>();

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

  const [approximateDailyCost, setApproximateDailyCost] =
    useState<PLACE_APPROXIMATE_DAILY_CONST_ENUM | null>(
      currentPlace?.approximateDailyCost || null
    );
  const [ambianceTags, setAmbianceTags] = useState<AMBIENCE_TAG_ENUM[]>(
    currentPlace?.ambianceTags || []
  );
  const [themeTags, setThemeTags] = useState<THEME_TAG_ENUM[]>(
    currentPlace?.themeTags || []
  );

  // Commodities with option value
  const [wifiSpeed, setWifiSpeed] = useState<WIFI_SPEED_COMMODITY_ENUM>();
  const [plugsAmount, setPlugsAmonunt] = useState<string>();
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

  const handlePrivacyPolicySelection = (option: PRIVACY_POLICY_RULE_ENUM) => {
    !selectedPrivacyPolicyRule.includes(option)
      ? setSelectedPrivacyPolicyRule([...selectedPrivacyPolicyRule, option])
      : setSelectedPrivacyPolicyRule([
          ...selectedPrivacyPolicyRule.filter((opt) => opt !== option),
        ]);
  };

  const handleAmbianceTag = (ambiance: AMBIENCE_TAG_ENUM) => {
    ambianceTags.includes(ambiance)
      ? setAmbianceTags((old) => [...old.filter((a) => a !== ambiance)])
      : setAmbianceTags((old) => [...old, ambiance]);
  };

  const handleThemeTag = (theme: THEME_TAG_ENUM) => {
    themeTags.includes(theme)
      ? setThemeTags((old) => [...old.filter((t) => t !== theme)])
      : setThemeTags((old) => [...old, theme]);
  };

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

  function getRecommendedRules() {
    const allRulesSelected = spotRulesFilters
      .filter((rule) => {
        if (currentPlace?.rules[rule.rule]) {
          return rule;
        }
        return false;
      })
      .map((rule) => rule.id);
    setSelectedRules(allRulesSelected);
  }

  const [selectedCommodities, setSelectedCommodities] = useState<number[]>([]);
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
        switch (currentCommodity.commodity) {
          case PLACE_COMMODITIES_ENUM.WIFI_SPEED:
            setWifiSpeed(value as WIFI_SPEED_COMMODITY_ENUM);
            break;
          case PLACE_COMMODITIES_ENUM.PARKING:
            setSelectedParkingCommodity(
              value as PARKING_COMMODITY_ENUM | undefined
            );
            break;
          case PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL:
            setSelectedMobileSignalCommodity(
              value as MOBILE_SIGNAL_COMMODITY_ENUM | undefined
            );
            break;
          case PLACE_COMMODITIES_ENUM.FOOD:
            handleFoodOptionSelection(value as FOOD_COMMODITY_ENUM);
            break;
          case PLACE_COMMODITIES_ENUM.FOOD_QUALITY:
            setSelectedFoodQuality(value as COMMODITY_QUALITY);
            break;
          case PLACE_COMMODITIES_ENUM.COMFORT_LEVEL:
            setSelectedComfortLevel(value as COMFORT_LEVEL_COMMODITY_ENUM);
            break;
          case PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL:
            handleTemperatureControlOptionSelection(
              value as TEMPERATURE_CONTROL_COMMODITY_ENUM
            );
            break;
          case PLACE_COMMODITIES_ENUM.CAFE_QUALITY:
            setSelectedCafeQuality(value as COMMODITY_QUALITY);
            break;
          case PLACE_COMMODITIES_ENUM.BAKERY_QUALITY:
            setSelectedBakeryeQuality(value as COMMODITY_QUALITY);
            break;
        }
      }
    }
  };
  function getRecommendedCommodities() {
    const allCommoditiesSelected = spotCommoditiesFilter
      .filter((commodity) => {
        if (
          currentPlace?.commodities &&
          currentPlace?.commodities[commodity.commodity]
        ) {
          return commodity;
        }
        return false;
      })
      .map((commodity) => commodity.id);
    setSelectedCommodities(allCommoditiesSelected);
  }

  function getRecommendedCommoditiesWithDetail() {
    if (currentPlace?.commodities?.wifiSpeed) {
      setWifiSpeed(currentPlace.commodities.wifiSpeed);
    }
    if (currentPlace?.commodities?.plugsAmount) {
      setPlugsAmonunt(currentPlace.commodities.plugsAmount.toString());
    }
    if (currentPlace?.commodities?.parking) {
      setSelectedParkingCommodity(currentPlace.commodities.parking);
    }
    if (currentPlace?.commodities?.mobileSignal) {
      setSelectedMobileSignalCommodity(currentPlace.commodities.mobileSignal);
    }
    if (currentPlace?.commodities?.food) {
      setSelectedFoodCommodity(currentPlace.commodities.food);
    }
    if (currentPlace?.commodities?.foodQuality) {
      setSelectedFoodQuality(currentPlace.commodities.foodQuality);
    }
    if (currentPlace?.commodities?.comfortLevel) {
      setSelectedComfortLevel(currentPlace.commodities.comfortLevel);
    }
    if (currentPlace?.commodities?.temperatureControl) {
      setSelectedTemperatureControl(
        currentPlace.commodities.temperatureControl
      );
    }
    if (currentPlace?.commodities?.cafeQuality) {
      setSelectedCafeQuality(currentPlace.commodities.cafeQuality);
    }
    if (currentPlace?.commodities?.bakeryQuality) {
      setSelectedBakeryeQuality(currentPlace.commodities.bakeryQuality);
    }
  }

  function getRecommendedRulesWithDetail() {
    if (currentPlace?.rules?.timeLimit) {
      setSelectedTimeLimitRule(currentPlace.rules.timeLimit);
    }
    if (currentPlace?.rules?.noisePolicy) {
      setSelectedNoisePolicyRule(currentPlace.rules.noisePolicy);
    }
    if (currentPlace?.rules?.consumptionPolicy) {
      setSelectedConsumptionPolicyRule(currentPlace.rules.consumptionPolicy);
    }
    if (currentPlace?.rules?.privacyPolicy) {
      setSelectedPrivacyPolicyRule(currentPlace.rules.privacyPolicy);
    }
  }

  useEffect(() => {
    getRecommendedRules();
    getRecommendedRulesWithDetail();
    getRecommendedCommodities();
    getRecommendedCommoditiesWithDetail();
  }, []);

  const countSpotNames = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const nameOptions: {
      value: string;
      amount: number;
    }[] = [];

    places.forEach((place) => {
      if (!place.name) return;
      const name = nameOptions.find((option) => option.value === place.name);
      if (name) {
        name.amount++;
      } else {
        nameOptions.push({
          value: place.name,
          amount: 1,
        });
      }
    });

    if (currentPlace?.name) {
      const currentPlaceName = nameOptions.find(
        (option) => option.value === currentPlace.name
      );
      if (currentPlaceName) {
        currentPlaceName.amount++;
      } else {
        nameOptions.push({
          value: currentPlace.name,
          amount: 1,
        });
      }
    }
    return nameOptions;
  };

  const countSpotDescriptions = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const descriptionOptions: ReviewValueAmountOptions<string>[] = [];

    places.forEach((place) => {
      if (!place.description) return;
      const description = descriptionOptions.find(
        (option) => option.value === place.description
      );
      if (description) {
        description.amount++;
      } else {
        descriptionOptions.push({
          value: place.description,
          amount: 1,
        });
      }
    });

    if (currentPlace?.description) {
      const currentPlaceDescription = descriptionOptions.find(
        (option) => option.value === currentPlace.description
      );
      if (currentPlaceDescription) {
        currentPlaceDescription.amount++;
      } else {
        descriptionOptions.push({
          value: currentPlace.description,
          amount: 1,
        });
      }
    }

    return descriptionOptions;
  };

  const countSpotOpenAt = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const openAtOptions: ReviewValueAmountOptions<string>[] = [];
    places.forEach((place) => {
      if (!place.rules.openAt) return;
      const openAt = openAtOptions.find(
        (option) => option.value === place.rules.openAt
      );
      if (openAt) {
        openAt.amount++;
      } else {
        openAtOptions.push({
          value: place.rules.openAt,
          amount: 1,
        });
      }
    });

    if (currentPlace?.rules.openAt) {
      const currentPlaceOpenAt = openAtOptions.find(
        (option) => option.value === currentPlace.rules.openAt
      );
      if (currentPlaceOpenAt) {
        currentPlaceOpenAt.amount++;
      } else {
        openAtOptions.push({
          value: currentPlace.rules.openAt,
          amount: 1,
        });
      }
    }
    return openAtOptions;
  };

  const countSpotClosedAt = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const closedAtOptions: ReviewValueAmountOptions<string>[] = [];
    places.forEach((place) => {
      if (!place.rules.closedAt) return;
      const closedAt = closedAtOptions.find(
        (option) => option.value === place.rules.closedAt
      );
      if (closedAt) {
        closedAt.amount++;
      } else {
        closedAtOptions.push({
          value: place.rules.closedAt,
          amount: 1,
        });
      }
    });

    if (currentPlace?.rules.closedAt) {
      const currentPlaceClosedAt = closedAtOptions.find(
        (option) => option.value === currentPlace.rules.closedAt
      );
      if (currentPlaceClosedAt) {
        currentPlaceClosedAt.amount++;
      } else {
        closedAtOptions.push({
          value: currentPlace.rules.closedAt,
          amount: 1,
        });
      }
    }
    return closedAtOptions;
  };

  const countSpotZones = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const zoneOptions: ReviewValueAmountOptions<string>[] = [];
    places.forEach((place) => {
      if (!place.location.zone) return;
      const zone = zoneOptions.find(
        (option) => option.value === place.location.zone
      );
      if (zone) {
        zone.amount++;
      } else {
        zoneOptions.push({
          value: place.location.zone,
          amount: 1,
        });
      }
    });

    if (currentPlace?.location.zone) {
      const currentPlaceZone = zoneOptions.find(
        (option) => option.value === currentPlace.location.zone
      );
      if (currentPlaceZone) {
        currentPlaceZone.amount++;
      } else {
        zoneOptions.push({
          value: currentPlace.location.zone,
          amount: 1,
        });
      }
    }
    return zoneOptions;
  };

  const countSpotCities = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<string>[] => {
    const cityOptions: ReviewValueAmountOptions<string>[] = [];
    places.forEach((place) => {
      if (!place.location.city) return;
      const city = cityOptions.find(
        (option) => option.value === place.location.city
      );
      if (city) {
        city.amount++;
      } else {
        cityOptions.push({
          value: place.location.city,
          amount: 1,
        });
      }
    });

    if (currentPlace?.location.city) {
      const currentPlaceCity = cityOptions.find(
        (option) => option.value === currentPlace.location.city
      );
      if (currentPlaceCity) {
        currentPlaceCity.amount++;
      } else {
        cityOptions.push({
          value: currentPlace.location.city,
          amount: 1,
        });
      }
    }
    return cityOptions;
  };

  const countSpotTypes = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<PLACE_TYPES>[] => {
    const typeOptions: ReviewValueAmountOptions<PLACE_TYPES>[] = [];
    places.forEach((place) => {
      if (!place.type[0]) return;
      const type = typeOptions.find((option) => option.value === place.type[0]);
      if (type) {
        type.amount++;
      } else {
        typeOptions.push({
          value: place.type[0],
          amount: 1,
        });
      }
    });

    if (currentPlace?.type[0]) {
      const currentPlaceType = typeOptions.find(
        (option) => option.value === currentPlace.type[0]
      );
      if (currentPlaceType) {
        currentPlaceType.amount++;
      } else {
        typeOptions.push({
          value: currentPlace.type[0],
          amount: 1,
        });
      }
    }

    return typeOptions;
  };

  const countSpotKnownFor = (
    places: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<MINDSETS>[] => {
    const knownForOptions: ReviewValueAmountOptions<MINDSETS>[] = [];
    places.forEach((place) => {
      if (!place.knownFor) return;
      const knownFor = knownForOptions.find(
        (option) => option.value === place.knownFor
      );
      if (knownFor) {
        knownFor.amount++;
      } else {
        knownForOptions.push({
          value: place.knownFor,
          amount: 1,
        });
      }
    });

    if (currentPlace?.knownFor) {
      const currentPlaceKnownFor = knownForOptions.find(
        (option) => option.value === currentPlace.knownFor
      );
      if (currentPlaceKnownFor) {
        currentPlaceKnownFor.amount++;
      } else {
        knownForOptions.push({
          value: currentPlace.knownFor,
          amount: 1,
        });
      }
    }
    return knownForOptions;
  };

  const countApproximateDailyCost = (
    confirmations: DiscoveredPlaceConfirmation[]
  ): ReviewValueAmountOptions<PLACE_APPROXIMATE_DAILY_CONST_ENUM>[] => {
    const approximateDailyCostOptions: ReviewValueAmountOptions<PLACE_APPROXIMATE_DAILY_CONST_ENUM>[] =
      [];
    confirmations.forEach((place) => {
      if (!place.approximateDailyCost) return;
      const approximateDailyCost = approximateDailyCostOptions.find(
        (option) => option.value === place.approximateDailyCost
      );
      if (approximateDailyCost) {
        approximateDailyCost.amount++;
      } else {
        approximateDailyCostOptions.push({
          value: place.approximateDailyCost,
          amount: 1,
        });
      }
    });

    if(currentPlace?.approximateDailyCost) {
      const currApproxDailyCost = approximateDailyCostOptions.find(cost => cost.value === currentPlace.approximateDailyCost);
      if(currApproxDailyCost) {
        currApproxDailyCost.amount++;
      } else {
        approximateDailyCostOptions.push({
          value: currentPlace.approximateDailyCost,
          amount: 1,
        });
      }
    }
    return approximateDailyCostOptions;
  }

  useEffect(() => {
    setReviewsNameOptions(countSpotNames(reviews));
    setReviewsDescriptionOptions(countSpotDescriptions(reviews));
    setReviewsOPenAtOptions(countSpotOpenAt(reviews));
    setReviewsClosedAtOptions(countSpotClosedAt(reviews));
    setReviewsZoneOptions(countSpotZones(reviews));
    setReviewsCityOptions(countSpotCities(reviews));
    setReviewsSpotTypeOptions(countSpotTypes(reviews));
    setReviewsKnownForOptions(countSpotKnownFor(reviews));
    setReviewsApproximateDailyCost(countApproximateDailyCost(reviews))

    setAlreadyConfirmed(
      reviews.some((review) => review.confirmedByID === userData?.id)
    );
  }, [reviews, userData]);

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
        speed: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI
          )?.id || 0
        )
          ? (wifiSpeed as WIFI_SPEED_COMMODITY_ENUM)
          : null,
      },
    };

    return {
      name: spotName,
      description: spotDescription,
      type: [spotTypeID],
      knownFor: spotKnownFor,
      approximateDailyCost: null,
      ambienceTags: ambianceTags,
      themeTags: themeTags,
      rules: {
        closedAt: closingTime,
        openAt: openingTime,
        consumptionPolicy: selectedConsumptionPolicyRule || null,
        noisePolicy: selectedNoisePolicyRule || null,
        privacyPolicy: selectedPrivacyPolicyRule || [],
        timeLimit: selectedTimLimiteRule || null,
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
        plugsAmount: advancedCommodities.plugs.amount
          ? advancedCommodities.plugs.amount
          : null,
        publicWifi: advancedCommodities.wifi.public,
        wifiSpeed: advancedCommodities.wifi.speed
          ? advancedCommodities.wifi.speed
          : null,
        parking: selectedParkingCommodity || null,
        coworkSpace: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.COWORK_SPACE
          )?.id || 0
        ),
        publicBathrooms: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS
          )?.id || 0
        ),
        greenAreas: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.GREEN_AREAS
          )?.id || 0
        ),
        outdoorSeating: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING
          )?.id || 0
        ),
        accessibility: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.ACCESSIBILITY
        ),
        alcoholAvailability: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY
        ),
        bakery: isBooleanCommoditySelected(PLACE_COMMODITIES_ENUM.BAKERY),
        bakeryQuality: selectedBakeryQuality || null,
        cafe: isBooleanCommoditySelected(PLACE_COMMODITIES_ENUM.CAFE),
        cafeQuality: selectedCafeQuality || null,
        comfortLevel: selectedComfortLevel || null,
        eventSpace: isBooleanCommoditySelected(
          PLACE_COMMODITIES_ENUM.EVENT_SPACE
        ),
        food: selectedFoodCommodity || [],
        foodQuality: selectedFoodQuality || null,
        mobileSignal: selectedMobileSignalCommodity || null,
        temperatureControl: selectedTemperatureControl || [],
      },
      multimedia: [],
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

  async function handleConfirmSpotRecommendation() {
    try {
      setIsSaving(true);
      if (!currentPlace) {
        throw new Error("No place selected");
      }
      const resp = (await dispatch(
        confirmNewSpotDiscovered({
          confirmmedSpot: {
            spotID: currentPlace?.id,
            discoveredSpotReview: handleGetSpotData(),
          },
        })
      )) as PayloadAction<newSpotDiscoveredConfirmedDTO>;

      if (resp.payload.userGamification) {
        if (resp.payload.placeApproved)
          toast.success(
            t("gamification.discovery.earned.lastConfirmation", {
              points: resp.payload.userGamification.earnedPoints,
            })
          );
        else
          toast.success(
            t("gamification.discovery.earned.confirm", {
              points: resp.payload.userGamification.earnedPoints,
            })
          );

        dispatch(
          setPointsToUser({ points: resp.payload.userGamification.points })
        );
      }

      onSave(resp.payload);
    } catch (error) {
      dispatch(
        addError(
          new ControlledError(
            String(error),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    if (!userData || !currentPlace) return;
    setIsRecommendedByAuthUser(userData.id === currentPlace.discoveredByID);
  }, [userData]);

  if (!currentPlace) {
    return <div> No place selected </div>;
  }

  return (
    <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto text-start">
      {isRecommendByAuthUser && (
        <div className="bg-gray-100 p-2 px-3 my-1 rounded-md shadow-sm">
          <p className="text-xs font-light flex flex-row items-center">
            <IoMdInformationCircleOutline
              size={18}
              className="inline-flex mr-1"
            />
            {t("messages.discover.spot.actions.discoveredSpot")}
          </p>
        </div>
      )}

      {alreadyConfirmed && (
        <div className="bg-emerald-100 text-emerald-700 p-2 px-3 my-1 rounded-md shadow-sm">
          <p className="text-xs font-light flex flex-row items-center">
            <IoMdInformationCircleOutline
              size={18}
              className="inline-flex mr-1"
            />
            {t("messages.discover.spot.actions.alreadyConfirmed")}
          </p>
        </div>
      )}

      <div className="flex flex-row w-full items-center justify-between border-b border-slate-400 pb-2 mb-2">
        <h2 className="font-bold text-2xl mb-1 text-start">
          {t("messages.discover.spot.actions.helpToConfirm")}
        </h2>
        {spotReviews.length > 0 && (
          <span className="bg-emerald-100 rounded-md px-3 py-1 flex items-center justify-center text-center text-xs font-bold text-emerald-700">
            {spotReviews.length}
            <AiFillLike size={15} className="ml-1" />
          </span>
        )}
      </div>
      <p className="text-sm font-light">
        {t("messages.discover.spot.actions.confirmCorrectData")}
      </p>

      <form className="py-3 w-full">
        <GeneralInformationInputs
          spotName={spotName}
          onSpotNameChange={(val) => setSpotName(val)}
          spotDescription={spotDescription}
          onSpotDescriptionChange={(val) => setSpotDescription(val)}
          spotOpenAt={openingTime}
          onOpeningTimeChange={(val) => setOpeningTime(val)}
          spotCloseAt={closingTime}
          onClosingTimeChange={(val) => setClosingTime(val)}
          isConfirmation
          reviewsNameOptions={reviewsNameOptions}
          reviewsDescriptionOptions={reviewsDescriptionOptions}
          reviewsCloseAtOptions={reviewsClosedAtOptions}
          reviewsOpenAtOptions={reviewsOPenAtOptions}
          reviewsApproximateDailyCostOptions={reviewsApproximateDailyCost}
          approximateDailyCostSelected={approximateDailyCost || undefined}
          onApproximateDailyCost={(val) => setApproximateDailyCost(val)}
          onPlaceTheme={(theme) => handleThemeTag(theme)}
          placesThemesSelected={themeTags}
          onPlaceAmbiance={(ambiance) => handleAmbianceTag(ambiance)}
          placeAmbiancesSelected={ambianceTags}
        />

        <LocationInputs
          spotZone={spotZone}
          onSpotZoneChange={(val) => setSpotZone(val)}
          reviewsZoneOptions={reviewsZoneOptions}
          spotCity={spotCity}
          onSpotCityChange={(val) => setSpotCity(val)}
          reviewsCityOptions={reviewsCityOptions}
        />

        <SpotTypeInput
          onSpotType={(spotType) => setSpotTypeID(spotType)}
          selectedSpotType={spotTypeID}
          reviewsSpotTypeOptions={reviewsSpotTypeOptions}
        />

        <SpotKnownForInput
          onSpotKnownFor={(mindset) => setSpotKnownFor(mindset)}
          selectedSpotKnownFor={spotKnownFor}
          reviewsSpotKnownForOptions={reviewsKnownForOptions}
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
          commiditiesWithDetail={{
            [PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS]: plugsAmount || "",
          }}
          selectedCommodityOptions={commoditiesSelectedOptions}
        />
      </form>
      {!alreadyConfirmed && !isRecommendByAuthUser && (
        <div className="my-5">
          {isSaving ? (
            <LoaderSpinner />
          ) : (
            <SimpleButton
              text={t("actions.discover.confirmSpot")}
              action={handleConfirmSpotRecommendation}
            />
          )}
        </div>
      )}
    </section>
  );
};
