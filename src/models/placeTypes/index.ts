export enum PLACE_TYPES {
    COFFEE = "COFFEE",
    LIBRARY = "LIBRARY",
    SQUARE = "SQUARE",
    PARK = "PARK",
    ROOFTOP = "ROOFTOP",
    LOOKOUT = "LOOKOUT",
    RESTAURANT = "RESTAURANT",
}

export type PlaceTypesFilter = {
    id: number
    name: PLACE_TYPES
    title: string
}
