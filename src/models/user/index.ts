import { Subscription } from "../../dto/subscription"
import { INDUSTRIES } from "../industries"

export interface User {
    id: string
    username: string
    email: string
    profilePicture?: string
    personalInformation: Person
    followers?: string[]
    following?: string[]
    createdDate?: string
    confirmedPlacesIDs?: string[]
    discoveredPlacesIDs?: string[]
    visitedPlacesIDs?: string[]
    gamification: {
        points: number
    },
    subscription: Subscription
}

export interface Person {
    id: string
    firstName: string
    lastName?: string
    birthdate?: string
    about?: string
    country?: string
    languages?: string[]
    industry?: INDUSTRIES[]
    genre?: PERSON_GENDER;
}

export enum PERSON_GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export const PERSON_GENDER_LIST = [
    PERSON_GENDER.FEMALE,
    PERSON_GENDER.MALE,
    PERSON_GENDER.OTHER
]
