import { PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
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
import { SpotCommoditiesFilters } from "../../../../models/filters";
import { MINDSETS } from "../../../../models/mindsets";
import { DiscoveredPlaceConfirmation } from "../../../../models/placeConfirmation";
import {
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
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

  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const handleRuleInput = (id: number) => {
    if (selectedRules.includes(id)) {
      setSelectedRules(selectedRules.filter((rule) => rule !== id));
    } else {
      setSelectedRules([...selectedRules, id]);
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
  const handleCommodityInput = (id: number) => {
    if (selectedCommodities.includes(id)) {
      setSelectedCommodities(
        selectedCommodities.filter((commodity) => commodity !== id)
      );
    } else {
      setSelectedCommodities([...selectedCommodities, id]);
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
  //  Commodities with detail
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

  function getRecommendedCommoditiesWithDetail() {
    if (currentPlace?.commodities?.wifiSpeed) {
      setWifiSpeed(currentPlace.commodities.wifiSpeed.toString());
    }
    if (currentPlace?.commodities?.plugsAmount) {
      setPlugsAmonunt(currentPlace.commodities.plugsAmount.toString());
    }
  }

  useEffect(() => {
    getRecommendedRules();
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
    return knownForOptions;
  };

  useEffect(() => {
    setReviewsNameOptions(countSpotNames(reviews));
    setReviewsDescriptionOptions(countSpotDescriptions(reviews));
    setReviewsOPenAtOptions(countSpotOpenAt(reviews));
    setReviewsClosedAtOptions(countSpotClosedAt(reviews));
    setReviewsZoneOptions(countSpotZones(reviews));
    setReviewsCityOptions(countSpotCities(reviews));
    setReviewsSpotTypeOptions(countSpotTypes(reviews));
    setReviewsKnownForOptions(countSpotKnownFor(reviews));

    setAlreadyConfirmed(
      reviews.some((review) => review.confirmedByID === userData?.id)
    );
  }, [reviews, userData]);

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
          ? typeof Number(wifiSpeed) === "number"
            ? Number(wifiSpeed)
            : null
          : null,
      },
    };

    return {
      name: spotName,
      description: spotDescription,
      type: [spotTypeID],
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
        plugsAmount: advancedCommodities.plugs.amount
          ? advancedCommodities.plugs.amount
          : null,
        publicWifi: advancedCommodities.wifi.public,
        wifiSpeed: advancedCommodities.wifi.speed
          ? advancedCommodities.wifi.speed
          : null,
        parking: selectedCommodities.includes(
          spotCommoditiesFilter.find(
            (commodity) =>
              commodity.commodity === PLACE_COMMODITIES_ENUM.PARKING
          )?.id || 0
        ),
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
          onSpotRule={(rule) => handleRuleInput(rule)}
          selectedSpotRules={selectedRules}
        />

        <SpotCommoditiesInput
          handleCommodityWithDetailInput={handleCommodityWithDetailInput}
          onSpotCommodity={(commodity) => handleCommodityInput(commodity)}
          selectedSpotCommodities={selectedCommodities}
          commiditiesWithDetail={{
            [PLACE_COMMODITIES_ENUM.PUBLIC_WIFI]: wifiSpeed || "",
            [PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS]: plugsAmount || "",
          }}
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
