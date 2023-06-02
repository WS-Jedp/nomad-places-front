import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from "../../../models/session"

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
    type: PLACE_SESSION_ACTIONS_ENUM;
    data: PlaceSessionActionDataPayload;
    createdDateISO: string;
}