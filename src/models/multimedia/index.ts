import { User } from "../user"

export enum MULTIMEDIA_TYPE {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export interface PlaceMultimedia {
    url: string
    type: MULTIMEDIA_TYPE
    createdDate: Date
}

export interface RecentActivity {
    id: string
    url: string
    type: MULTIMEDIA_TYPE,
    username: string
    userID: string
    userPhotoURL: string
    createdDate: Date
}