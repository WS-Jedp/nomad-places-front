import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { PlaceSession, PlaceSessionActionDataPayload, PlaceSessionCachedDataDTO, PLACE_SESSION_ACTIONS_ENUM, UPDATE_ACTIONS } from "../../../../models/session";
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
        if(state.currentSessionActions.find(act => act.id === action.payload.action.id)) return

        state.currentSessionActions.push(action.payload.action)
    },
    addMultipleActionsToCurrentSession(state, action: PayloadAction<PlaceSessionAction[]>) {
        action.payload.forEach(currAction => {
            if(!state.currentSessionActions.find(act => act.id === currAction.id)) {
                state.currentSessionActions.push(currAction)
                if(currAction.type === PLACE_SESSION_ACTIONS_ENUM.UPDATE) {
                    const cachedSession = state.cachedSession
                    if(cachedSession) {
                        cachedSession.lastActions.push(currAction)

                        const payload = JSON.parse(currAction.payload) as PlaceSessionActionDataPayload['UPDATE']

                        switch (payload.type) {
                            case UPDATE_ACTIONS.PLACE_MINDSET:
                                const currMindsetAction = cachedSession.bestMindsetTo.find(opt => opt.mindset === payload.data.data)
                                if(currMindsetAction) {
                                    currMindsetAction.actions.push(currAction)
                                }
                                return
                            case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
                                const amountPeopleData = payload.data.data as { amount: string }
                                const currAmountPeople = cachedSession.amountOfPeople.find(opt => opt.amount === amountPeopleData.amount)
                                if(currAmountPeople) {
                                    currAmountPeople.actions.push(currAction)
                                }
                                break
                            case UPDATE_ACTIONS.PLACE_STATUS:
                                const statusData = payload.data.data as { type: string } 
                                const currPlaceStatus = cachedSession.placeStatus.find(opt => opt.type === statusData.type)
                                if(currPlaceStatus) {
                                    currPlaceStatus.actions.push(currAction)
                                }
                                break
                        }
                    }
                }
            }
        })
    },
    // Cached session methods
    addUserIntoCachedSession(state, action: PayloadAction<{ userID: string }>) {

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpotCachedSession.fulfilled, (state, action) => {
        state.cachedSession = action.payload
        state.currentSessionActions = action.payload?.lastActions || []
    });
  }
});

export const {
    resetCachedSession,
    addActionToCurrentSession, addMultipleActionsToCurrentSession
} = SpotSessionSlice.actions;

export default SpotSessionSlice.reducer;
