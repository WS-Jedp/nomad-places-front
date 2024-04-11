import { UserFollowRequest } from "../../models/userFollowRequest";

export interface UserFollowRequestCreatedDTO {
    socialRequest: UserFollowRequest;
}

export interface UserFollowRequestsDTO {
    requests: UserFollowRequest[];
}