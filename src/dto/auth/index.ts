import { Person } from "../../models/user"
import { UserRequestDTO } from "../user"

export type LoginDTO = {
    user: UserRequestDTO,
    access_token: string
}

export type RegisterUserRequestDTO = {
    userData: {
        username: string
        password: string
        email: string
    }
    personData: Omit<Person, 'id'>
}

export type ConfirmProfileDTO = {
    exists: boolean
    byEmail: boolean
    byUsername: boolean
}