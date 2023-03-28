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
  const userCoords = thunkAPI.getState().user.location;
  if (!userCoords.latitude || !userCoords.longitude) return null;
  const nearPlacesWithCachedSessionDTO = await placesServices.getNearestPlaces({
    lng: userCoords.longitude,
    lte: userCoords.latitude,
    maxDistance: params?.maxDistance ? params.maxDistance : 10000,
  });

  const placesWithSessionData = placeWithQuickSessionDTOIntoPlaceWithCachedSession(nearPlacesWithCachedSessionDTO.placesWithQuickSessionData)
  return placesWithSessionData;
});


export interface PlacesState {
  currentPlace?: PlaceWithCachedSession | null;
  nearPlaces: PlaceWithCachedSession[];
}

const initialPlaceState: PlacesState = {
  currentPlace: null,
  nearPlaces: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getNearestPlaces.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.nearPlaces = action.payload;
    });
  },
});



export const {
  findPlace,
  setPlace,
  resetPlace,
  setNearPlaces,
  resetNearPlaces,
} = placesSlice.actions;

export default placesSlice.reducer;
