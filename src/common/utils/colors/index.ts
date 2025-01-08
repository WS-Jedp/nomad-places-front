import { COMMODITY_QUALITY } from "../../../models/places";

export const getCommodityQualityColor = (quality?: COMMODITY_QUALITY) => {
  switch (quality) {
    case COMMODITY_QUALITY.VERY_BAD:
      return "bg-red-100 text-red-400";
    case COMMODITY_QUALITY.BAD:
      return "bg-red-100 text-red-400";
    case COMMODITY_QUALITY.REGULAR:
      return "bg-amber-100 text-amber-500";
    case COMMODITY_QUALITY.GOOD:
      return "bg-emerald-100 text-emerald-500";
    case COMMODITY_QUALITY.VERY_GOOD:
      return "bg-emerald-100 text-emerald-500";
    case COMMODITY_QUALITY.EXCELLENT:
      return "bg-indigo-100 text-indigo-400";
    default:
      return "bg-gray-100 text-gray-400";
  }
};
