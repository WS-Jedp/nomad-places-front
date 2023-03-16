import { PlaceMultimedia } from "../multimedia"
import { PLACE_TYPES } from "../placeTypes"

export interface Place {
    id: string
    name: string
    description?: string | null
    multimedia: PlaceMultimedia[]
    type: PLACE_TYPES[]
    location?: Location
    commodities?: Commodities
    rules?: PlaceRules
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
  }
  
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
