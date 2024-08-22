import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Geolocation } from "@capacitor/geolocation";

import { Person, User } from "../../../../models/user";
import { GeoLocation } from "../../../../models/location";
import { LoginDTO, RegisterUserRequestDTO } from "../../../../dto/auth";
import { AuthServices } from "../../../../services/auth";
import { ProfileDTO, UpdatePersonalInformationDTO } from "../../../../dto/user";
import { TOKEN_KEY } from "../../../../common/constants/localstorage";
import { ControlledError } from "../../../../common/controlledError";
import { ControlledErrorType } from "../../../../common/controlledError/types";
import { SocialServices } from "../../../../services/social";
import { UserFollowRequest } from "../../../../models/userFollowRequest";

export interface UserState {
  userData?: User;
  auth: {
    isAuth: boolean;
    token: string | null;
    roles: string[];
    modal: boolean;
  };
  location: Partial<GeoLocation>;
  zoomInMap: number;
  errors: ControlledError[];
}

const initialUserState: UserState = {
  userData: undefined,
  location: {
    latitude: undefined,
    longitude: undefined,
  },
  zoomInMap: 14,
  auth: {
    isAuth: false,
    token: null,
    roles: [],
    modal: false,
  },
  errors: [],
};

export const getUserGeoLocation = createAsyncThunk<GeoLocation | null, void>(
  "user/getGeoLocation",
  async (param, thunkApi) => {
    const { coords } = await Geolocation.getCurrentPosition();
    if (!coords) return null;
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  }
);
export const getUserData = createAsyncThunk<
  ProfileDTO | ControlledError,
  { token: string }
>("user/getUserData", async (params) => {
  const authServices = new AuthServices();
  const user = await authServices
    .getPersonFromUser({ token: params.token })
    .catch((err) => {
      return new ControlledError(err.message, ControlledErrorType.REQUEST, err);
    });
  return user;
});

export const getPersonInformation = createAsyncThunk<
  User["personalInformation"],
  { token: string }
>("user/getPersonInformation", async (params, thunkApi) => {
  const authServices = new AuthServices();
  const person = await authServices.getPersonFromUser({ token: params.token });
  return person.person;
});

export const authUser = createAsyncThunk<
  LoginDTO,
  { username: string; password: string }
>("user/authUser", async (params, thunkApi) => {
  const authServices = new AuthServices();
  const user = await authServices.login({
    emailOrUsername: params.username,
    password: params.password,
  });
  const token = user.access_token;
  localStorage.setItem(TOKEN_KEY, token);
  return user;
});

export const registerUser = createAsyncThunk<
  LoginDTO,
  { payload: RegisterUserRequestDTO }
>("user/registerUser", async ({ payload }, thunkApi) => {
  const authServices = new AuthServices();
  const user = await authServices.register(payload);
  await thunkApi.dispatch(
    authUser({
      username: payload.userData.username,
      password: payload.userData.password,
    })
  );
  localStorage.setItem(TOKEN_KEY, user.access_token);
  return user;
});

export const updateUserInformation = createAsyncThunk<
  {
    data: {
      user: User;
      person: Person;
    };
  },
  { payload: UpdatePersonalInformationDTO }
>("user/updateUserInformation", async ({ payload }, thunkApi) => {
  const authServices = new AuthServices();
  const state = thunkApi.getState() as { user: UserState };
  if (!state.user.auth.token) {
    throw new Error("Token not found");
  }
  const user = await authServices.updateUserInformation({
    payload,
    token: state.user.auth.token,
  });
  return user;
});

// Social methods
export const acceptFollowRequest = createAsyncThunk<
  {
    request: UserFollowRequest
  },
  { requestID: string }
>("user/acceptFollowRequest", async ({ requestID }, thunkApi) => {
  const state = thunkApi.getState() as { user: UserState };
  if (!state.user.auth.token) {
    throw new Error("Token not found");
  }
  const socialServices = new SocialServices();
  const request = await socialServices.acceptFollowRequest({
    requestID,
    token: state.user.auth.token,
  });
  return {
    request
  }
});

export const rejectFollowRequest = createAsyncThunk<
  {
    request: UserFollowRequest
  },
  { requestID: string }
>("user/rejectFollowRequest", async ({ requestID }, thunkApi) => {
  const state = thunkApi.getState() as { user: UserState };
  if (!state.user.auth.token) {
    throw new Error("Token not found");
  }
  const socialServices = new SocialServices();
  const request = await socialServices.rejectFollowRequest({
    requestID,
    token: state.user.auth.token,
  });
  return {
    request
  }
});

export const removeUserFollower = createAsyncThunk<
  {
    followers: string[]
  },
  { userToRemoveID: string }
>("user/removeUserFollower", async ({ userToRemoveID }, thunkApi) => {
  const state = thunkApi.getState() as { user: UserState };
  if (!state.user.auth.token) {
    throw new Error("Token not found");
  }
  const socialServices = new SocialServices();
  const followers = await socialServices.removeFollower({
    userToRemoveID,
    token: state.user.auth.token,
  });
  return {
    followers
  }
});

export const unfollowUser = createAsyncThunk<
  {
    following: string[]
  },
  { userToUnfollowID: string }
>("user/unfollowerUser", async ({ userToUnfollowID }, thunkApi) => {
  const state = thunkApi.getState() as { user: UserState };
  if (!state.user.auth.token) {
    throw new Error("Token not found");
  }
  const socialServices = new SocialServices();
  const following = await socialServices.unfollowUser({
    userToUnfollowID,
    token: state.user.auth.token,
  });
  return {
    following
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserGeoLocation(
      state,
      action: PayloadAction<{ coordinates: GeoLocation }>
    ) {
      state.location = action.payload.coordinates;
    },
    resetGeoLocation(state) {
      state.location = {
        latitude: undefined,
        longitude: undefined,
      };
    },
    setUserPersonalInformation(
      state,
      action: PayloadAction<{ personalInformation: Person }>
    ) {
      if (state.userData) {
        state.userData.personalInformation = action.payload.personalInformation;
      }
    },
    updateUserPersonalInformation(
      state,
      action: PayloadAction<{
        personalInformation: Omit<Person, "id">;
        profilePicture?: string;
      }>
    ) {
      if (state.userData) {
        state.userData!.personalInformation = {
          id: state.userData.personalInformation.id,
          ...action.payload.personalInformation,
        };
        state.userData!.profilePicture = action.payload.profilePicture;
      }
    },
    updateProfilePicture(
      state,
      action: PayloadAction<{ profilePicture: User["profilePicture"] }>
    ) {
      if (state.userData) {
        state.userData.profilePicture = action.payload.profilePicture;
      }
    },
    logout(state) {
      state.auth.isAuth = false;
      state.auth.token = null;
      state.auth.roles = [];
      state.userData = undefined;
      localStorage.removeItem(TOKEN_KEY);
    },
    resetErros: (state) => {
      state.errors = [];
    },
    removeError: (state, action: PayloadAction<{ error: ControlledError }>) => {
      const index = state.errors.findIndex(
        (err) => err.message === action.payload.error.message
      );
      if (index !== -1) {
        state.errors.splice(index, 1);
      }
    },
    setZoomMap(state, action: PayloadAction<{ zoom: number }>) {
      state.zoomInMap = action.payload.zoom;
    },
    showAuthModal(state) {
      state.auth.modal = true;
    },
    hideAuthModal(state) {
      state.auth.modal = false;
    },
    addPointsToUser(state, action: PayloadAction<{ points: number }>) {
      if (!state.userData) return;
      state.userData.gamification.points += action.payload.points;
    },
    setPointsToUser(state, action: PayloadAction<{ points: number }>) {
      if (!state.userData) return;
      state.userData.gamification.points = action.payload.points;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserGeoLocation.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.location = action.payload;
    });

    // get person information
    builder.addCase(getPersonInformation.fulfilled, (state, action) => {
      if (!state.userData) return;
      state.userData.personalInformation = action.payload;
    });

    // Auth user
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.userData = {
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        personalInformation: {
          id: action.payload.user.personID,
          firstName: action.payload.user.firstName,
        },
        followers: action.payload.user.followers || [],
        following: action.payload.user.following || [],
        gamification: {
          points: action.payload.user.gamification.points || 0,
        },
      };
      state.auth.token = action.payload.access_token;
      state.auth.isAuth = true;
      state.auth.roles = [];
    });

    // Update user information
    builder.addCase(updateUserInformation.fulfilled, (state, action) => {
      if (!state.userData) {
        state.errors.push(
          new ControlledError("User not found", ControlledErrorType.REQUEST)
        );
        return;
      }

      state.userData = {
        ...action.payload.data.user,
        personalInformation: action.payload.data.person,
      };
    });
    builder.addCase(updateUserInformation.rejected, (state, action) => {
      if (action.payload instanceof ControlledError) {
        state.errors.push(action.payload);
        return;
      }
      state.errors.push(
        new ControlledError(
          "An error occurred while updating user information",
          ControlledErrorType.REQUEST
        )
      );
    });

    // Register user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userData = {
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        personalInformation: {
          id: action.payload.user.personID,
          firstName: action.payload.user.firstName,
        },
        followers: [],
        following: [],
        confirmedPlacesIDs: action.payload.user.confirmedPlacesIDs,
        discoveredPlacesIDs: action.payload.user.discoveredPlacesIDs,
        createdDate: action.payload.user.createdDate,
        gamification: {
          points: action.payload.user.gamification.points || 0
        }
      };
      state.auth.token = action.payload.access_token;
      state.auth.isAuth = true;
      state.auth.roles = [];
    });

    // Get user data
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (action.payload instanceof ControlledError) {
        state.errors.push(action.payload);
        return;
      }

      state.userData = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        followers: action.payload.followers || [],
        following: action.payload.following || [],
        confirmedPlacesIDs: action.payload.confirmedPlacesIDs || [],
        discoveredPlacesIDs: action.payload.discoveredPlacesIDs || [],
        visitedPlacesIDs: action.payload.visitedPlacesIDs || [],
        createdDate: action.payload.createdDate,
        profilePicture: action.payload.profilePicture,
        personalInformation: {
          ...action.payload.person,
        },
        gamification: {
          points: action.payload.gamification.points || 0
        }
      };
      state.auth.token = localStorage.getItem(TOKEN_KEY);
      state.auth.isAuth = true;
      state.auth.roles = [];
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      if (action.payload instanceof ControlledError) {
        state.errors.push(action.payload);
        return;
      }

      state.auth.isAuth = false;
      state.auth.token = null;
      state.auth.roles = [];
      state.userData = undefined;
      localStorage.removeItem(TOKEN_KEY);
    });

    // Social methods
    builder.addCase(acceptFollowRequest.fulfilled, (state, action) => {
      if (!state.userData) return;
      state.userData.following?.push(action.payload.request.senderID);
    });

    builder.addCase(removeUserFollower.fulfilled, (state, action) => {
      if (!state.userData) return;
      state.userData.followers = action.payload.followers;
    });

    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      if (!state.userData) return;
      state.userData.following = action.payload.following;
    });
  },
});

export const {
  setUserGeoLocation,
  resetGeoLocation,
  setZoomMap,
  updateUserPersonalInformation,
  setUserPersonalInformation,
  showAuthModal,
  hideAuthModal,
  resetErros,
  removeError,
  logout,
  addPointsToUser,
  setPointsToUser,
  updateProfilePicture
} = userSlice.actions;

export default userSlice.reducer;
