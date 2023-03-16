import { Request } from "../../common/request";
import { PlacesWithQuickSessionDataDTO } from "../../dto/places";

export class placesServices {
  protected request: Request;

  constructor(domain?: string) {
    this.request = new Request({
      domain: domain ? domain : "places",
    });
  }

  async getNearestPlaces(payload: {
    lng: number;
    lte: number;
    maxDistance?: number;
    minDistance?: number;
  }): Promise<PlacesWithQuickSessionDataDTO[]> {
    if (!payload.maxDistance) payload.maxDistance = 500;
    if (!payload.minDistance) payload.minDistance = 100;

    const places = await this.request.get<PlacesWithQuickSessionDataDTO[]>(
      `near?latitude=${payload.lte}&longitude=${payload.lng}&maxDistance=${payload.maxDistance}`
    );

    return places;
  }
}

export default new placesServices()
