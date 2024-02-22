import { GeoLocation } from "../location"
import { MINDSETS } from "../mindsets"
import { PlaceMultimedia } from "../multimedia"
import { PLACE_TYPES } from "../placeTypes"

export interface Place {
    id: string
    name: string
    knownFor: MINDSETS
    description?: string | null
    multimedia: PlaceMultimedia[]
    type: PLACE_TYPES[]
    location: GeoLocation
    commodities?: Commodities
    rules: PlaceRules
}

/**
 * Model Commodities
 * 
 */
export type Commodities = {
    publicWifi: boolean | null
    wifiSpeed: number | null
    parking: boolean | null
    publicPlugs: boolean | null
    plugsAmount: number | null
    coworkSpace: boolean | null
    publicBathrooms: boolean | null
}

export enum PLACE_COMMODITIES_ENUM {
    PUBLIC_WIFI =  'publicWifi',
    WIFI_SPEED =  'wifiSpeed',
    PARKING =  'parking',
    PUBLIC_PLUGS =  'publicPlugs',
    PLUGS_AMOUNT =  'plugsAmount',
    COWORK_SPACE =  'coworkSpace',
    PUBLIC_BATHROOMS =  'publicBathrooms'
}

export const MAIN_PLACE_COMMODITIES_KEYS = [
  PLACE_COMMODITIES_ENUM.COWORK_SPACE,
  PLACE_COMMODITIES_ENUM.PUBLIC_WIFI,
  PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS,
  PLACE_COMMODITIES_ENUM.PARKING,
  PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS,
]
  
  /**
   * Model PlaceRules
   * 
   */
  export type PlaceRules = {
    openAt: string
    closedAt: string
    petFriendly: boolean | null
    smoking: boolean | null
    underAge: boolean | null
  }

  export type MainPlaceRules = {
    petFriendly: boolean | null
    smoking: boolean | null
    underAge: boolean | null
  }

  export enum PLACE_RULES_ENUM {
    OPEN_AT = 'openAt',
    CLOSED_AT = 'closedAt',
    PET_FRIENDLY = 'petFriendly',
    SMOKING = 'smoking',
    UNDER_AGE = 'underAge'
  }

  export const MAIN_RULES_KEYS: PLACE_RULES_ENUM[] = [
    PLACE_RULES_ENUM.PET_FRIENDLY,
    PLACE_RULES_ENUM.SMOKING,
    PLACE_RULES_ENUM.UNDER_AGE
  ]
