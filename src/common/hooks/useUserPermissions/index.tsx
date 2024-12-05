import { useMemo } from "react";
import { useAppSelector } from "../useTypedSelectors";
import { filterPermissions, PermissionsMap, placePermissions, sessionPermissions } from "../../utils/permissions";

export const useUserPermissions = () => {
    const subscription = useAppSelector(state => state.user.userData?.subscription)
    const permissions = useMemo(() => {
        if(!subscription) return PermissionsMap.BASIC_USAGE
        return PermissionsMap[subscription.type]
    }, [subscription])


    // Place permissions
    const canListOfficialPlaces = () => permissions.includes(placePermissions.list_places)
    const canViewOfficialPlaces = () => permissions.includes(placePermissions.view_place)
    const canViewPlaceRealTimeData = () => permissions.includes(placePermissions.view_place_real_time_data)
    const canDiscoverPlaces = () => permissions.includes(placePermissions.discover_place)
    const canViewDiscoveredPlaces = () => permissions.includes(placePermissions.view_discovered_places)
    const canApproveDiscoveredPlaces = () => permissions.includes(placePermissions.approve_discovered_place)
    const canRejectDiscoveredPlaces = () => permissions.includes(placePermissions.reject_discovered_place)

    // Filters permissions
    const canUseBasicFilters = () => permissions.includes(filterPermissions.basic_filters)
    const canUseRealTimeFilters = () => permissions.includes(filterPermissions.real_time_filters)

    // Session permissions
    const canViewSession = () => permissions.includes(sessionPermissions.view_session)
    const canAuthSession = () => permissions.includes(sessionPermissions.auth_session)
    const canUpdateSession = () => permissions.includes(sessionPermissions.update_session)
    const canViewSessionRecentActivity = () => permissions.includes(sessionPermissions.view_session_recent_activity)

    return {
        canListOfficialPlaces,
        canViewOfficialPlaces,
        canViewPlaceRealTimeData,
        canDiscoverPlaces,
        canViewDiscoveredPlaces,
        canApproveDiscoveredPlaces,
        canRejectDiscoveredPlaces,
        canUseBasicFilters,
        canUseRealTimeFilters,
        canViewSession,
        canAuthSession,
        canUpdateSession,
        canViewSessionRecentActivity
    }
}