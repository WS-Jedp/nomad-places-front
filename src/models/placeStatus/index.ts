export enum PLACE_STATUS {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

export type PlaceState = {
    id: number
    name: string
    type: PLACE_STATUS 
}