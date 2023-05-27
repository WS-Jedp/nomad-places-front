export interface User {
    id: string
    username: string
    email: string
    profilePicture?: string
    personalInformation: Person
}

export interface Person {
    id: string
    firstName: string
    lastName?: string
    birthdate?: string
    about?: string
    country?: string
    languages?: string[]
    job?: string
}