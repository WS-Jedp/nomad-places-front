import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PLACE_SESSION_ACTIONS_ENUM } from '../../../../../models/session'
import { PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION, PLACE_SESSION_ACTIONS_TYPE, PLACE_SESSION_ACTION_TYPE_ENUM, PLACE_STATUS_SESSION_ACTION_OPTION } from '../../../../../models/session/actions'
import { MINDSETS } from '../../../../../models/mindsets'

export interface SessionActionsState {
    sessionActions: PLACE_SESSION_ACTION_TYPE_ENUM[]
    sessionMindsetAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET,
        payload: MINDSETS | null
    },
    sessionAmountOfPeopleAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE,
        payload: PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION | null
    },
    sessionPlaceStatusAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS,
        payload: PLACE_STATUS_SESSION_ACTION_OPTION | null
    },
    sessionRecentActivityAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY,
        payload: File | null
    },
}



const initialSessionActionsState: SessionActionsState = {
    sessionActions: PLACE_SESSION_ACTIONS_TYPE,
    sessionMindsetAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET,
        payload: null
    },
    sessionAmountOfPeopleAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE,
        payload: null
    },
    sessionPlaceStatusAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS,
        payload: null
    },
    sessionRecentActivityAction: {
        type: PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY,
        payload: null
    },
}

export const sessionActionsState = createSlice({
    name: 'filters',
    initialState: initialSessionActionsState,
    reducers: {
        // Mindset in the session
        updateSessionMindset: (state, action: PayloadAction<{ mindset: MINDSETS }>) => {
            state.sessionMindsetAction.payload = action.payload.mindset
        },
        resetSessionMindset: (state) => {
            state.sessionMindsetAction.payload = null
        },

        // Amount of people in the session
        updateSessionAmountOfPeople: (state, action: PayloadAction<{ amountOfPeople: PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION }>) => {
            state.sessionAmountOfPeopleAction.payload = action.payload.amountOfPeople
        },
        resetSessionAmountOfPeople: (state) => {
            state.sessionAmountOfPeopleAction.payload = null
        },

        // Place status in the session
        updateSessionPlaceStatus: (state, action: PayloadAction<{ placeStatus: PLACE_STATUS_SESSION_ACTION_OPTION }>) => {
            state.sessionPlaceStatusAction.payload = action.payload.placeStatus
        },
        resetSessionPlaceStatus: (state) => {
            state.sessionPlaceStatusAction.payload = null
        },

        // Recent activity in the session
        updateSessionRecentActivity: (state, action: PayloadAction<{ recentActivity: File }>) => {
            state.sessionRecentActivityAction.payload = action.payload.recentActivity
        },
        resetSessionRecentActivity: (state) => {
            state.sessionRecentActivityAction.payload = null
        },

        // Reset all session actions
        resetSessionActions: (state) => {
            state.sessionMindsetAction.payload = null
            state.sessionAmountOfPeopleAction.payload = null
            state.sessionPlaceStatusAction.payload = null
            state.sessionRecentActivityAction.payload = null
        }
    },
})


export const { 
    updateSessionMindset, resetSessionMindset,
    updateSessionAmountOfPeople, resetSessionAmountOfPeople,
    updateSessionPlaceStatus, resetSessionPlaceStatus,
    updateSessionRecentActivity, resetSessionRecentActivity,
    resetSessionActions,
} = sessionActionsState.actions

export default sessionActionsState.reducer