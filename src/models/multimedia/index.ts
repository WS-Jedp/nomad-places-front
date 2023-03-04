export enum MULTIMEDIA_TYPE {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export interface PlaceMultimedia {
    url: string
    type: MULTIMEDIA_TYPE
}