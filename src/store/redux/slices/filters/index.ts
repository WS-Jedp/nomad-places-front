import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  PlaceMindsetsFilter,
  SpotAmountPeopleFilter,
  SpotCommoditiesFilters,
  SpotRulesFilters,
} from "../../../../models/filters";
import { MINDSETS } from "../../../../models/mindsets";
import { PlaceTypesFilter, PLACE_TYPES } from "../../../../models/placeTypes";
import {
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
} from "../../../../models/places";

export interface FiltersState {
  spotMindsetFilter: PlaceMindsetsFilter[];
  selectedSpotMindsetFilter: Number[];
  spotTypesFilter: PlaceTypesFilter[];
  selectedSpotTypesFilter: Number[];
  spotCommoditiesFilter: SpotCommoditiesFilters[];
  selectedSpotCommoditiesFilter: Number[];
  selectedValuesSpotCommoditiesFilter: {
    commodity: PLACE_COMMODITIES_ENUM;
    value: string | string[];
  }[];
  spotRulesFilters: SpotRulesFilters[];
  selectedSpotRulesFilter: Number[];
  selectedValuesSpotRulesFilter: {
    rule: PLACE_RULES_ENUM;
    value: string | string[];
  }[];
  spotAmountPeopleFilter: SpotAmountPeopleFilter[];
  selectedSpotAmountPeopleFilter: number | null;
  spotKnownForFilter: PlaceMindsetsFilter[];
  selectedSpotKnownForFilter: Number[];
}

const mindsetsFilters = [
  {
    id: 1,
    name: MINDSETS.STUDY,
  },
  {
    id: 2,
    name: MINDSETS.WORK,
  },
  {
    id: 3,
    name: MINDSETS.VIBE,
  },
  {
    id: 4,
    name: MINDSETS.ROMANTIC,
  },
];

const spotTypesFilters: PlaceTypesFilter[] = [
  {
    id: 1,
    name: PLACE_TYPES.COFFEE,
    title: "Coffee",
  },
  {
    id: 2,
    name: PLACE_TYPES.LIBRARY,
    title: "Library",
  },
  {
    id: 3,
    name: PLACE_TYPES.LOOKOUT,
    title: "Lookout",
  },
  {
    id: 4,
    name: PLACE_TYPES.PARK,
    title: "Park",
  },
  {
    id: 5,
    name: PLACE_TYPES.ROOFTOP,
    title: "Rooftop",
  },
  {
    id: 6,
    name: PLACE_TYPES.COWORK_ZONE,
    title: PLACE_TYPES.COWORK_ZONE,
  },
];

const spotCommoditiesFilters: SpotCommoditiesFilters[] = [
  {
    id: 1,
    commodity: PLACE_COMMODITIES_ENUM.PUBLIC_WIFI,
    name: "Public Wifi",
  },
  {
    id: 2,
    commodity: PLACE_COMMODITIES_ENUM.PARKING,
    name: "Parking",
  },
  {
    id: 3,
    commodity: PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS,
    name: "Public Plugs",
  },
  {
    id: 4,
    commodity: PLACE_COMMODITIES_ENUM.COWORK_SPACE,
    name: "Cowork Space",
  },
  {
    id: 5,
    commodity: PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS,
    name: "Public Bathrooms",
  },
  {
    id: 6,
    commodity: PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL,
    name: "Mobile Signal Level",
  },
  {
    id: 7,
    commodity: PLACE_COMMODITIES_ENUM.FOOD,
    name: "Available Type of Food in Place",
  },
  {
    id: 8,
    commodity: PLACE_COMMODITIES_ENUM.FOOD_QUALITY,
    name: "Rating of Food Products",
  },
  {
    id: 9,
    commodity: PLACE_COMMODITIES_ENUM.COMFORT_LEVEL,
    name: "Comfort Level",
  },
  {
    id: 10,
    commodity: PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING,
    name: "Outdoor Seating",
  },
  {
    id: 11,
    commodity: PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL,
    name: "Temperature Control",
  },
  {
    id: 12,
    commodity: PLACE_COMMODITIES_ENUM.ACCESSIBILITY,
    name: "Accessibility",
  },
  {
    id: 13,
    commodity: PLACE_COMMODITIES_ENUM.EVENT_SPACE,
    name: "Event Space Available",
  },
  {
    id: 14,
    commodity: PLACE_COMMODITIES_ENUM.GREEN_AREAS,
    name: "Green Areas",
  },
  {
    id: 15,
    commodity: PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY,
    name: "Alcohol Availability",
  },
  {
    id: 16,
    commodity: PLACE_COMMODITIES_ENUM.CAFE,
    name: "Cafe",
  },
  {
    id: 17,
    commodity: PLACE_COMMODITIES_ENUM.CAFE_QUALITY,
    name: "Cafe Rating",
  },
  {
    id: 18,
    commodity: PLACE_COMMODITIES_ENUM.BAKERY,
    name: "Bakery",
  },
  {
    id: 19,
    commodity: PLACE_COMMODITIES_ENUM.BAKERY_QUALITY,
    name: "Bakery Rating",
  },
  {
    id: 20,
    commodity: PLACE_COMMODITIES_ENUM.WIFI_SPEED,
    name: "Wifi Speed",
  },
];

const spotRulesFilters: SpotRulesFilters[] = [
  {
    id: 1,
    rule: PLACE_RULES_ENUM.PET_FRIENDLY,
    name: "Pets allowed",
  },
  {
    id: 2,
    rule: PLACE_RULES_ENUM.SMOKING,
    name: "Smoking allowed",
  },
  {
    id: 3,
    rule: PLACE_RULES_ENUM.UNDER_AGE,
    name: "Under age allowed",
  },
  {
    id: 4,
    rule: PLACE_RULES_ENUM.TIME_LIMIT,
    name: "Minimum time spent in place",
  },
  {
    id: 5,
    rule: PLACE_RULES_ENUM.NOISE_POLICY,
    name: "Policy about noise levels",
  },
  {
    id: 6,
    rule: PLACE_RULES_ENUM.CONSUMPTION_POLICY,
    name: "Minimum consumption of the place",
  },
  {
    id: 7,
    rule: PLACE_RULES_ENUM.PRIVACY_POLICY,
    name: "Spaces dedicated to each person policy",
  },
];

const spotAmountPeople: SpotAmountPeopleFilter[] = [
  {
    id: 1,
    range: [0, 5],
    text: "0 - 5",
  },
  {
    id: 2,
    range: [5, 10],
    text: "5 - 10",
  },
  {
    id: 3,
    range: [10, 15],
    text: "10 - 15",
  },
  {
    id: 4,
    range: [15, 20],
    text: "15 - 20",
  },
  {
    id: 5,
    range: [20, 25],
    text: "20 - 25",
  },
  {
    id: 6,
    range: [25, 99],
    text: "+25",
  },
];

const initialFiltersState: FiltersState = {
  spotMindsetFilter: mindsetsFilters,
  selectedSpotMindsetFilter: [],
  spotTypesFilter: spotTypesFilters,
  selectedSpotTypesFilter: [],
  spotCommoditiesFilter: spotCommoditiesFilters,
  selectedSpotCommoditiesFilter: [],
  selectedValuesSpotCommoditiesFilter: [],
  spotRulesFilters: spotRulesFilters,
  selectedSpotRulesFilter: [],
  selectedValuesSpotRulesFilter: [],
  spotAmountPeopleFilter: spotAmountPeople,
  selectedSpotAmountPeopleFilter: null,
  selectedSpotKnownForFilter: [],
  spotKnownForFilter: mindsetsFilters,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,
  reducers: {
    // ----------------
    // Mindset filters
    selectMindsetFilter: (
      state,
      action: PayloadAction<{ mindsetFilterID: number }>
    ) => {
      state.selectedSpotMindsetFilter = [
        ...state.selectedSpotMindsetFilter,
        action.payload.mindsetFilterID,
      ];
    },
    removeMindsetFilter: (
      state,
      action: PayloadAction<{ mindsetFilterID: number }>
    ) => {
      if (!state.selectedSpotMindsetFilter.length) return;

      state.selectedSpotMindsetFilter = state.selectedSpotMindsetFilter.filter(
        (id) => id !== action.payload.mindsetFilterID
      );
    },
    resetMindsetlaceFilters: (state) => {
      state.selectedSpotMindsetFilter =
        initialFiltersState.selectedSpotMindsetFilter;
    },

    // ----------------
    // Spot type filters
    selectSpotTypeFilter: (
      state,
      action: PayloadAction<{ spotTypeFilterID: number }>
    ) => {
      state.selectedSpotTypesFilter = [
        ...state.selectedSpotTypesFilter,
        action.payload.spotTypeFilterID,
      ];
    },
    removeSpotTypeFilter: (
      state,
      action: PayloadAction<{ spotTypeFilterID: number }>
    ) => {
      if (!state.selectedSpotTypesFilter.length) return;

      state.selectedSpotTypesFilter = state.selectedSpotTypesFilter.filter(
        (id) => id !== action.payload.spotTypeFilterID
      );
    },
    resetSelectedSpotTypeFilters: (state) => {
      state.selectedSpotTypesFilter =
        initialFiltersState.selectedSpotTypesFilter;
    },

    // ----------------
    // Spot commodities filters
    selectCommodityFilter: (
      state,
      action: PayloadAction<{ commodityFilterID: number }>
    ) => {
      state.selectedSpotCommoditiesFilter = [
        ...state.selectedSpotCommoditiesFilter,
        action.payload.commodityFilterID,
      ];
    },
    removeCommodityFilter: (
      state,
      action: PayloadAction<{ commodityFilterID: number }>
    ) => {
      if (!state.selectedSpotCommoditiesFilter.length) return;

      state.selectedSpotCommoditiesFilter =
        state.selectedSpotCommoditiesFilter.filter(
          (id) => id !== action.payload.commodityFilterID
        );
    },
    resetSelectedCommodityFilters: (state) => {
      state.selectedSpotCommoditiesFilter =
        initialFiltersState.selectedSpotCommoditiesFilter;
    },
    handleValueCommodityFilter(
      state,
      action: PayloadAction<{
        commodity: PLACE_COMMODITIES_ENUM;
        value: string;
      }>
    ) {
      const { value, commodity } = action.payload;
      const selectedOptions = state.selectedValuesSpotCommoditiesFilter.find(
        (c) => c.commodity == action.payload.commodity
      );
      if (!selectedOptions) {
        const shouldBeArrayValue = [
          PLACE_COMMODITIES_ENUM.FOOD,
          PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL,
        ];
        const currentValue = shouldBeArrayValue.includes(commodity)
          ? [value]
          : value;
        state.selectedValuesSpotCommoditiesFilter.push({
          commodity,
          value: currentValue,
        });
      } else if (Array.isArray(selectedOptions.value)) {
        if (selectedOptions.value.length) {
          selectedOptions.value.includes(value)
            ? (selectedOptions.value = selectedOptions.value.filter(
                (opt) => opt !== value
              ))
            : selectedOptions.value.push(value);
        } else {
          selectedOptions.value = [value];
        }
      } else if (selectedOptions?.value) {
        selectedOptions.value = value;
      }
    },
    resetValueCommidityFilters: (state) => {
      state.selectedValuesSpotCommoditiesFilter =
        initialFiltersState.selectedValuesSpotCommoditiesFilter;
    },

    // ----------------
    // Spot rules filters
    selectSpotRuleFilter: (
      state,
      action: PayloadAction<{ spotRuleFilterID: number }>
    ) => {
      state.selectedSpotRulesFilter = [
        ...state.selectedSpotRulesFilter,
        action.payload.spotRuleFilterID,
      ];
    },
    removeSpotRuleFilter: (
      state,
      action: PayloadAction<{ spotRuleFilterID: number }>
    ) => {
      if (!state.selectedSpotRulesFilter.length) return;

      state.selectedSpotRulesFilter = state.selectedSpotRulesFilter.filter(
        (id) => id !== action.payload.spotRuleFilterID
      );
    },
    resetSelectedSpotRuleFilters: (state) => {
      state.selectedSpotRulesFilter =
        initialFiltersState.selectedSpotRulesFilter;
    },
    handleValueRuleFilter(
      state,
      action: PayloadAction<{
        rule: PLACE_RULES_ENUM;
        value: string;
      }>
    ) {
      const { value, rule } = action.payload;
      const selectedOptions = state.selectedValuesSpotRulesFilter.find(
        (r) => r.rule == action.payload.rule
      );
      if (!selectedOptions) {
        const shouldBeArrayValue = [
          PLACE_RULES_ENUM.PRIVACY_POLICY,
        ];
        const currentValue = shouldBeArrayValue.includes(rule)
          ? [value]
          : value;
        state.selectedValuesSpotRulesFilter.push({
          rule,
          value: currentValue,
        });
      } else if (Array.isArray(selectedOptions.value)) {
        if (selectedOptions.value.length) {
          selectedOptions.value.includes(value)
            ? (selectedOptions.value = selectedOptions.value.filter(
                (opt) => opt !== value
              ))
            : selectedOptions.value.push(value);
        } else {
          selectedOptions.value = [value];
        }
      } else if (selectedOptions?.value) {
        selectedOptions.value = value;
      }
    },

    // ----------------
    // Spot amount of people filters
    selectSpotAmountPeopleFilter: (
      state,
      action: PayloadAction<{ spotAmountPeopleFilterID: number }>
    ) => {
      state.selectedSpotAmountPeopleFilter =
        action.payload.spotAmountPeopleFilterID;
    },
    removeSpotAmountPeopleFilter: (state) => {
      state.selectedSpotAmountPeopleFilter = null;
    },

    // ----------------
    // Spot known for filters
    selectSpotKnownForFilter: (
      state,
      action: PayloadAction<{ spotKnownForFilterID: number }>
    ) => {
      state.selectedSpotKnownForFilter = [
        ...state.selectedSpotKnownForFilter,
        action.payload.spotKnownForFilterID,
      ];
    },
    removeSpotKnownForFilter: (
      state,
      action: PayloadAction<{ spotKnownForFilterID: number }>
    ) => {
      if (!state.selectedSpotKnownForFilter.length) return;

      state.selectedSpotKnownForFilter =
        state.selectedSpotKnownForFilter.filter(
          (id) => id !== action.payload.spotKnownForFilterID
        );
    },
    resetSpotKnownForFilters: (state) => {
      state.selectedSpotKnownForFilter =
        initialFiltersState.selectedSpotKnownForFilter;
    },
  },
});

export const {
  selectMindsetFilter,
  removeMindsetFilter,
  resetMindsetlaceFilters,
  selectSpotTypeFilter,
  removeSpotTypeFilter,
  resetSelectedSpotTypeFilters,
  selectCommodityFilter,
  removeCommodityFilter,
  resetSelectedCommodityFilters,
  handleValueCommodityFilter,
  resetValueCommidityFilters,
  selectSpotRuleFilter,
  removeSpotRuleFilter,
  handleValueRuleFilter,
  resetSelectedSpotRuleFilters,
  selectSpotAmountPeopleFilter,
  removeSpotAmountPeopleFilter,
  removeSpotKnownForFilter,
  selectSpotKnownForFilter,
  resetSpotKnownForFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
