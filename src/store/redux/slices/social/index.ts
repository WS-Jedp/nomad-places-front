import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOLLOW_REQUEST_STATUS, UserFollowRequest } from "../../../../models/userFollowRequest";
import { SocialServices } from "../../../../services/social";
import { UserState } from "../user";

export interface SocialState {
  followRequests: UserFollowRequest[];
  toFollowRequests: UserFollowRequest[];
}

const initialSocialState: SocialState = {
  followRequests: [],
  toFollowRequests: [],
};

export const getUserFollowRequests = createAsyncThunk<
  {
    followRequests: UserFollowRequest[];
    toFollowRequests: UserFollowRequest[];
  },
  void
>("social/getUserFollowRequests", async (data, thunkAPI) => {
  const userState = thunkAPI.getState() as { user: UserState };
  const token = userState.user.auth.token;

  if (!token) throw new Error("Token not found");

  const socialServices = new SocialServices();
  const socialRequests = await socialServices.getUserSocialRequests({
    token: token,
  });
  return socialRequests;
});

export const toFollowRequest = createAsyncThunk<
    {
        socialRequest: UserFollowRequest;
    },
    { userToFollowID: string }
>("social/toFollowRequest", async (data, thunkAPI) => {
    const userState = thunkAPI.getState() as { user: UserState };
    const token = userState.user.auth.token;

    if (!token) throw new Error("Token not found");

    const socialServices = new SocialServices();
    const socialRequest = await socialServices.sendFollowRequest({
        userToFollowID: data.userToFollowID,
        token: token,
    });

    return {
        socialRequest
    }
})

export const socialSlice = createSlice({
  name: "social",
  initialState: initialSocialState,
  reducers: {
    getUserFollowRequests(state, action) {
      state.followRequests = action.payload;
    },
    socialRequestResponded(state, action: PayloadAction<{ requestID: string }>) {
        state.followRequests = state.followRequests.filter((request) => request.id !== action.payload.requestID);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserFollowRequests.fulfilled, (state, action) => {
      state.followRequests = action.payload.followRequests;
      state.toFollowRequests = action.payload.toFollowRequests;
    });

    builder.addCase(toFollowRequest.fulfilled, (state, action) => {
        state.toFollowRequests.push(action.payload.socialRequest);
    })
  },
});

export const { getUserFollowRequests: getUserFollowRequestsAction, socialRequestResponded } =
  socialSlice.actions;

export default socialSlice.reducer;
