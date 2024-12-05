import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PlaceMindsetsFilter, SpotAmountPeopleFilter, SpotCommoditiesFilters, SpotRulesFilters } from '../../../../models/filters'
import { MINDSETS } from '../../../../models/mindsets'
import { PlaceTypesFilter, PLACE_TYPES } from '../../../../models/placeTypes'
import { PLACE_COMMODITIES_ENUM, PLACE_RULES_ENUM } from '../../../../models/places'

export interface FiltersState {
    spotMindsetFilter: PlaceMindsetsFilter[]
    selectedSpotMindsetFilter: Number[]
    spotTypesFilter: PlaceTypesFilter[]
    selectedSpotTypesFilter: Number[]
    spotCommoditiesFilter: SpotCommoditiesFilters[]
    selectedSpotCommoditiesFilter: Number[]
    spotRulesFilters: SpotRulesFilters[]
    selectedSpotRulesFilter: Number[]
    spotAmountPeopleFilter: SpotAmountPeopleFilter[]
    selectedSpotAmountPeopleFilter: number | null
    spotKnownForFilter: PlaceMindsetsFilter[]
    selectedSpotKnownForFilter: Number[]
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
]

const spotTypesFilters:PlaceTypesFilter[] = [
    {
        id: 1,
        name: PLACE_TYPES.COFFEE,
        title: 'Coffee'
    },
    {
        id: 2,
        name: PLACE_TYPES.LIBRARY,
        title: 'Library'
    },
    // {
    //     id: 3,
    //     name: PLACE_TYPES.LOOKOUT,
    //     title: 'Lookout'
    // },
    {
        id: 4,
        name: PLACE_TYPES.PARK,
        title: 'Park'
    },
    // {
    //     id: 5,
    //     name: PLACE_TYPES.RESTAURANT,
    //     title: 'Restaurant'
    // },
    {
        id: 6,
        name: PLACE_TYPES.ROOFTOP,
        title: 'Rooftop'
    },
    {
        id: 7,
        name: PLACE_TYPES.COWORK_ZONE,
        title: PLACE_TYPES.COWORK_ZONE
    },
]

const spotCommoditiesFilters:SpotCommoditiesFilters[] = [
    {
        id: 1,
        commodity: PLACE_COMMODITIES_ENUM.PUBLIC_WIFI,
        name: 'Public Wifi',
    },
    {
        id: 2,
        commodity: PLACE_COMMODITIES_ENUM.PARKING,
        name: 'Parking',
    },
    {
        id: 3,
        commodity: PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS,
        name: 'Public Plugs',
    },
    {
        id: 4,
        commodity: PLACE_COMMODITIES_ENUM.COWORK_SPACE,
        name: 'Cowork Space',
    },
    {
        id: 5,
        commodity: PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS,
        name: 'Public Bathrooms',
    }
]

const spotRulesFilters: SpotRulesFilters[] = [
    {
        id: 1,
        rule: PLACE_RULES_ENUM.PET_FRIENDLY,
        name: 'Pets allowed',
    },
    {
        id: 2,
        rule: PLACE_RULES_ENUM.SMOKING,
        name: 'Smoking allowed',
    },
    {
        id: 3,
        rule: PLACE_RULES_ENUM.UNDER_AGE,
        name: 'Under age allowed',
    },
]

const spotAmountPeople: SpotAmountPeopleFilter[] = [
    {
        id: 1,
        range: [0, 5],
        text: '0 - 5',
    },
    {
        id: 2,
        range: [5, 10],
        text: '5 - 10',
    },
    {
        id: 3,
        range: [10, 15],
        text: '10 - 15',
    },
    {
        id: 4,
        range: [15, 20],
        text: '15 - 20',
    },
    {
        id: 5,
        range: [20, 25],
        text: '20 - 25',
    },
    {
        id: 6,
        range: [25, 99],
        text: '+25',
    },
]

const initialFiltersState: FiltersState = {
    spotMindsetFilter: mindsetsFilters,
    selectedSpotMindsetFilter: mindsetsFilters.map(filter => filter.id),
    spotTypesFilter: spotTypesFilters,
    selectedSpotTypesFilter: spotTypesFilters.map(filter => filter.id),
    spotCommoditiesFilter: spotCommoditiesFilters,
    selectedSpotCommoditiesFilter: [],
    spotRulesFilters: spotRulesFilters,
    selectedSpotRulesFilter: [],
    spotAmountPeopleFilter: spotAmountPeople,
    selectedSpotAmountPeopleFilter: null,
    selectedSpotKnownForFilter: mindsetsFilters.map(filter => filter.id),
    spotKnownForFilter: mindsetsFilters
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        // ----------------
        // Mindset filters 
        selectMindsetFilter: (state, action: PayloadAction<{ mindsetFilterID: number }>) => {
            state.selectedSpotMindsetFilter = [...state.selectedSpotMindsetFilter, action.payload.mindsetFilterID]
        },
        removeMindsetFilter: (state, action: PayloadAction<{ mindsetFilterID: number }>) => {
            if(!state.selectedSpotMindsetFilter.length) return

            state.selectedSpotMindsetFilter = state.selectedSpotMindsetFilter.filter(id => id !== action.payload.mindsetFilterID)
        },
        resetMindsetlaceFilters: (state) => {
            state.selectedSpotMindsetFilter = initialFiltersState.selectedSpotMindsetFilter
        },
        
        // ----------------
        // Spot type filters
        selectSpotTypeFilter: (state, action: PayloadAction<{ spotTypeFilterID: number }>) => {
            state.selectedSpotTypesFilter = [...state.selectedSpotTypesFilter, action.payload.spotTypeFilterID]
        },
        removeSpotTypeFilter: (state, action: PayloadAction<{ spotTypeFilterID: number }>) => {
            if(!state.selectedSpotTypesFilter.length) return

            state.selectedSpotTypesFilter = state.selectedSpotTypesFilter.filter(id => id !== action.payload.spotTypeFilterID)
        },
        resetSelectedSpotTypeFilters: (state) => {
            state.selectedSpotTypesFilter = initialFiltersState.selectedSpotTypesFilter
        },

        // ----------------
        // Spot commodities filters
        selectCommodityFilter: (state, action: PayloadAction<{ commodityFilterID: number }>) => {
            state.selectedSpotCommoditiesFilter = [...state.selectedSpotCommoditiesFilter, action.payload.commodityFilterID]
        },
        removeCommodityFilter: (state, action: PayloadAction<{ commodityFilterID: number }>) => {
            if(!state.selectedSpotCommoditiesFilter.length) return

            state.selectedSpotCommoditiesFilter = state.selectedSpotCommoditiesFilter.filter(id => id !== action.payload.commodityFilterID)
        },
        resetSelectedCommodityFilters: (state) => {
            state.selectedSpotCommoditiesFilter = initialFiltersState.selectedSpotCommoditiesFilter
        },

        // ----------------
        // Spot rules filters
        selectSpotRuleFilter: (state, action: PayloadAction<{ spotRuleFilterID: number }>) => {
            state.selectedSpotRulesFilter = [...state.selectedSpotRulesFilter, action.payload.spotRuleFilterID]
        },
        removeSpotRuleFilter: (state, action: PayloadAction<{ spotRuleFilterID: number }>) => {
            if(!state.selectedSpotRulesFilter.length) return

            state.selectedSpotRulesFilter = state.selectedSpotRulesFilter.filter(id => id !== action.payload.spotRuleFilterID)
        },
        resetSelectedSpotRuleFilters: (state) => {
            state.selectedSpotRulesFilter = initialFiltersState.selectedSpotRulesFilter
        },

        // ----------------
        // Spot amount of people filters
        selectSpotAmountPeopleFilter: (state, action: PayloadAction<{ spotAmountPeopleFilterID: number }>) => {
            state.selectedSpotAmountPeopleFilter = action.payload.spotAmountPeopleFilterID
        },
        removeSpotAmountPeopleFilter: (state) => {
            state.selectedSpotAmountPeopleFilter = null
        },

        // ----------------
        // Spot known for filters
        selectSpotKnownForFilter: (state, action: PayloadAction<{ spotKnownForFilterID: number }>) => {
            state.selectedSpotKnownForFilter = [...state.selectedSpotKnownForFilter, action.payload.spotKnownForFilterID]
        },
        removeSpotKnownForFilter: (state, action: PayloadAction<{ spotKnownForFilterID: number }>) => {
            if(!state.selectedSpotKnownForFilter.length) return

            state.selectedSpotKnownForFilter = state.selectedSpotKnownForFilter.filter(id => id !== action.payload.spotKnownForFilterID)
        },
        resetSpotKnownForFilters: (state) => {
            state.selectedSpotKnownForFilter = initialFiltersState.selectedSpotKnownForFilter
        }
    },
})


export const { 
    selectMindsetFilter, removeMindsetFilter, resetMindsetlaceFilters,
    selectSpotTypeFilter, removeSpotTypeFilter, resetSelectedSpotTypeFilters,
    selectCommodityFilter, removeCommodityFilter, resetSelectedCommodityFilters,
    selectSpotRuleFilter, removeSpotRuleFilter, resetSelectedSpotRuleFilters,
    selectSpotAmountPeopleFilter, removeSpotAmountPeopleFilter,
    removeSpotKnownForFilter, selectSpotKnownForFilter, resetSpotKnownForFilters
} = filtersSlice.actions 

export default filtersSlice.reducer