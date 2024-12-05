import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { useUserPermissions } from "../../../common/hooks/useUserPermissions";

export enum UserMenuOptions {
  register = "register",
  login = "login",
  recommend = "recommend",
  about = "about",
  logout = "logout",
  profile = "profile",
}

type UserOptionsMenuProps = {
  callback: (menuOption: UserMenuOptions) => void;
};

export const UserOptionsMenu: React.FC<UserOptionsMenuProps> = ({
  callback,
}) => {
  const { t, i18n } = useTranslation();

  const { canDiscoverPlaces } = useUserPermissions();

  const { followRequests } = useAppSelector((state) => state.social);
  const { isAuth } = useAppSelector((state) => state.user.auth);
  const userData = useAppSelector((state) => state.user.userData);

  function handleAction(option: UserMenuOptions) {
    callback(option);
  }

  function chooseLanguage(lang: "en" | "es") {
    i18n.changeLanguage(lang);
  }

  return (
    <article
      className="
                absolute right-0
                block flex-col items-start justify-start
                mt-3
                w-52  overflow-y-auto rounded-lg
                bg-white shadow-xl
                text-black
                z-[999]
            "
    >
      {isAuth ? (
        <>
          <div className="px-6 pt-3 pb-2 w-full h-auto text-start bg-gray-50">
            <h2 className="font-medium text-md mb-1">
              {t("messages.utils.hello")}{" "}
              {userData?.personalInformation?.firstName}
            </h2>
            <span className="font-semibold bg-indigo-50 p-1 rounded-md text-indigo-600 text-xs">
              {userData?.gamification.points || 0}{" "}
              {t("gamification.utils.points")}
            </span>
          </div>

          <button
            className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50 flex flex-row flex-nowrap items-center justify-between"
            onClick={() => handleAction(UserMenuOptions.profile)}
          >
            <h2 className="font-medium text-sm">
              {t("actions.auth.seeProfile")}
            </h2>
            {followRequests && followRequests.length > 0 && (
              <div className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-center text-xs">
                {followRequests.length}
              </div>
            )}
          </button>
          <button
            className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50"
            onClick={() => handleAction(UserMenuOptions.logout)}
          >
            <h2 className="font-regular text-sm font-semibold text-red-500">
              {t("actions.auth.logout")}
            </h2>
          </button>
        </>
      ) : (
        <>
          <button
            className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50"
            onClick={() => handleAction(UserMenuOptions.register)}
          >
            <h2 className="font-medium text-sm">
              {t("actions.auth.register")}
            </h2>
          </button>
          <button
            className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50"
            onClick={() => handleAction(UserMenuOptions.login)}
          >
            <h2 className="font-regular text-sm">{t("actions.auth.login")}</h2>
          </button>
        </>
      )}

      <div className="bg-gray-300 w-full h-[1px]"></div>

      {canDiscoverPlaces() && (
        <button
          className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50"
          onClick={() => handleAction(UserMenuOptions.recommend)}
        >
          <h2 className="font-regular text-sm">
            {t("actions.discover.suggest.spot")}
          </h2>
        </button>
      )}

      <button
        className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50"
        onClick={() => handleAction(UserMenuOptions.about)}
      >
        <h2 className="font-regular text-sm">
          {t("titles.general.aboutSpots")}
        </h2>
      </button>
      <hr />

      <div
        className="px-6 py-3 w-full h-auto text-start text-sm"
        onClick={() => handleAction(UserMenuOptions.about)}
      >
        <h2 className="font-regular text-sm mb-3">
          {t("translations.chooseLanguage")}
        </h2>
        <button
          className={`mr-2 underline ${
            i18n.language === "en" ? "font-bold" : ""
          }`}
          onClick={() => chooseLanguage("en")}
        >
          En
        </button>
        <button
          className={`underline ${i18n.language === "es" ? "font-bold" : ""}`}
          onClick={() => chooseLanguage("es")}
        >
          Es
        </button>
      </div>
    </article>
  );
};
