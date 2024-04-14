import { MdCheck } from "react-icons/md";

type SimpleCheckboxProps = {
  label: string;
  callback: () => void;
  isSelected?: boolean;
  withInputValue?: boolean;
  onChangeInputValue?: (value: string) => void;
  small?: boolean;
};

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  label,
  callback,
  isSelected,
  small,
  onChangeInputValue,
  withInputValue = false,
}) => {
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
      onClick={callback}
    >
      <div className="flex flex-row flex-nowrap">
        <span
          className={`
                        relative
                        flex items-center justify-center text-center
                        ${small ? "w-4 h-4 rounded-sm" : "w-6 h-6 rounded-md"}
                        mr-2
                        border border-solid border-gray-400 
                        bg-${isSelected ? "gray-900" : "white"} 
                    `}
        >
          {isSelected && <MdCheck size={small ? 12 : 15} color="white" />}
        </span>
        <span
          className={`${
            small ? "text-sm font-normal" : "text-md font-semibold"
          } text-start break-keep`}
        >
          {label}
        </span>
      </div>

      {withInputValue && onChangeInputValue && (
        <input
          type="text"
          className="w-auto max-w-[60px] bg-transparent border-b-[1px] text-xs text-end"
          placeholder="Ej. 320kbps"
          onChange={(ev) => onChangeInputValue(ev.target.value)}
        />
      )}
    </article>
  );
};
