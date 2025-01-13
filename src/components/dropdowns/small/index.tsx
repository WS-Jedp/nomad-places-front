import { IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdLock } from "react-icons/md";
import { useAppSelector } from "../../../common/hooks/useTypedSelectors";

type SmallDropdownProps = {
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  openCallback: () => void;
  closeCallback: () => void;
};

export const SmallDropdown: React.FC<SmallDropdownProps> = ({
  children,
  isOpen,
  title,
  openCallback,
  closeCallback,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { auth } = useAppSelector((state) => state.user);
  return (
    <article
      className={`
                relative
                w-full h-auto
                flex flex-col items-center justify-center
                bg-transparent text-coffi-black
                border-t border-b border-gray-300
                transition-all duration-300 ease-in-out
                py-3
                ${disabled ? "opacity-20" : ""}
            `}
    >
      <section
        className={`
                relative
                w-full h-auto
                flex flex-row flex-nowrap items-center justify-between cursor-pointer
                transition-all duration-300 ease-in-out
            `}
        onClick={!disabled && !isOpen ? openCallback : closeCallback}
      >
        <h2
          className={`font-bold text-sm
          transition-all ease-in-out duration-300 text-start`}
        >
          {title}
        </h2>
        {
          // The user must be subscribe at least to the basic plan to use this feature
          disabled ? (
            <article className={`text-sm font-light text-coffi-black`}>
              <div className="flex flex-row flex-nowrap items-center justify-end text-end">
                <span className="mr-2">
                  {auth.isAuth
                    ? t("messages.permissions.needUpgradePlan")
                    : t("messages.auth.required.message")}
                </span>
                <MdLock size={18} color="gray" />
              </div>
            </article>
          ) : isOpen ? (
            <div className="p-1 flex items-center justify-center outline outline-gray-300 cursor-pointer rounded-full">
              <MdKeyboardArrowUp size={18} color="gray" />
            </div>
          ) : (
            <div onClick={ev => ev.preventDefault()} className="p-1 flex items-center justify-center outline outline-gray-300 cursor-pointer rounded-full">
              <MdKeyboardArrowDown size={18} color="gray" />
            </div>
          )
        }
      </section>

      <section
        className={`
                flex flex-col items-start justify-start w-full overflow-hidden
                ${isOpen ? "h-auto" : "h-0"}
                transition-all duration-300 ease-in-out
            `}
      >
        {children}
      </section>
    </article>
  );
};
