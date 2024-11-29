import { PlaceSession } from "../../models/session";

export interface UserLastSession {
    lastSession: PlaceSession,
    inSession: boolean,
    expired: boolean
}