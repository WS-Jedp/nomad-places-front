import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Place } from '../../../../models/places'

export interface PlacesState {
    currentPlace?: Place | null
    nearPlaces: Place[]
}


const initialPlaceState: PlacesState = {
    currentPlace: null,
    nearPlaces: []
}

export const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlaceState,
    reducers: {
        setPlace: (state, action: PayloadAction<{ place: Place }>) => {
            state.currentPlace = action.payload.place
        },
        findPlace: (state, action: PayloadAction<{ placeID: string }>) => {
            if(!state.nearPlaces.length) return

            state.currentPlace = state.nearPlaces.find(place => place.id === action.payload.placeID) 
        },
        resetPlace: (state) => {
            state.currentPlace = null
        },
        // Near places reducers
        setNearPlaces: (state, action: PayloadAction<{ places: Place[] }>) => {
            state.nearPlaces = action.payload.places
        },
        resetNearPlaces: (state) => {
            state.nearPlaces = []
        }
    },
})


export const { 
    findPlace, setPlace, resetPlace,
    setNearPlaces, resetNearPlaces
} = placesSlice.actions 

export default placesSlice.reducer