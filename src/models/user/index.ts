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
    }
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
}