import { User } from "../user"

export enum MULTIMEDIA_TYPE {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export interface PlaceMultimedia {
    url: string
    type: MULTIMEDIA_TYPE
}

export interface RecentActivity {
    id: string
    url: string
    type: MULTIMEDIA_TYPE,
    user: User
    createdDate: Date
}