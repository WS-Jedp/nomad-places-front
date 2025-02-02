import { GeoLocation } from "../../models/location";
import { MINDSETS } from "../../models/mindsets";
import { DiscoveredPlaceConfirmation } from "../../models/placeConfirmation";
import { AMBIENCE_TAG_ENUM, Commodities, LANGUAGE_ENUM, Place, PLACE_APPROXIMATE_DAILY_CONST_ENUM, PlaceRules, THEME_TAG_ENUM } from "../../models/places";
import { PLACE_TYPES } from "../../models/placeTypes";
import { PlaceSession, PlaceSessionCachedDataDTO } from "../../models/session";
import { UserEarnedPoints } from "../gamification/userEarnedPoints";

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
    capacity?: number
    languages: LANGUAGE_ENUM[]
    ambienceTags: AMBIENCE_TAG_ENUM[];
    themeTags: THEME_TAG_ENUM[];
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM | null;
    type: PLACE_TYPES[]
    location: GeoLocation
    commodities: Commodities
    rules: PlaceRules
    multimedia: Blob[]
    discoveredByID: string
}

export type DiscoveredSpotByUserResponseDTO = {
    discoveredPlace: Place,
    userDiscoveredPlacesIDs: string[]
    userGamification: UserEarnedPoints
}

export type ConfirmNewSpotDiscoveredDTO = {
    spotID: string
    discoveredSpotReview: DiscoverSpotDTO
}

export type newSpotDiscoveredConfirmedDTO = {
    placeConfirmation: DiscoveredPlaceConfirmation
    placeApproved: boolean
    userConfirmations: string[]
    placeConfirmations: string[]
    place: Place
    userGamification: UserEarnedPoints
} 

export type newSpotDiscoveredRejectedDTO = {
    discoveredPlace: Place
    placeConfirmation: DiscoveredPlaceConfirmation
    placeRejected: boolean
} 
