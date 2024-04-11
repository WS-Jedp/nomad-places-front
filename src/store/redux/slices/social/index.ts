import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserFollowRequest } from "../../../../models/userFollowRequest";
import { SocialServices } from "../../../../services/social";
import { UserState } from "../user";

export interface SocialState {
  followRequests: UserFollowRequest[];
}

const initialSocialState: SocialState = {
  followRequests: [],
};

export const getUserFollowRequests = createAsyncThunk<
    {
        followRequests: UserFollowRequest[];
    }, void
>("social/getUserFollowRequests", async (data, thunkAPI) => {
    const userState = thunkAPI.getState() as { user: UserState };
    const token = userState.user.auth.token

    if(!token) throw new Error("Token not found");

    const socialServices = new SocialServices();
    const followers = await socialServices.getFollowRequests({ token: token });
    return { followRequests: followers };

})

export const socialSlice = createSlice({
    name: "social",
    initialState: initialSocialState,
    reducers: {
        getUserFollowRequests(state, action) {
            state.followRequests = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserFollowRequests.fulfilled, (state, action) => {
            state.followRequests = action.payload.followRequests;
        })
    }
})

export const { getUserFollowRequests: getUserFollowRequestsAction } = socialSlice.actions;

export default socialSlice.reducer;