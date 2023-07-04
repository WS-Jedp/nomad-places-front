import { Place } from "../../../models/places";
import { PlaceSessionAction } from "../../../models/session/actions";
import { User } from "../../../models/user";

export interface PlaceSessionDetailDTO {
    place: Place
    users: User[]
    actions: PlaceSessionAction[]
}