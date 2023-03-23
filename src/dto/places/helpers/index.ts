import { PlacesWithQuickSessionDataDTO } from "..";
import { placeWithCachedSession } from "../../../models/session";

export const placeWithQuickSessionDTOIntoPlaceWithCachedSession = (places: PlacesWithQuickSessionDataDTO): placeWithCachedSession[]  => {
    return places.map(place => {
        const palceWithCachedSesssion: placeWithCachedSession = {
            ...place.place,
            sessionCachedData: place.quickSessionData
        }
        return palceWithCachedSesssion
    })
}