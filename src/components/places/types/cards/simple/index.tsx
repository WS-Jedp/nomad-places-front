type SimplePlaceTypeCardProps = {
  text: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  callback: () => void;
  withBadge?: boolean;
  badgeValue?: string | number;
};

export const SimplePlaceTypeCard: React.FC<SimplePlaceTypeCardProps> = ({
  icon,
  text,
  isSelected,
  callback,
  withBadge,
  badgeValue,
}) => {
  return (
    <article
      className={`
                relative
                bg-${isSelected ? "gray-100" : "white"}
                ${
                  isSelected ? "border-2" : "border"
                } border-solid border-gray-300 ${
        isSelected ? "border-gray-500" : ""
      }
                flex flex-col items-start justify-between
                rounded-lg
                w-28 h-28
                p-3
                cursor-pointer
                hover:border-gray-500
                transition-all duration-300
            `}
      onClick={callback}
    >
      <span className="">{icon}</span>

      <h3 className="font-semibold capitalize">{text}</h3>

      {withBadge && badgeValue && (
        <span className="bg-black text-white text-center text-xs font-bold flex items-center justify-center w-[18px] h-[18px] rounded-full absolute top-[-6px] right-[-6px]">
          {badgeValue}
        </span>
      )}
    </article>
  );
};
