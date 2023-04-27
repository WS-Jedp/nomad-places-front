import { MINDSETS } from "../mindsets"
import { PLACE_COMMODITIES_ENUM, PLACE_RULES_ENUM } from "../places"

export type PlaceMindsetsFilter = {
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

export type SpotCommoditiesFilters = {
    id: number
    commodity: PLACE_COMMODITIES_ENUM,
    name: string
}

export type SpotRulesFilters = {
    id: number
    rule: PLACE_RULES_ENUM,
    name: string
}

export type SpotAmountPeopleFilter = {
    id: number
    text: string
    range: [number, number]
}