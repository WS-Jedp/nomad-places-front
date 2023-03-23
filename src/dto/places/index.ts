import { Place } from "../../models/places";
import { PlaceSessionCachedDataDTO } from "../../models/session";

export type PlacesWithQuickSessionDataDTO = {
    place: Place,
    quickSessionData: PlaceSessionCachedDataDTO
}[]