import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PlaceFilter } from '../../../../models/filters'
import { MINDSETS } from '../../../../models/mindsets'

export interface FiltersState {
    nearPlacesFilter: PlaceFilter[]
    selectedNearPlacesFilter: Number[]
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
]

const initialFiltersState: FiltersState = {
    nearPlacesFilter: mindsetsFilters,
    selectedNearPlacesFilter: mindsetsFilters.map(filter => filter.id)
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        selectNearPlaceFilter: (state, action: PayloadAction<{ placeFilterID: number }>) => {
            state.selectedNearPlacesFilter = [...state.selectedNearPlacesFilter, action.payload.placeFilterID]
        },
        removeNearPlaceFilter: (state, action: PayloadAction<{ placeFilterID: number }>) => {
            if(!state.selectedNearPlacesFilter.length) return

            state.selectedNearPlacesFilter = state.selectedNearPlacesFilter.filter(id => id !== action.payload.placeFilterID)
        },
        resetSelectedNearPlaceFilters: (state) => {
            state.selectedNearPlacesFilter = initialFiltersState.selectedNearPlacesFilter
        },
    },
})


export const { 
    selectNearPlaceFilter, removeNearPlaceFilter, resetSelectedNearPlaceFilters,
} = filtersSlice.actions 

export default filtersSlice.reducer