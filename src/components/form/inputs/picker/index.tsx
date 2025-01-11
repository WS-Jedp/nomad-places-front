import { IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { MdCheck } from "react-icons/md";

type SimpleCheckboxProps = {
  id?: string;
  label: string;
  currentSelection?: string;
  options?: any[];
  onChangeInputValue: (value: string) => void;
  small?: boolean;
};

export const OptionsPicker: React.FC<SimpleCheckboxProps> = ({
  label,
  small,
  onChangeInputValue,
  options = [],
  id,
  currentSelection,
}) => {
  const { t } = useTranslation();
  return (
    <article
      className={`
                relative
                flex flex-col items-start justify-between
                rounded-lg
                w-full 
                mb-1
            `}
    >
      <span
        className={`${
          small ? "text-xs font-semibold" : "text-md font-semibold"
        } text-start break-keep mb-1`}
      >
        {label}
      </span>

      <div
        className="hover:bg-gray-100
                cursor-pointer
                transition-all duration-300 w-full"
      >
        <select
          className="w-full bg-white border border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-black cursor-pointer"
          defaultValue={currentSelection}
          onChange={(e) => onChangeInputValue(e.target.value)}
          id={id ? `${id}-option` : `${label}-option`}
        >
          <option value="null">No aplicable</option>
          {options.map((opt) => (
            <option value={opt} key={opt} selected={currentSelection === opt}>
              {t(`filters.options.${opt}`)}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
};
