import { COMFORT_LEVEL_COMMODITY_ENUM, COMMODITY_QUALITY, FOOD_COMMODITY_ENUM, MOBILE_SIGNAL_COMMODITY_ENUM, PARKING_COMMODITY_ENUM, PLACE_COMMODITIES_ENUM, TEMPERATURE_CONTROL_COMMODITY_ENUM, WIFI_SPEED_COMMODITY_ENUM } from "../../../models/places";
import { AccessibilityAmenitiesCard } from "../cards/accessibility";
import { AlcoholAvailabilityAmenitiesCard } from "../cards/alcoholAvailability";
import { BakeryAmenitiesCard } from "../cards/bakery";
import { CafeAmenitiesCard } from "../cards/cafe";
import { ComfortLevelAmenitiesCard } from "../cards/comfortLevel";
import { CoworkSpaceAmenitiesCard } from "../cards/coworkSpace";
import { EventSpaceAmenitiesCard } from "../cards/eventSpace";
import { FoodAmenitiesCard } from "../cards/food";
import { GreenAreasAmenitiesCard } from "../cards/greenAreas";
import { MobileSignalAmenitiesCard } from "../cards/mobileSignal";
import { OutdoorSeatingAmenitiesCard } from "../cards/outdoorSeating";
import { ParkingAmenitiesCard } from "../cards/parking";
import { PlugsAmenitiesCard } from "../cards/plugs";
import { PublicBathroomsAmenitiesCard } from "../cards/publicBathrooms";
import { PublicWifiAmenitiesCard } from "../cards/publicWifi";
import { TemperatureControlAmenitiesCard } from "../cards/temperatureControl";
import { WifiSpeedAmenitiesCard } from "../cards/wifiSpeed";

interface HandleAmenitiesRenderProps {
    amenities: PLACE_COMMODITIES_ENUM
    state: boolean
    value?: string
    quality?: COMMODITY_QUALITY | null
}

export const HandleAmenitiesRender: React.FC<HandleAmenitiesRenderProps> = ({ amenities, state, value, quality }) => {
    switch (amenities) {
        case PLACE_COMMODITIES_ENUM.PUBLIC_WIFI:
            return (
                <PublicWifiAmenitiesCard 
                    state={state}
                    value={value}
                />
            )
        case PLACE_COMMODITIES_ENUM.WIFI_SPEED:
            return (
                <WifiSpeedAmenitiesCard 
                    value={value as WIFI_SPEED_COMMODITY_ENUM}
                />
            )

        case PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS:
            return (
                <PlugsAmenitiesCard 
                    state={state}
                    value={value}
                />
            )
        case PLACE_COMMODITIES_ENUM.PARKING:
            return (
                <ParkingAmenitiesCard 
                    state={state}
                    value={value as unknown as PARKING_COMMODITY_ENUM}
                />
            )
        case PLACE_COMMODITIES_ENUM.COWORK_SPACE:
            return (
                <CoworkSpaceAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.ACCESSIBILITY:
            return (
                <AccessibilityAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.ALCOHOL_AVAILABILITY:
            return (
                <AlcoholAvailabilityAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.BAKERY:
            return (
                <BakeryAmenitiesCard 
                    state={state}
                    value={value as COMMODITY_QUALITY}
                />
            )
        case PLACE_COMMODITIES_ENUM.COMFORT_LEVEL:
            return (
                <ComfortLevelAmenitiesCard 
                    value={value as COMFORT_LEVEL_COMMODITY_ENUM}
                />
            )
        case PLACE_COMMODITIES_ENUM.EVENT_SPACE:
            return (
                <EventSpaceAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.FOOD:
            return (
                <FoodAmenitiesCard 
                    state={state}
                    value={value as unknown as FOOD_COMMODITY_ENUM[] }
                    quality={quality}
                />
            )
        case PLACE_COMMODITIES_ENUM.CAFE:
            return (
                <CafeAmenitiesCard 
                    state={state}
                    value={value as COMMODITY_QUALITY}
                />
            )
        case PLACE_COMMODITIES_ENUM.GREEN_AREAS:
            return (
                <GreenAreasAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL:
            return (
                <MobileSignalAmenitiesCard 
                    value={value as MOBILE_SIGNAL_COMMODITY_ENUM}
                />
            )
        case PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING:
            return (
                <OutdoorSeatingAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.PUBLIC_BATHROOMS:
            return (
                <PublicBathroomsAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL:
            return (
                <TemperatureControlAmenitiesCard 
                    state={state}
                    value={value as unknown as TEMPERATURE_CONTROL_COMMODITY_ENUM[]}
                />
            )
    }

    return null
}