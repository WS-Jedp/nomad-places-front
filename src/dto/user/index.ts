import { Person } from "../../models/user"

export type UserRequestDTO = {
    id: string
    username: string
    email: string
    firstName: string
    personID: string
}

export type ProfileDTO = UserRequestDTO & {
    profilePicture?: string
    createdDate: Date
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