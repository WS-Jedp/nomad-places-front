import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { PlaceSessionCachedDataDTO } from "../../../../models/session";
import { PlaceSessionAction } from "../../../../models/session/actions";
import SpotSessionServices from "../../../../services/spotSession";
import { RootState } from "../..";

export interface SpotSessionState {
    sessionID: string | null;
    cachedSession: PlaceSessionCachedDataDTO | null;
    currentSessionActions: PlaceSessionAction[];
}

export const getSpotCachedSession = createAsyncThunk<
    PlaceSessionCachedDataDTO | null,
    { spotID: string },
    {   state: RootState }
>("spotSession/getSpotCurrentSession", async (params, thunkAPI) => {
    const spotSession = await SpotSessionServices.getSpotCachedSession(params.spotID)
    return spotSession
});

const initialUserSessionState: SpotSessionState = {
    cachedSession: null,
    sessionID: null,
    currentSessionActions: []
};

export const SpotSessionSlice = createSlice({
  name: "spotSession",
  initialState: initialUserSessionState,
  reducers: {
    resetCachedSession(state) {
        state.cachedSession = null
    },
    addActionToCurrentSession(state, action: PayloadAction<{ action: PlaceSessionAction }>) {
        console.log(action,'THIS IS THE JOIN ACTION')
        if(state.currentSessionActions.find(act => act.id === action.payload.action.id)) return

        state.currentSessionActions.push(action.payload.action)
    },
    addMultipleActionsToCurrentSession(state, action: PayloadAction<PlaceSessionAction[]>) {
        action.payload.forEach(currAction => {
            if(!state.currentSessionActions.find(act => act.id === currAction.id)) {
                state.currentSessionActions.push(currAction)
            }
        })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSpotCachedSession.fulfilled, (state, action) => {
        state.cachedSession = action.payload
        state.currentSessionActions = action.payload?.actions || []
    });
  }
});

export const {
    resetCachedSession,
    addActionToCurrentSession, addMultipleActionsToCurrentSession
} = SpotSessionSlice.actions;

export default SpotSessionSlice.reducer;
