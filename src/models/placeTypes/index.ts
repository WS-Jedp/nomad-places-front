export enum PLACE_TYPES {
    ALL = "ALL",
    UNKNOWN = "UNKNOWN",
    COFFEE = "COFFEE",
    LIBRARY = "LIBRARY",
    // SQUARE = "SQUARE",
    PARK = "PARK",
    ROOFTOP = "ROOFTOP",
    LOOKOUT = "LOOKOUT",
    RESTAURANT = "RESTAURANT",
    COWORK_ZONE = "COWORK_ZONE",
}

export type PlaceTypesFilter = {
    id: number
    name: PLACE_TYPES
    title: string
}

export const PLACE_TYPES_KEYS = [
    PLACE_TYPES.COFFEE,
    PLACE_TYPES.LIBRARY,
    PLACE_TYPES.ROOFTOP,
    PLACE_TYPES.COWORK_ZONE,
    PLACE_TYPES.PARK,
    PLACE_TYPES.LOOKOUT
]
