import { Request } from "../../common/request";
import { GetPlaceDetailDTO, PlacesWithQuickSessionDataDTO } from "../../dto/places";
import { PlaceSession, PlaceSessionCachedDataDTO } from "../../models/session";

export class SpotSessionServices {
  protected request: Request;

  constructor(domain?: string) {
    this.request = new Request({
      domain: domain ? domain : "place-session",
    });
  }

 async getSpotCurrentSession(spotID: string) {
    const spotSession = await this.request.get<PlaceSession>(
      `current/${spotID}`
    )
      return spotSession
 }

 async getSpotCachedSession(spotID: string) {
    const spotSession = await this.request.get<PlaceSessionCachedDataDTO>(
      `cache/current/${spotID}`
    )
    return spotSession
 }

 getSessionDetail(sessionID: string) {
    const spotSession = this.request.get<PlaceSession>(
      `detail/${sessionID}`
    )
    return spotSession
 }
}

export default new SpotSessionServices()
