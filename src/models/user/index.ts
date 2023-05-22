export interface User {
    id: string
    username: string
    email: string
    profilePicture?: string
    personalInformation: {
        firstName: string
        lastName?: string
        work?: string
        languages?: string
        country?: string
        about?: string
    }

}