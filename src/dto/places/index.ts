import { Place } from "../../models/places";
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