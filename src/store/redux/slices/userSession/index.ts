import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserSessionSocket } from "../../../../socket/UserSesssionSocket";

export interface UserSessionState {
    socket: UserSessionSocket | null;
    sessionID: string | null;
}

const initialUserSessionState: UserSessionState = {
    socket: null,
    sessionID: null
};

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
});



export const {
    createSocket, deleteSocket,
    userJoinedSession, userLeftSession, addUserIntoSession
} = UserSessionSlice.actions;

export default UserSessionSlice.reducer;
