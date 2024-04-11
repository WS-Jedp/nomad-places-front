import { Request } from "../../common/request";
import { ExternalProfileDTO, RemoveFollowerDTO, UnfollowUserDTO, UserFollowersDTO, UserFollowingDTO } from "../../dto/social";
import { UserFollowRequestCreatedDTO, UserFollowRequestsDTO } from "../../dto/userFollowRequest";

export class SocialServices {
    protected request: Request;

    constructor(domain?: string) {
        this.request = new Request({
            domain: domain ? domain : "social",
        });
    }

    async getExternalProfile(payload: { userID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).get<ExternalProfileDTO>(`external-profile/${payload.userID}`)
        return response.user
    }

    async getFollowRequests(payload: { token: string }) {
        const response = await this.request.withAuth(payload.token).get<UserFollowRequestsDTO>(`me/follow/requests`)
        return response.requests
    }

    async sendFollowRequest(payload: { userToFollowID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).post<UserFollowRequestCreatedDTO>(`follow/request/${payload.userToFollowID}`)
        return response.socialRequest
    }
    async acceptFollowRequest(payload: { requestID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).post<UserFollowRequestCreatedDTO>(`follow/request/accept/${payload.requestID}/accept`)
        return response.socialRequest
    }
    async rejectFollowRequest(payload: { requestID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).post<UserFollowRequestCreatedDTO>(`follow/request/reject/${payload.requestID}/reject`)
        return response.socialRequest
    }

    async getFollowers(payload: { token: string }) {
        const response = await this.request.withAuth(payload.token).get<UserFollowersDTO>(`me/followers`)
        return response.followers
    }
    async getFollowing(payload: { token: string }) {
        const response = await this.request.withAuth(payload.token).get<UserFollowingDTO>(`me/following`)
        return response.following
    }

    async unfollowUser(payload: { userToUnfollowID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).post<UnfollowUserDTO>(`following/remove/${payload.userToUnfollowID}`)
        return response.following
    }

    async removeFollower(payload: { userToRemoveID: string, token: string }) {
        const response = await this.request.withAuth(payload.token).post<RemoveFollowerDTO>(`followers/remove/${payload.userToRemoveID}`)
        return response.followers
    }
}
