import { ProfileDTO } from "../user";
import { User } from "../../models/user";

export interface UserFollowersDTO {
    followers: User[]
}

export interface UserFollowingDTO {
    following: User[]
}

export interface UnfollowUserDTO {
    following: string[]
}

export interface RemoveFollowerDTO {
    followers: string[]
}

export interface ExternalProfileDTO {
    user: ProfileDTO
}
