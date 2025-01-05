import { useTranslation } from "react-i18next";
import { MdCheck } from "react-icons/md";

type SimpleCheckboxProps = {
  id?: string
  label: string;
  callback: () => void;
  isSelected?: boolean;
  withInputValue?: boolean;
  withInputOptions?: boolean;
  options?: any[]
  isMultiple?: boolean
  inputValue?: string;
  inputPlaceholder?: string;
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
  inputPlaceholder = "Ej. 320kbps",
  inputValue = "",
  options = [],
  withInputOptions = false,
  isMultiple = false
}) => {
  const { t } = useTranslation()
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
      <div className="flex flex-row flex-nowrap w-full" onClick={callback}>
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
          className="w-auto max-w-[60px] bg-transparent border-b-[1px] text-xs text-end z-30"
          placeholder={inputPlaceholder}
          onChange={(ev) => {
            ev.preventDefault()
            onChangeInputValue(ev.target.value)
          }}
          defaultValue={inputValue}
        />
      )}

      {
        withInputOptions && onChangeInputValue && (
          <select multiple={isMultiple} className="max-w-[30%] bg-white border border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-black cursor-pointer" defaultValue={inputValue}>
            {
              options.map(opt => (
                <option value={opt} key={opt}>{t(`filters.options.${opt}`)}</option>
              ))
            }
          </select>
        )
      }
    </article>
  );
};
