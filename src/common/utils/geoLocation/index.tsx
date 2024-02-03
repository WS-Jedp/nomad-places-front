import { GeoLocation } from "../../../models/location";

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

// Define the Haversine function
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth’s radius in kilometers

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

export function computeDistanceToSpot(userLocation: GeoLocation, spotLocation: GeoLocation) {
    return calculateDistance(userLocation.latitude, userLocation.longitude, spotLocation.latitude, spotLocation.longitude).toFixed(2)
}