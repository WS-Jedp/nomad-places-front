import { useTranslation } from "react-i18next";
import { BsHearts } from "react-icons/bs";
import { IoBook, IoColorWandOutline, IoGlassesOutline } from "react-icons/io5";
import { MdCelebration } from "react-icons/md";
import { MINDSETS } from "../../../../models/mindsets";
import { PLACE_NOISE_LEVEL } from "../../../../models/placeNoiseLevel";

interface CircleNoiseLevelActionsProps {
  noiseLevel: PLACE_NOISE_LEVEL;
  actionsAmount: number;
  callback?: () => void;
  withBadge?: boolean;
}

export const CircleNoiseLevelActions: React.FC<
  CircleNoiseLevelActionsProps
> = ({ actionsAmount, noiseLevel, callback = () => {}, withBadge = true }) => {
  const { t } = useTranslation();

  function handleCardColor() {
    if (actionsAmount === 0) {
      return "bg-gray-200 text-gray-400 border-gray-400 hover:bg-gray-300";
    }

    switch (noiseLevel) {
      case PLACE_NOISE_LEVEL.VERY_QUIET:
        return "bg-coffi-purple/30 text-coffi-purple border-coffi-purple/60 hover:bg-coffi-purple/10";
      case PLACE_NOISE_LEVEL.QUITE:
        return "bg-coffi-blue/10 text-coffi-blue border-coffi-blue/10 hover:bg-coffi-blue/20";
      case PLACE_NOISE_LEVEL.MODERATE:
        return "bg-orange-100 text-orange-400 border-orange-400 hover:bg-orange-200";
      case PLACE_NOISE_LEVEL.LOUD:
        return "bg-orange-300 text-orange-600 border-orange-400 hover:bg-orange-400";
      case PLACE_NOISE_LEVEL.VERY_LOUD:
        return "bg-red-200 text-red-500 border-red-300 hover:bg-red-300";
    }
  }

  function handleTextColor() {
    if (actionsAmount === 0) {
      return "text-gray-400";
    }

    switch (noiseLevel) {
      case PLACE_NOISE_LEVEL.QUITE:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.VERY_QUIET:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.MODERATE:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.LOUD:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.VERY_LOUD:
        return "text-amber-400";
    }
  }

  function handleBadgeColor() {
    if (actionsAmount === 0) {
      return "bg-gray-400";
    }

    switch (noiseLevel) {
        case PLACE_NOISE_LEVEL.VERY_QUIET:
            return "bg-coffi-purple text-coffi-white";
          case PLACE_NOISE_LEVEL.QUITE:
            return "bg-coffi-blue text-coffi-white";
          case PLACE_NOISE_LEVEL.MODERATE:
            return "bg-orange-400 text-white";
          case PLACE_NOISE_LEVEL.LOUD:
            return "bg-orange-400 text-white";
          case PLACE_NOISE_LEVEL.VERY_LOUD:
            return "bg-red-300 text-white";
    }
  }

  function handleIcon() {
    switch (noiseLevel) {
      case PLACE_NOISE_LEVEL.QUITE:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.VERY_QUIET:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.MODERATE:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.LOUD:
        return "text-amber-400";
      case PLACE_NOISE_LEVEL.VERY_LOUD:
        return "text-amber-400";
    }
  }
  return (
    <article
      className={`
            relative
            cursor-pointer
            w-20 h-20
            rounded-full p-3
            flex flex-col items-center justify-center
            ${handleCardColor()}
            `}
      onClick={callback}
    >
      <span className="text-[12px] text-center text-nowrap font-bold my-1">
        {t(`filters.noiseLevel.${noiseLevel.toLowerCase()}`)}
      </span>
      {withBadge && (
        <span
          className={`
                                absolute right-0 bottom-0
                                ${handleBadgeColor()}
                                w-5 h-5
                                flex items-center justify-center
                                text-center text-white text-[11px] font-bold rounded-full
                                `}
        >
          {actionsAmount || 0}
        </span>
      )}
    </article>
  );
};
