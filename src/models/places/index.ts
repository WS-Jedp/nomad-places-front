import { PlaceMultimedia } from "../multimedia"
import { PLACE_TYPES } from "../placeTypes"

export interface Place {
    id: string
    name: string
    type: PLACE_TYPES[]
    description?: string
    multimedia: PlaceMultimedia[]
}