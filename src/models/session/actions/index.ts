import { DAY_TIME_SECTION_ENUM, PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from ".."
import { UserRequestDTO } from "../../../dto/user"
import { PLACE_STATUS } from "../../placeStatus"

type PlaceSesssionActionPayload = PlaceSessionActionDataPayload['MESSAGE'] | PlaceSessionActionDataPayload['UPDATE'] | PlaceSessionActionDataPayload['RECENT_ACTIVITY']

export type PlaceSessionAction = {
    id: string
    createdDate: string
    payload: string
    type: PLACE_SESSION_ACTIONS_ENUM
    dayTimeSection: DAY_TIME_SECTION_ENUM
    placeSessionID: string
    user?: UserRequestDTO
    userID: string
    username: string
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
    range: [number, number],
}


export type PLACE_STATUS_SESSION_ACTION_OPTION = {
    id: number,
    value: boolean,
    name: string,
    type: PLACE_STATUS,
}

export const PLACE_AMOUNT_OF_PEOPLE_OPTIONS: PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION[] = [
    {
        id: 0,
        amount: '0-5',
        min: 0,
        max: 5,
        range: [0, 5]
    },
    {
        id: 1,
        amount: '5-10',
        min: 5,
        max: 10,
        range: [5, 10]
    },
    {
        id: 2,
        amount: '10-15',
        min: 10,
        max: 15,
        range: [10, 15]
    },
    {
        id: 3,
        amount: '15-20',
        min: 15,
        max: 20,
        range: [15, 20]
    },
    {
        id: 4,
        amount: '20-25',
        min: 20,
        max: 25,
        range: [20, 25]
    },
    {
        id: 5,
        amount: '+25',
        min: 25,
        max: 99,
        range: [25, 99]
    },

]