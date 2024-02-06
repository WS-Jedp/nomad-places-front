import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ControlledError } from "../../../../common/controlledError";
import { getAllPlaces, getNearestPlaces } from "../places";
import { ControlledErrorType } from "../../../../common/controlledError/types";
import { authUser, getUserData, getUserGeoLocation, registerUser } from "../user";

export interface AppControlledErrorsState {
  errors: ControlledError[];
  displayedErrors: string[];
  alerts: ControlledError[];
  displayedAlerts: string[];
}

const initialControlledErrors: AppControlledErrorsState = {
  errors: [],
  displayedErrors: [],
  alerts: [],
  displayedAlerts: [],
};

export const controlledErrorsSlice = createSlice({
  name: "controlledErrors",
  initialState: initialControlledErrors,
  reducers: {
    addError(state, action: PayloadAction<ControlledError>) {
      state.errors.push(action.payload);
    },
    removeError(state, action: PayloadAction<string>) {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    },
    addDisplayedError(state, action: PayloadAction<string>) {
      state.displayedErrors.push(action.payload);
    },
    resetDisplayedErrors(state) {
      state.displayedErrors = [];
    },
    addAlert(state, action: PayloadAction<ControlledError>) {
      state.alerts.push(action.payload);
    },
    removeAlert(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
    addDisplayedAlert(state, action: PayloadAction<string>) {
      state.displayedAlerts.push(action.payload);
    },
    resetDisplayedAlerts(state) {
      state.displayedAlerts = [];
    },
  },
  extraReducers: (builder) => {
    // =======================
    // === Handling Errors ===
    builder.addCase(getNearestPlaces.rejected, (state, action) => {
      state.errors.push(
        new ControlledError(
          action.error.message || "Unknown Error",
          ControlledErrorType.REQUEST
        )
      );
    });
    builder.addCase(getAllPlaces.rejected, (state, action) => {
      state.errors.push(
        new ControlledError(
          action.error.message || "Unknown Error",
          ControlledErrorType.REQUEST
        )
      );
    });
    builder.addCase(getUserGeoLocation.rejected, (state, action) => {
      state.errors.push(
        new ControlledError(
          action.error.message || "Error getting your current location",
          ControlledErrorType.FRONTEND_SYSTEM
        )
      );
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.errors.push(
        new ControlledError(
          action.error.message || "Error authenticating user",
          ControlledErrorType.REQUEST
        )
      );
    })

    // =======================
    // === Handling Alerts ===
    builder.addCase(getUserData.rejected, (state, action) => {
      state.alerts.push(
        new ControlledError(
          action.error.message || "Error getting user data",
          ControlledErrorType.FRONTEND_SYSTEM
        )
      );
    })
  },
});

export const {
  addError,
  removeError,
  addDisplayedError,
  resetDisplayedErrors,
  addAlert,
  addDisplayedAlert,
  removeAlert,
  resetDisplayedAlerts,
} = controlledErrorsSlice.actions;

export default controlledErrorsSlice.reducer;
