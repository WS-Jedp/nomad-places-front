import { GeoLocation } from "../location";
import { MINDSETS } from "../mindsets";
import { PlaceMultimedia } from "../multimedia";
import { AMBIENCE_TAG_ENUM, Commodities, LANGUAGE_ENUM, PLACE_APPROXIMATE_DAILY_CONST_ENUM, PlaceRules, THEME_TAG_ENUM } from "../places";
import { PLACE_TYPES } from "../placeTypes";

export enum PlaceConfirmationStatus {
  RECOMMENDED = "RECOMMENDED",
  CONFIRMED = "CONFIRMED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface DiscoveredPlaceConfirmation {
  id: string;
  name: string;
  placeID: string;
  confirmedByID: string;
  description?: string;
  knownFor?: MINDSETS;
  languages: LANGUAGE_ENUM[];
  ambianceTags: AMBIENCE_TAG_ENUM[];
  themeTags: THEME_TAG_ENUM[];
  approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM | null;
  confirmationPlaceStatus: PlaceConfirmationStatus;
  multimedia: PlaceMultimedia[];
  type: PLACE_TYPES[];
  location: GeoLocation;
  commodities: Commodities;
  rules: PlaceRules;
}
