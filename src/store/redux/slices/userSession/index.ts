import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserSessionSocket } from "../../../../socket/UserSesssionSocket";
import { getSpotCachedSession } from "../spotSession";
import { UserLastSession } from "../../../../dto/session";
import { RootState } from "../..";
import { SpotSessionServices } from "../../../../services/spotSession";

export interface UserSessionState {
    socket: UserSessionSocket | null;
    sessionID: string | null;
    inSession: boolean;
    placeID: string | null;
}

const initialUserSessionState: UserSessionState = {
    socket: null,
    sessionID: null,
    inSession: false,
    placeID: null
};

export const getUserLastSession = createAsyncThunk<
    UserLastSession,
    { token: string },
    {
        state: RootState;
    }
>("userSession/getUserLastSession", async (params) => {
    try {
        const userLastSession = await new SpotSessionServices().getUserLastSession(params.token);
        return userLastSession;
    } catch (error) {
        throw new Error(String(error));
    }
})

export const UserSessionSlice = createSlice({
  name: "userSession",
  initialState: initialUserSessionState,
  reducers: {
    createSocket(state, action: PayloadAction<{ userID: string, placeID: string, username: string, quickJoin?: boolean }>) {
        if(state.socket && action.payload.quickJoin) {
            state.socket.quickJoinSesssion()
            return
        }
        state.socket = new UserSessionSocket({ 
                placeID: action.payload.placeID,
                userID: action.payload.userID,
                username: action.payload.username 
            })

            if(action.payload.quickJoin) {
                state.socket.quickJoinSesssion()
            }
    },
    deleteSocket(state) {
        state.socket = null
    },
    userJoinedSession(state, action: PayloadAction<{ sessionID: string }>) {
        state.sessionID = action.payload.sessionID
    },
    addUserIntoSession(state, action: PayloadAction<{ sessionID: string }>) {
        state.sessionID = action.payload.sessionID
    },
    userLeftSession(state) {
        state.sessionID = null
    }
  },
  extraReducers(builder) {
    builder.addCase(getSpotCachedSession.fulfilled, (state, action) => {
        state.sessionID = action.payload?.sessionID || null
    })

    builder.addCase(getUserLastSession.fulfilled, (state, action) => {
        state.sessionID = action.payload?.lastSession?.id || null
        state.inSession = action.payload?.inSession || false
        state.placeID = action.payload?.lastSession.placeID || null
    })
    
  },
});



export const {
    createSocket, deleteSocket,
    userJoinedSession, userLeftSession, addUserIntoSession
} = UserSessionSlice.actions;

export default UserSessionSlice.reducer;
