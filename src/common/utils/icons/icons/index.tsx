import { MdCelebration, MdCoffee, MdRestaurant } from "react-icons/md";
import {
  IoBook,
  IoColorWandOutline,
  IoGlassesOutline,
  IoLibrary,
} from "react-icons/io5";
import { BsHearts } from "react-icons/bs";
import { TbFountain } from "react-icons/tb";
import { FaBuilding, FaMountain } from "react-icons/fa";
import { MINDSETS } from "../../../../models/mindsets";
import { PLACE_TYPES } from "../../../../models/placeTypes";

export function handleMindsetIcon(mindset: MINDSETS, size = 21) {
  switch (mindset) {
    case MINDSETS.ALL:
      return <IoColorWandOutline size={size} />;
    case MINDSETS.STUDY:
      return <IoBook size={size} />;
    case MINDSETS.WORK:
      return <IoGlassesOutline size={size} />;
    case MINDSETS.ROMANTIC:
      return <BsHearts size={size} />;
    case MINDSETS.VIBE:
      return <MdCelebration size={size} />;
    default:
      return <IoColorWandOutline size={size} />;
  }
}

export function handleSpotTypeIcon(spotType: PLACE_TYPES, size = 21) {
  switch (spotType) {
    case PLACE_TYPES.COFFEE:
      return <MdCoffee size={size} />;
    case PLACE_TYPES.LIBRARY:
      return <IoLibrary size={size} />;
    case PLACE_TYPES.PARK:
      return <TbFountain size={size} />;
    case PLACE_TYPES.LOOKOUT:
      return <FaMountain size={size} />;
    case PLACE_TYPES.RESTAURANT:
      return <MdRestaurant size={size} />;
    case PLACE_TYPES.ROOFTOP:
      return <FaBuilding size={size} />;
    default:
      return <MdCoffee size={size} />;
  }
}

export function handleCardColor(mindset: MINDSETS) {
  switch (mindset) {
    case MINDSETS.ALL:
      return "bg-amber-400 text-white border-amber-400";
    case MINDSETS.STUDY:
      return "bg-indigo-400 text-white border-indigo-500";
    case MINDSETS.WORK:
      return "bg-blue-400 text-white border-blue-600";
    case MINDSETS.ROMANTIC:
      return "bg-pink-400 text-white border-pink-600";
    case MINDSETS.VIBE:
      return "bg-amber-400 text-white border-amber-600";
    default:
        return 'bg-white text-black border-black'
  }
}
