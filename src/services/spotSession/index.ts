import { Request } from "../../common/request";
import { UserLastSession } from "../../dto/session";
import { PlaceSession, PlaceSessionCachedDataDTO, PlaceSessionRecentAcitivityResp } from "../../models/session";

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
    );
    return spotSession;
  }

  async getSpotCachedSession(spotID: string) {
    const spotSession = await this.request.get<PlaceSessionCachedDataDTO>(
      `cache/current/${spotID}`
    );
    return spotSession;
  }

  getSessionDetail(sessionID: string) {
    const spotSession = this.request.get<PlaceSession>(`detail/${sessionID}`);
    return spotSession;
  }

  async uploadRecentActivity(data: {
    sessionID: string;
    spotID: string;
    multimedia: Blob;
    token: string;
  }) {
    const response = await this.request.withAuth(data.token).postWithMultiPartMultipleFiles<PlaceSessionRecentAcitivityResp>(`share/recent-activity`, { sessionID: data.sessionID, spotID: data.spotID, files: [data.multimedia] });
    return response;
  }

  async getUserLastSession(token: string) {
    const spotSession = await this.request.withAuth(token).get<UserLastSession>(
      `user/current`
    );
    return spotSession;
  }
}

export default new SpotSessionServices();
