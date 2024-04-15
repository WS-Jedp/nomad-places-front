import { GeoLocation } from "../../models/location";
import { MINDSETS } from "../../models/mindsets";
import { Commodities, Place, PlaceRules } from "../../models/places";
import { PLACE_TYPES } from "../../models/placeTypes";
import { PlaceSession, PlaceSessionCachedDataDTO } from "../../models/session";

export type PlaceWithQuickSessionDataDTO = {
    place: Place,
    quickSessionData: PlaceSessionCachedDataDTO
}

export type PlacesWithQuickSessionDataDTO = {
    placesWithQuickSessionData: PlaceWithQuickSessionDataDTO[]
}

export type GetPlaceDetailDTO = {
    place: Place,
    sessions: PlaceSession[]
}

export type DiscoverSpotDTO = {
    name: string
    description?: string
    knownFor?: MINDSETS
    type: PLACE_TYPES[]
    location: GeoLocation
    commodities: Commodities
    rules: PlaceRules
    multimedia: File[]
}