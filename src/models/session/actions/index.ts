import { DAY_TIME_SECTION_ENUM, PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from ".."
import { PLACE_STATUS } from "../../placeStatus"

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

export enum PLACE_SESSION_ACTION_TYPE_ENUM {
    PLACE_AMOUNT_OF_PEOPLE = 'PLACE_AMOUNT_OF_PEOPLE',
    PLACE_MINDSET = 'PLACE_MINDSET',
    PLACE_STATUS = 'PLACE_STATUS',
    PLACE_RECENT_ACTIVITY = 'PLACE_RECENT_ACTIVITY',
}

export const PLACE_SESSION_ACTIONS_TYPE: PLACE_SESSION_ACTION_TYPE_ENUM[] = [
    PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE,
    PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET,
    PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS,
    PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY,
]

export type PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION = {
    id: number,
    amount: string,
    min: number,
    max: number,
}


export type PLACE_STATUS_SESSION_ACTION_OPTION = {
    id: number,
    value: boolean,
    name: string,
    type: PLACE_STATUS,
}