import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  PlaceWithCachedSession,
} from "../../../../models/session";
import placesServices from "../../../../services/places";
import { RootState } from "../..";
import { placeWithQuickSessionDTOIntoPlaceWithCachedSession } from "../../../../dto/places/helpers";

export const getNearestPlaces = createAsyncThunk<
    PlaceWithCachedSession[] | null,
  { maxDistance?: number } | undefined,
  {
    state: RootState;
  }
>("places/getNearestPlaces", async (params, thunkAPI) => {
  try {
    const userCoords = thunkAPI.getState().user.location;
    if (!userCoords.latitude || !userCoords.longitude) return null;
    const nearPlacesWithCachedSessionDTO = await placesServices.getNearestPlaces({
      lng: userCoords.longitude,
      lte: userCoords.latitude,
      maxDistance: params?.maxDistance ? params.maxDistance : 10000,
    });
  
    const placesWithSessionData = placeWithQuickSessionDTOIntoPlaceWithCachedSession(nearPlacesWithCachedSessionDTO.placesWithQuickSessionData)
    return placesWithSessionData;
  } catch (error) {
    throw new Error(String(error))
    return null
  }
});

export const getAllPlaces = createAsyncThunk<
PlaceWithCachedSession[] | null>("places/getAllPlaces", async (params, thunkAPI) => {
  try {
    const allPlacesWithCachedSession = await placesServices.getAllPlacesWithCachedSession();
    const placesWithSessionData = placeWithQuickSessionDTOIntoPlaceWithCachedSession(allPlacesWithCachedSession.placesWithQuickSessionData)
    return placesWithSessionData;
  } catch (error) {
    throw new Error(String(error))
    return null
  }
})


export interface PlacesState {
  currentPlace?: PlaceWithCachedSession | null;
  nearPlaces: PlaceWithCachedSession[];
  filteredPlaces: PlaceWithCachedSession[];
  placeOnFocus?: string;
}

const initialPlaceState: PlacesState = {
  currentPlace: null,
  nearPlaces: [],
  filteredPlaces: [],
  placeOnFocus: undefined
};

export const placesSlice = createSlice({
  name: "places",
  initialState: initialPlaceState,
  reducers: {
    setPlace: (
      state,
      action: PayloadAction<{ placeWithCacheData: PlaceWithCachedSession }>
    ) => {
      state.currentPlace = action.payload.placeWithCacheData;
    },
    findPlace: (state, action: PayloadAction<{ placeID: string }>) => {
      if (!state.nearPlaces.length) return;

      state.currentPlace = state.nearPlaces.find(
        (place) => place.id === action.payload.placeID
      );
    },
    resetPlace: (state) => {
      state.currentPlace = null;
    },
    // Near places reducers
    setNearPlaces: (
      state,
      action: PayloadAction<{ places: PlaceWithCachedSession[] }>
    ) => {
      state.nearPlaces = action.payload.places;
    },
    resetNearPlaces: (state) => {
      state.nearPlaces = [];
    },
    setPlaceOnFocus(state, action: PayloadAction<string>) {
      state.placeOnFocus = action.payload;
    },
    resetPlaceOnFocus(state) {
      state.placeOnFocus = undefined;
    },
    setFilteredPlaces(state, action: PayloadAction<PlaceWithCachedSession[]>) {
      state.filteredPlaces = action.payload
    },
    resetFilteredPlaces(state) {
      state.filteredPlaces = state.nearPlaces
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNearestPlaces.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.nearPlaces = action.payload;
    });
    builder.addCase(getAllPlaces.fulfilled, (state, action) => {
      if(!action.payload) return;
      state.nearPlaces = action.payload;
      state.filteredPlaces = action.payload
    });
    builder.addCase(getAllPlaces.rejected, (state, err) => {
      state.nearPlaces = []
      state.filteredPlaces = []
    })
  },
});



export const {
  findPlace,
  setPlace,
  resetPlace,
  setNearPlaces,
  resetNearPlaces,
  resetPlaceOnFocus,
  setPlaceOnFocus,
  setFilteredPlaces,
  resetFilteredPlaces,
} = placesSlice.actions;

export default placesSlice.reducer;
