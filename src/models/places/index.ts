import { UserRequestDTO } from "../../dto/user";
import { GeoLocation } from "../location";
import { MINDSETS } from "../mindsets";
import { PlaceMultimedia } from "../multimedia";
import { PLACE_TYPES } from "../placeTypes";

export interface Place {
  id: string;
  name: string;
  knownFor: MINDSETS;
  description?: string | null;
  multimedia: PlaceMultimedia[];
  type: PLACE_TYPES[];
  location: GeoLocation;
  commodities?: Commodities;
  rules: PlaceRules;
  discoveredBy?: UserRequestDTO;
  discoveredByID?: string;
  confirmedBy?: UserRequestDTO[];
  confirmedByIDs?: string[];
  discoveredDate?: string;
  approvedDate?: string;
  rejectedDate?: string;
  confirmationStatus: PLACE_CONFIRMATION_STATUS;
}

export interface VisitedPlaceDTO {
  id: string;
  name: string;
  multimedia: PlaceMultimedia[];
}

export interface DiscoveredPlaceByUserDTO {
  id: string;
  name: string;
  multimedia: PlaceMultimedia[];
  discoveredDate: string;
}

/**
 * Model Commodities
 *
 */
export type Commodities = {
  publicWifi: boolean | null;
  wifiSpeed: WIFI_SPEED_COMMODITY_ENUM | null;
  parking: PARKING_COMMODITY_ENUM | null;
  publicPlugs: boolean | null;
  plugsAmount: number | null;
  coworkSpace: boolean | null;
  publicBathrooms: boolean | null;
  mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM | null;
  food: FOOD_COMMODITY_ENUM[] | null;
  foodQuality: COMMODITY_QUALITY | null;
  comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM | null;
  outdoorSeating: boolean | null;
  temperatureControl: TEMPERATURE_CONTROL_COMMODITY_ENUM[] | null;
  accessibility: boolean | null;
  eventSpace: boolean | null;
  greenAreas: boolean | null;
  alcoholAvailability: boolean | null;
  cafe: boolean | null;
  cafeQuality: COMMODITY_QUALITY | null;
  bakery: boolean | null;
  bakeryQuality: COMMODITY_QUALITY | null;
};

export enum PLACE_COMMODITIES_ENUM {
  PUBLIC_WIFI = "publicWifi",
  WIFI_SPEED = "wifiSpeed",
  PARKING = "parking",
  PUBLIC_PLUGS = "publicPlugs",
  PLUGS_AMOUNT = "plugsAmount",
  COWORK_SPACE = "coworkSpace",
  PUBLIC_BATHROOMS = "publicBathrooms",
  MOBILE_SIGNAL = "mobileSignal",
  FOOD = "food",
  FOOD_QUALITY = "foodQuality",
  COMFORT_LEVEL = "comfortLevel",
  OUTDOOR_SEATING = "outdoorSeating",
  TEMPERATURE_CONTROL = "temperatureControl",
  ACCESSIBILITY = "accessibility",
  EVENT_SPACE = "eventSpace",
  GREEN_AREAS = "greenAreas",
  ALCOHOL_AVAILABILITY = "alcoholAvailability",
  CAFE = "cafe",
  CAFE_QUALITY = "cafeQuality",
  BAKERY = "bakery",
  BAKERY_QUALITY = "bakeryQuality"

}


export enum WIFI_SPEED_COMMODITY_ENUM {
  SLOW = "SLOW",
  MODERATE = "MODERATE",
  FAST = "FAST",
  VERY_FAST = "VERY_FAST"
}

export const wifiSpeedOptions = [
  WIFI_SPEED_COMMODITY_ENUM.SLOW,
  WIFI_SPEED_COMMODITY_ENUM.MODERATE,
  WIFI_SPEED_COMMODITY_ENUM.FAST,
  WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
]

export enum PARKING_COMMODITY_ENUM {
  IN_PLACE = "IN_PLACE",
  IN_STREET = "IN_STREET",
  NEARBY = "NEARBY"
}


export const parkingOptions = [
  PARKING_COMMODITY_ENUM.IN_PLACE,
  PARKING_COMMODITY_ENUM.IN_STREET,
  PARKING_COMMODITY_ENUM.NEARBY,
]

export enum MOBILE_SIGNAL_COMMODITY_ENUM {
  WEAK = "WEAK",
  MEDIUM = "MEDIUM",
  STRONG = "STRONG"
}

export const mobileSignalOptions = [
  MOBILE_SIGNAL_COMMODITY_ENUM.WEAK,
  MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
  MOBILE_SIGNAL_COMMODITY_ENUM.STRONG
]

export enum FOOD_COMMODITY_ENUM {
  FAST_FOOD = "FAST_FOOD",
  RESTAURANT = "RESTAURANT",
  VEGAN = "VEGAN",
  VEGETARIAN = "VEGETARIAN",
  CARNIVORE = "CARNIVORE"
}

export const foodOptions = [
  FOOD_COMMODITY_ENUM.FAST_FOOD,
  FOOD_COMMODITY_ENUM.VEGAN,
  FOOD_COMMODITY_ENUM.VEGETARIAN,
  FOOD_COMMODITY_ENUM.CARNIVORE,
]

export enum COMMODITY_QUALITY {
  VERY_BAD = "VERY_BAD",
  BAD = "BAD",
  REGULAR = "REGULAR",
  GOOD = "GOOD",
  VERY_GOOD = "VERY_GOOD",
  EXCELLENT = "EXCELLENT",
}

export const commodityQualityOptions = [
  COMMODITY_QUALITY.VERY_BAD,
  COMMODITY_QUALITY.BAD,
  COMMODITY_QUALITY.REGULAR,
  COMMODITY_QUALITY.GOOD,
  COMMODITY_QUALITY.VERY_GOOD,
  COMMODITY_QUALITY.EXCELLENT,
]

export enum COMFORT_LEVEL_COMMODITY_ENUM {
  BASIC = "BASIC",
  CASUAL = "CASUAL",
  COZY = "COZY",
  ERGONOMIC = "ERGONOMIC",
  LUXURIOUS = "LUXURIOUS",
  SPACIOUS = "SPACIOUS"
}

export const comfortLevelOptions = [
  COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
  COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
  COMFORT_LEVEL_COMMODITY_ENUM.COZY,
  COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
  COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
  COMFORT_LEVEL_COMMODITY_ENUM.SPACIOUS
]

export enum TEMPERATURE_CONTROL_COMMODITY_ENUM {
  AIR_CONDITIONING = "AIR_CONDITIONING",
  HEATING = "HEATING"
}

export const temperatureControlOptions = [
  TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING,
  TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING
]

export const MAIN_PLACE_COMMODITIES_KEYS = [
  PLACE_COMMODITIES_ENUM.COWORK_SPACE,
  PLACE_COMMODITIES_ENUM.PUBLIC_WIFI,
  PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS,
  PLACE_COMMODITIES_ENUM.PARKING,
  PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS,
  PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL,
  PLACE_COMMODITIES_ENUM.FOOD,
  PLACE_COMMODITIES_ENUM.COMFORT_LEVEL,
  PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING,
  PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL,
  PLACE_COMMODITIES_ENUM.ACCESSIBILITY,
  PLACE_COMMODITIES_ENUM.EVENT_SPACE,
  PLACE_COMMODITIES_ENUM.GREEN_AREAS,
  PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY,
  PLACE_COMMODITIES_ENUM.CAFE,
  PLACE_COMMODITIES_ENUM.BAKERY,
];

/**
 * Model PlaceRules
 *
 */
export type PlaceRules = {
  openAt: string;
  closedAt: string;
  petFriendly: boolean | null;
  smoking: boolean | null;
  underAge: boolean | null;
  timeLimit: PLACE_TIME_LIMIT_RULE | null;
  noisePolicy: NOISE_POLICY_RULE_ENUM | null;
  consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM | null;
  privacyPolicy: PRIVACY_POLICY_RULE_ENUM[] | null;
};

export enum PLACE_RULES_ENUM {
  OPEN_AT = "openAt",
  CLOSED_AT = "closedAt",
  PET_FRIENDLY = "petFriendly",
  SMOKING = "smoking",
  UNDER_AGE = "underAge",
  TIME_LIMIT = "timeLimit",
  NOISE_POLICY = "noisePolicy",
  CONSUMPTION_POLICY = "consumptionPolicy",
  PRIVACY_POLICY = "privacyPolicy",
}

export enum PLACE_CONFIRMATION_STATUS {
  RECOMMENDED = "RECOMMENDED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PLACE_TIME_LIMIT_RULE {
  NO_LIMIT = "NO_LIMIT",
  UNLIMITED = "UNLIMITED",
  PER_HOUR = "PER_HOUR",
}

export const placeTimeLimitOptions = [
  PLACE_TIME_LIMIT_RULE.NO_LIMIT,
  PLACE_TIME_LIMIT_RULE.UNLIMITED,
  PLACE_TIME_LIMIT_RULE.PER_HOUR,
]

export enum NOISE_POLICY_RULE_ENUM {
  QUIET_ONLY = "QUIET_ONLY",
  MODERATE_NOISE_ALLOWED = "MODERATE_NOISE_ALLOWED",
  NO_NOISE_RESTRICTION = "NO_NOISE_RESTRICTION",
}

export const noisePolicyRuleOptions = [
  NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
  NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
  NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
]

export enum CONSUMPTION_POLICY_RULE_ENUM {
  PURCHASE_REQUIRED = "PURCHASE_REQUIRED",
  OUTSIDE_PURCHASE_ALLOWED = "OUTSIDE_PURCHASE_ALLOWED",
  NO_OUTSIDE_FOOD = "NO_OUTSIDE_FOOD",
}

export const consumptionRuleOptions = [
  CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
  CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
  CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
]

export enum PRIVACY_POLICY_RULE_ENUM {
  OPEN_WORKSPACE = "OPEN_WORKSPACE",
  SHARED_DESKS = "SHARED_DESKS",
  PRIVATE_ROOM = "PRIVATE_ROOM",
}

export const privacyPolicyRuleOptions = [
  PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
  PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
  PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM,
]

export const MAIN_RULES_KEYS: PLACE_RULES_ENUM[] = [
  PLACE_RULES_ENUM.PET_FRIENDLY,
  PLACE_RULES_ENUM.SMOKING,
  PLACE_RULES_ENUM.UNDER_AGE,
  PLACE_RULES_ENUM.TIME_LIMIT,
  PLACE_RULES_ENUM.NOISE_POLICY,
  PLACE_RULES_ENUM.CONSUMPTION_POLICY,
  PLACE_RULES_ENUM.PRIVACY_POLICY,
];
