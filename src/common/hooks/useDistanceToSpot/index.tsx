import { useEffect, useState } from "react"
import { GeoLocation } from "../../../models/location"
import { computeDistanceToSpot } from "../../utils/geoLocation"
import { useAppSelector } from "../useTypedSelectors"

export const useDistanceToSpot = (geoLocation?: GeoLocation) => {

    const userLocation = useAppSelector(state => state.user.location)
    const [distance, setDistance] = useState<string | null>()

    function getDistanceToSpot() {
        if(!geoLocation || !userLocation || !userLocation.latitude || !userLocation.longitude) return null
    
        return computeDistanceToSpot({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        }, geoLocation)
      }

      useEffect(() => {
        setDistance(getDistanceToSpot())
      }, [])

    return [distance]
    
}