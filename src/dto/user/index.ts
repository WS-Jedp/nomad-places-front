import { Person } from "../../models/user"

export type UserRequestDTO = {
    id: string
    username: string
    email: string
    firstName: string
    personID: string
    following?: string[]
    followers?: string[]
    confirmedPlacesIDs?: string[]
    discoveredPlacesIDs?: string[]
    visitedPlacesIDs?: string[]
    createdDate?: string
    gamification: {
        points: number
    }
}

export type ProfileDTO = UserRequestDTO & {
    profilePicture?: string
    createdDate: string
    person: Person
}

export type UpdatePersonalInformationDTO = {
    userData: {
        userID: string,
        profilePicture?: Blob
    },
    personData: {
        id: string
        firstName: string,
        lastName?: string,
        about?: string,
        country?: string
        industry?: string[]
        languages?: string[]
    }
}