import { PlacesWithQuickSessionDataDTO, PlaceWithQuickSessionDataDTO } from "..";
import { PlaceWithCachedSession } from "../../../models/session";

export const placeWithSessionDataDTOIntoPlaceWithSession = (placeDTO: PlaceWithQuickSessionDataDTO): PlaceWithCachedSession => {
    return {
        ...placeDTO.place,
        sessionCachedData: placeDTO.quickSessionData
    }
}
export const placeWithQuickSessionDTOIntoPlaceWithCachedSession = (places: PlaceWithQuickSessionDataDTO[]): PlaceWithCachedSession[]  => {
    const mappedPlaces = places.map(placeDTO => placeWithSessionDataDTOIntoPlaceWithSession(placeDTO))
    return mappedPlaces
}