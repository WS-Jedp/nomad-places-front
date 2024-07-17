import { Request } from "../../common/request";
import { ConfirmNewSpotDiscoveredDTO, DiscoveredSpotByUserResponseDTO, DiscoverSpotDTO, GetPlaceDetailDTO, newSpotDiscoveredConfirmedDTO, newSpotDiscoveredRejectedDTO, PlacesWithQuickSessionDataDTO } from "../../dto/places";
import { DiscoveredPlaceConfirmation } from "../../models/placeConfirmation";
import { DiscoveredPlaceByUserDTO, Place, VisitedPlaceDTO } from "../../models/places";

export class placesServices {
  protected request: Request;

  constructor(domain?: string) {
    this.request = new Request({
      domain: domain ? domain : "places",
    });
  }

  async getAllPlacesWithCachedSession(): Promise<PlacesWithQuickSessionDataDTO> {
    const places = await this.request.get<PlacesWithQuickSessionDataDTO>(
      'all'
    )
    return places
  }

  async getNearestPlaces(payload: {
    lng: number;
    lte: number;
    maxDistance?: number;
    minDistance?: number;
  }): Promise<PlacesWithQuickSessionDataDTO> {
    if (!payload.maxDistance) payload.maxDistance = 500;
    if (!payload.minDistance) payload.minDistance = 100;

    const places = await this.request.get<PlacesWithQuickSessionDataDTO>(
      `near?latitude=${payload.lte}&longitude=${payload.lng}&maxDistance=${payload.maxDistance}`
    );

    return places;
  }

  async getPlace(payload: { placeID: string }): Promise<GetPlaceDetailDTO> {
    const place = await this.request.get<GetPlaceDetailDTO>(
      `detail/${payload.placeID}`
    )
    return place
  }


  async newSpotDiscovered(spotDiscovered: DiscoverSpotDTO, multimedia: Blob[], token: string) {
    const response = await this.request.withAuth(token).postWithMultiPartMultipleFiles<DiscoveredSpotByUserResponseDTO>('discover/new', { spotDiscovered: JSON.stringify(spotDiscovered), files: multimedia })
    return response
  }

  async confirmNewSpotDiscovered(data: { token: string, payload: ConfirmNewSpotDiscoveredDTO }) {
    const response = await this.request.withAuth(data.token).post<newSpotDiscoveredConfirmedDTO>(`discover/confirm`, data.payload)
    return response
  }

  async rejectNewSpotDiscovered(data: { token: string, payload: ConfirmNewSpotDiscoveredDTO }) {
    const response = await this.request.withAuth(data.token).post<newSpotDiscoveredRejectedDTO>(`discover/reject`, data.payload)
    return response
  }

  async getAuthUserDiscoveredSpots(data: { token: string }) {
    const resp = await this.request.withAuth(data.token).get<{ discoveredPlaces: DiscoveredPlaceByUserDTO[] }>(`discovered/me`)
    return resp.discoveredPlaces
  }

  async getAuthUserConfirmedPlaces(data: { token: string }) {
    const resp = await this.request.withAuth(data.token).get<{ confirmedPlaces: Place[] }>(`confirmed/me`)
    return resp.confirmedPlaces
  }

  async getDiscoveredPlacesByUser(data: { userID: string }) {
    const resp = await this.request.get<{ discoveredPlaces: DiscoveredPlaceByUserDTO[] }>(`discovered/by/${data.userID}`)
    return resp.discoveredPlaces
  }

  async getConfirmedPlacesByUser(data: { userID: string }) {
    const resp = await this.request.get<{ confirmedPlaces: Place[] }>(`confirmed/by/${data.userID}`)
    return resp.confirmedPlaces
  }

  async getAllSpotReviews(data: { spotID: string, token: string }) {
    const resp = await this.request.withAuth(data.token).get<{ spotReviews: DiscoveredPlaceConfirmation[] }>(`discover/reviews/${data.spotID}`)
    return resp.spotReviews
  }

  async getAuthUserVisitedSpots(data: { token: string }) {
    const resp = await this.request.withAuth(data.token).get<{ visitedPlaces: VisitedPlaceDTO[] }>(`visited/me`)
    return resp.visitedPlaces
  }

  async getVisitedSpotsByUser(data: { token: string, userID: string }) {
    const resp = await this.request.withAuth(data.token).get<{ visitedPlaces: VisitedPlaceDTO[] }>(`visited/by/${data.userID}`)
    return resp.visitedPlaces
  }
}

export default new placesServices()
