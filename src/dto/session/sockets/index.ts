import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM, UpdateActionData, UPDATE_ACTIONS } from "../../../models/session"
import { PlaceSessionAction } from "../../../models/session/actions"

export interface JoinPlaceSessionRequestDTO {
    placeID: string
    userID: string
    username: string
    currentDateISO: string
}

export interface LeavePlaceSessionRequestDTO {
    placeID: string
    sessionID: string
    userID: string
    username: string
}

export interface PlaceSessionUpdateDTO {
    sessionID: string
    userID: string
    actionType: string
    actionPayload: string
    createdDateISO: string
}

export interface QuickSessionReviewRequestDTO {
    placeID: string
    userID: string
}

export interface PlaceSessionActionUpdateRequestDTO {
    placeID: string,
    sessionID: string;
    userID: string;
    username: string;
    type: PLACE_SESSION_ACTIONS_ENUM;
    data: PlaceSessionActionDataPayload;
    createdDateISO: string;
}

export interface PlaceSessionActionMessageDTO {
    username: string;
    userID: string
    type: PLACE_SESSION_ACTIONS_ENUM
    createdDateISO: string
    sessionID: string
    action: PlaceSessionAction
}

export interface PlaceSessionUpdateMultipleActionsRequestDTO {
    placeID: string,
    sessionID: string,
    userID: string,
    username: string,
    actions: {
      type: UPDATE_ACTIONS,
      data: UpdateActionData
    }[],
    createdDateISO: string
}