import { IonChip, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { MdCheck } from "react-icons/md";

type MultipleOptionsPickerProps = {
  id?: string;
  label: string;
  isSelected?: boolean;
  options?: string[];
  selected?: string[];
  onSelect: (value: string) => void;
  small?: boolean;
};

export const MutipleOptionsPicker: React.FC<MultipleOptionsPickerProps> = ({
  label,
  small,
  onSelect,
  selected = [],
  options = [],
  id,
}) => {
  const { t } = useTranslation();

  const isSelected = (value: string) => selected.includes(value);

  return (
    <>
      <span
        className={`${
          small ? "text-xs font-semibold" : "text-md font-semibold"
        } text-start break-keep mb-1`}
      >
        {label}
      </span>
      <article className="relative w-full overflow-x-auto">
        <section
          className="
          relative
          w-max
          flex flex-row flex-nowrap items-start justify-start
          overflow-x-auto
        "
        >
          {options.map((opt) => (
            <article
              className={`relative inline-flex flex-col w-48 h-20 justify-between p-2 mr-2 my-2 rounded-md ${
                !isSelected(opt)
                  ? "bg-white-200 border-[1px] border-solid border-gray-300"
                  : "bg-gray-100 border-solid border-[1px] border-gray-300"
              } hover:bg-gray-200 duration-300 ease-in-out cursor-pointer`}
              onClick={() => onSelect(opt)}
            >
              <article
                className={`
                          relative
                          flex items-center justify-center text-center
                          ${small ? "w-[15px] h-[15px] rounded-sm" : "w-[18px] h-[18px] rounded-md"}
                          mr-2
                          border border-solid border-gray-400 
                          bg-${isSelected(opt) ? "gray-900" : "transparent"} 
                      `}
              >
                {isSelected(opt) && <MdCheck size={12} color="white" />}
              </article>
              <p
                className={`text-sm font-normal my-2 ${
                  !isSelected(opt) ? "text-gray-600" : "text-black"
                }`}
              >
                {t(`filters.options.${opt}`)}
              </p>
            </article>
          ))}
        </section>
      </article>
    </>
  );
};
