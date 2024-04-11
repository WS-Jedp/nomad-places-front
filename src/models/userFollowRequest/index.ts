import { User } from "../user";

export enum FOLLOW_REQUEST_STATUS {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export interface UserFollowRequest {
    id: string;
    sender: User;
    senderID: string;
    receiver: User;
    receiverID: string;
    status: FOLLOW_REQUEST_STATUS;
}