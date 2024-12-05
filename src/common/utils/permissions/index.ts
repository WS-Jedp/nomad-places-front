import { SubscriptionTypeEnum } from "../../../dto/subscription";

export const placePermissions = {
  list_places: "list_places",
  view_place: "view_place",
  view_place_real_time_data: "view_real_time_data",
  discover_place: "discover_place",
  view_discovered_places: "view_discovered_places",
  approve_discovered_place: "approve_discovered_place",
  reject_discovered_place: "reject_discovered_place",
};

export const filterPermissions = {
  basic_filters: "basic_filters",
  real_time_filters: "real_time_filters",
};

export const sessionPermissions = {
  view_session: "view_session",
  auth_session: "auth_session",
  update_session: "update_session",
  view_session_recent_activity: "view_session_recent_activity",
};

const basicUsage = [placePermissions.list_places, placePermissions.view_place];
const explorerPlanPermission = [
  placePermissions.list_places,
  placePermissions.view_place,
  filterPermissions.basic_filters,
];
const nomadPlanPermission = [
  ...explorerPlanPermission,
  placePermissions.view_place_real_time_data,
  placePermissions.view_discovered_places,
  placePermissions.discover_place,
  placePermissions.approve_discovered_place,
  placePermissions.reject_discovered_place,
  ...Object.keys(filterPermissions),
  sessionPermissions.view_session,
  sessionPermissions.auth_session,
  sessionPermissions.update_session,
];
const wanderlustPlanPermission = [
  ...nomadPlanPermission,
  sessionPermissions.view_session_recent_activity,
];

export const PermissionsMap = {
  BASIC_USAGE: basicUsage,
  [SubscriptionTypeEnum.EXPLORER_PLAN]: explorerPlanPermission,
  [SubscriptionTypeEnum.NOMAD_PLAN]: nomadPlanPermission,
  [SubscriptionTypeEnum.WANDERLUST_PLAN]: wanderlustPlanPermission,
};
