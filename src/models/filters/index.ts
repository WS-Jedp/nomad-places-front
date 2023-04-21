import { MINDSETS } from "../mindsets"

export type PlaceFilter = {
    id: number
    name: MINDSETS
}

export enum GeneralFiltersEnum {
    type = 'type',
    mindset = 'mindset',
    commodities = 'commodities',
    rules = 'rules',
    people = 'people',
    distance = 'distance',
    none = 'none'
}