import { GeoLocation } from "../location"
import { MINDSETS } from "../mindsets"
import { PlaceMultimedia } from "../multimedia"
import { Commodities, PlaceRules } from "../places"
import { PLACE_TYPES } from "../placeTypes"

export enum PlaceConfirmationStatus {
    RECOMMENDED = "RECOMMENDED",
    CONFIRMED = "CONFIRMED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface DiscoveredPlaceConfirmation {
    id: string
    name: string
    placeID: string
    confirmedByID: string
    description?: string
    knownFor?: MINDSETS
    confirmationPlaceStatus: PlaceConfirmationStatus
    multimedia: PlaceMultimedia[]
    type: PLACE_TYPES[]
    location: GeoLocation
    commodities: Commodities
    rules: PlaceRules
}