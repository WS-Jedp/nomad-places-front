import { IonHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { AuthFormModal } from "../../../containers/auth/authFormModal";
import {
  UserMenuOptions,
  UserOptionsMenu,
} from "../../../containers/menus/userOptions";
import {
  hideAuthModal,
  logout,
  showAuthModal,
} from "../../../store/redux/slices/user";
import { SimpleButton } from "../../buttons/simple";
import { AppModal } from "../../modals/container";

export const BackNavigationHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const userData = useAppSelector((state) => state.user.userData);
  const { modal: authModal, isAuth } = useAppSelector((state) => state.user.auth);
  const [registered, setRegistered] = useState<boolean>(false);
  const [showUserOptions, setShowUserOptiosn] = useState<boolean>(false);

  function successfulRegister() {
    dispatch(hideAuthModal());
    setRegistered(true);
  }

  function closeAuthModal() {
    dispatch(hideAuthModal());
  }

  function handleShowUserOptions() {
    setShowUserOptiosn(!showUserOptions);
  }

  function handleUserMenuOptions(option: UserMenuOptions) {
    setShowUserOptiosn(false);
    switch (option) {
      case UserMenuOptions.register:
        dispatch(showAuthModal());
        break;
      case UserMenuOptions.login:
        dispatch(showAuthModal());
        break;
      case UserMenuOptions.logout:
        dispatch(logout());
        toast.success(t("messages.auth.success.logout"));
        break;
      case UserMenuOptions.about:
        console.log("Go to about page");
        break;
      case UserMenuOptions.recommend:
        console.log("Go to recommend page and auth if not logged in");
        break;
    }
  }

  return (
    <IonHeader
      className="
                    flex items-center justify-between
                    sticky top-0 w-full
                    border-b border-gray-300
                    p-6 py-5 m-0
                    bg-white
                    ion-no-border
                    z-50
                "
    >
      <h1
        className="bg-white cursor-click d-flex flex-row flex-nowrap"
        onClick={goBack}
      >
        <MdArrowBack className="inline-flex mr-1" />
        <span className="inline-flex font-bold text-coffi-black text-sm">Coffi</span>
      </h1>

      <span
        className="
                            relative
                            p-3
                            inline-block items-center justify-center
                            bg-white
                            rounded-full outline outline-1 outline-gray-300
                            hover:bg-gray-100
                            z-[999]
                        "
      >
        <div
          className="w-full h-full cursor-pointer flex flex-row flex-nowrap items-center justify-center"
          onClick={handleShowUserOptions}
        >
            <FaUserAlt size={13} color="gray" />

            {
                isAuth ? (
                    <span className="font-light mx-1 text-sm">
                        {
                            userData?.username
                        }
                    </span>
                ) : (
                    <IoMdMenu size={18} color="gray" className="ml-1" />
                )
            }
        </div>

        {showUserOptions && (
          <UserOptionsMenu callback={handleUserMenuOptions} />
        )}
      </span>

      {authModal && (
        <AppModal>
          <AuthFormModal
            closeCallback={closeAuthModal}
            successfulRegisterCallback={successfulRegister}
          />
        </AppModal>
      )}

      {registered && (
        <AppModal>
          <section
            className="
                                    relative flex flex-col items-center justify-center
                                    w-[90%] max-w-xl
                                    bg-white 
                                    rounded-lg
                                    p-6 shadow-xl 
                                    text-coffi-black 
                                "
          >
            <h2 className="text-2xl font-bold">
              {t("messages.welcomeToSpots.title")}
            </h2>
            <div className="w-full h-[2px] my-3 bg-gray-300"></div>
            <p className="mb-6">{t("messages.welcomeToSpots.message")}</p>
            <SimpleButton
              action={() => setRegistered(false)}
              text={t("actions.navigation.continue")}
            />
          </section>
        </AppModal>
      )}
    </IonHeader>
  );
};
