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