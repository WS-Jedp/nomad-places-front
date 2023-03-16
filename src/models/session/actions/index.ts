import { DAY_TIME_SECTION_ENUM, PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from ".."

type PlaceSesssionActionPayload = PlaceSessionActionDataPayload['MESSAGE'] | PlaceSessionActionDataPayload['UPDATE'] | PlaceSessionActionDataPayload['RECENT_ACTIVITY']

export type PlaceSessionAction = {
    id: string
    createdDate: Date
    payload: PlaceSesssionActionPayload
    type: PLACE_SESSION_ACTIONS_ENUM
    dayTimeSection: DAY_TIME_SECTION_ENUM
    placeSessionID: string
    userID: string
}