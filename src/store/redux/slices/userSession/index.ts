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
    createSocket(state, action: PayloadAction<{ userID: string, placeID: string, username: string  }>) {
        if(state.socket) return
        state.socket = new UserSessionSocket({ 
                placeID: action.payload.placeID,
                userID: action.payload.userID,
                username: action.payload.username 
            })
    },
    deleteSocket(state) {
        state.socket = null
    },
  },
});



export const {
    createSocket, deleteSocket
} = UserSessionSlice.actions;

export default UserSessionSlice.reducer;
