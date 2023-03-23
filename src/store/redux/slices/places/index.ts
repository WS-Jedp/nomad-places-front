import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Place } from '../../../../models/places'
import { PlacesWithQuickSessionDataDTO } from '../../../../dto/places'
import { PlaceSessionCachedDataDTO, placeWithCachedSession } from '../../../../models/session'
import places from '../../../../services/places'

export interface PlacesState {
    currentPlace?: placeWithCachedSession | null
    nearPlaces: placeWithCachedSession[]
}


const initialPlaceState: PlacesState = {
    currentPlace: null,
    nearPlaces: []
}

export const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlaceState,
    reducers: {
        setPlace: (state, action: PayloadAction<{ placeWithCacheData: placeWithCachedSession }>) => {
            state.currentPlace = action.payload.placeWithCacheData
        },
        findPlace: (state, action: PayloadAction<{ placeID: string }>) => {
            if(!state.nearPlaces.length) return

            state.currentPlace = state.nearPlaces.find(place => place.id === action.payload.placeID) 
        },
        resetPlace: (state) => {
            state.currentPlace = null
        },
        // Near places reducers
        setNearPlaces: (state, action: PayloadAction<{ places: placeWithCachedSession[] }>) => {
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