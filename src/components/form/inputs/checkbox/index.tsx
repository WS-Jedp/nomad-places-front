import { useTranslation } from "react-i18next";
import { MdCheck } from "react-icons/md";

type SimpleCheckboxProps = {
  id?: string;
  label: string;
  callback: () => void;
  isSelected?: boolean;
  withInputValue?: boolean;
  withInputOptions?: boolean;
  options?: any[];
  isMultiple?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
  small?: boolean;
  withBadge?: boolean;
  badgeValue?: string;
};

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  label,
  callback,
  isSelected,
  small,
  withInputValue = false,
  inputPlaceholder = "Ej. 320kbps",
  inputValue = "",
  options = [],
  withInputOptions = false,
  isMultiple = false,
  withBadge = false,
  badgeValue,
}) => {
  const { t } = useTranslation();
  return (
    <article
      className={`
                relative
                flex flex-row items-center justify-between
                rounded-lg
                w-full ${small ? "h-10" : "h-12"}
                p-3
                cursor-pointer
                hover:bg-gray-100
                transition-all duration-300
            `}
    >
      <div
        className="flex flex-row flex-nowrap w-full items-center"
        onClick={callback}
      >
        <span
          className={`
                        relative
                        flex items-center justify-center text-center
                        ${small ? "w-4 h-4 rounded-sm" : "w-4 h-4 rounded-sm"}
                        mr-2
                        border border-solid border-gray-400 
                        bg-${isSelected ? "gray-900" : "white"} 
                    `}
        >
          {isSelected && <MdCheck size={small ? 12 : 15} color="white" />}
        </span>
        <span
          className={`${
            small ? "text-sm font-normal" : "text-md font-medium"
          } text-start break-keep`}
        >
          {label}
        </span>
      </div>
    </article>
  );
};
