import { useEffect, useState } from "react";
import { IonHeader } from "@ionic/react";
import { FaUserAlt, FaLocationArrow } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { SearchSpotsGeneralFilters } from "../../../containers/filters/mobile/searchSpotsGeneralFilters";
import { BlurAppModal } from "../../modals/blurContainer";
import { GeneralFiltersEnum } from "../../../models/filters";
import {
  UserMenuOptions,
  UserOptionsMenu,
} from "../../../containers/menus/userOptions";
import { AppModal } from "../../modals/container";
import { AuthFormModal } from "../../../containers/auth/authFormModal";
import { useHistory, useLocation } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import {
  getUserData,
  logout,
  getUserGeoLocation,
  hideAuthModal,
  showAuthModal,
} from "../../../store/redux/slices/user";
import { TOKEN_KEY } from "../../../common/constants/localstorage";
import { SimpleButton } from "../../buttons/simple";
import { useTranslation } from "react-i18next";
import { ResetPasswordModal } from "../../../containers/auth/resetPasswordModal";
import { getUserFollowRequests } from "../../../store/redux/slices/social";
import { NewPlaceDiscoveredModal } from "../../../containers/discoveredPlaces/modals/newPlaceDiscoverModal";
import { startDiscoveringPlace, stopDiscoveringPlace } from "../../../store/redux/slices/places";

export const GeneralHeader: React.FC = () => {
  const { t } = useTranslation();

  const location = useLocation()
  const history = useHistory();

  const showDiscoveringPlace = useAppSelector((state) => state.places.discoveringPlace);
  function closeDiscoveringPlaceModal() {
    dispatch(stopDiscoveringPlace())
  }
  function openDiscoveringPlaceModal() {
    dispatch(startDiscoveringPlace())
  }

  const userLocation = useAppSelector((state) => state.user.location);
  const {
    spotAmountPeopleFilter,
    selectedSpotAmountPeopleFilter,
    spotCommoditiesFilter,
    selectedSpotCommoditiesFilter,
  } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const [showUserOptions, setShowUserOptiosn] = useState<boolean>(false);

  function handleShowUserOptions() {
    setShowUserOptiosn(!showUserOptions);
  }

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<GeneralFiltersEnum>(
    GeneralFiltersEnum.none
  );

  function handleOpenFilters(currentFilter: GeneralFiltersEnum) {
    setShowFilters(true);
    setCurrentFilter(currentFilter);
  }

  const userData = useAppSelector((state) => state.user.userData);
  const { modal: authModal, isAuth } = useAppSelector((state) => state.user.auth);
  const [registered, setRegistered] = useState<boolean>(false);

  function successfulRegister() {
    dispatch( hideAuthModal() )
    setRegistered(true);
  }

  function closeAuthModal() {
    dispatch(hideAuthModal());
  }

  const [spotDiscovered, setDiscoveredSpot] = useState(false); 

  function closeDiscoveredSpot() {
    setDiscoveredSpot(false);
  }

  function successfulSpotDiscovered() {
    setDiscoveredSpot(true);
  }

  function handlingSpotDiscovered() {
    setDiscoveredSpot(false);
    successfulSpotDiscovered()
  }

  function handleUserMenuOptions(option: UserMenuOptions) {
    setShowUserOptiosn(false);
    switch (option) {
      case UserMenuOptions.register:
        dispatch( showAuthModal() )
        break;
      case UserMenuOptions.login:
        dispatch(showAuthModal())
        break;
      case UserMenuOptions.logout:
        dispatch(logout());
        history.push("/home");  
        break;
      case UserMenuOptions.about:
        console.log("Go to about page");
        break;
      case UserMenuOptions.recommend:
        openDiscoveringPlaceModal()
        break;
      case UserMenuOptions.profile:
        history.push("/profile/me");
        break;
    }
  }

  function onLogo() {
    history.push("/home");
  }

  function handleSpotPeopleAmountFilterValue() {
    if (!selectedSpotAmountPeopleFilter)
      return t("filters.labels.howManyPeople?");
    const spotPeopleAmountOption = spotAmountPeopleFilter.find(
      (peopleAmount) => peopleAmount.id === selectedSpotAmountPeopleFilter
    );
    if (!spotPeopleAmountOption) return t("filters.labels.howManyPeople?");

    return `${spotPeopleAmountOption.text} ${t("filters.title.people")}`;
  }

  function handleSpotCommoditiesFilterValue() {
    if (!selectedSpotCommoditiesFilter)
      return t("filters.labels.whatDoYouNeed?");
    const firstSelectedCommodity = selectedSpotCommoditiesFilter[0];

    const spotCommoditiesOption = spotCommoditiesFilter.find(
      (commodity) => commodity.id === firstSelectedCommodity
    );

    if (!spotCommoditiesOption) return t("filters.labels.whatDoYouNeed?");

    if (selectedSpotCommoditiesFilter.length > 1)
      return `${spotCommoditiesOption.name} +${
        selectedSpotCommoditiesFilter.length - 1
      }`;

    return `${spotCommoditiesOption.name}`;
  }

  async function handleUserGeoLocation() {
    await dispatch(getUserGeoLocation());
  }

  async function automaticallyAuthUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      await dispatch(getUserData({ token }));
      await dispatch(getUserFollowRequests())
    }
  }

  useEffect(() => {
    handleUserGeoLocation();
    automaticallyAuthUser();
  }, []);

  const [recoverPasswordToken, setRecoverPasswordToken] = useState<string | null>(null);
  const [recoverEmail, setRecoverEmail] = useState<string | null>(null);

  function closeRecoveredPasswordModal() {
    setRecoverPasswordToken(null);
    setRecoverEmail(null);
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const recoverToken = query.get('recover_password');
    const email = query.get('email');

    if (recoverToken && email) {
      setRecoverPasswordToken(recoverToken);
      setRecoverEmail(email)
    }
  }, [])

  return (
    <IonHeader
      className="
                    flex items-center justify-between
                    fixed md:sticky top-0 w-full
                    md:border-b md:border-gray-300
                    px-3 md:px-9 py-5 m-0
                    bg-none md:bg-white
                    ion-no-border
                    z-[999]
                "
    >
      <h1
        className="block font-bold text-black text-xl cursor-pointer"
        onClick={onLogo}
      >
        Spots
      </h1>

      <div
        className="
                    flex flex-flow items-center justify-center w-full md:w-auto
                    bg-white rounded-full shadow-sm py-2 px-6 mx-5
                    border border-gray-200
                    cursor-pointer
                    hover:shadow-md
                    transition-all duration-300
                "
        onClick={() => handleOpenFilters(GeneralFiltersEnum.none)}
      >
        <button
          className="text-black text-sm font-medium"
          onClick={() => handleOpenFilters(GeneralFiltersEnum.none)}
        >
          {t("actions.general.findASpot")}
        </button>
        <span className="hidden md:flex separator h-[21px] w-[1px] bg-gray-300 mx-3"></span>
        <button
          className="hidden md:flex text-black text-sm  font-light"
          onClick={() => handleOpenFilters(GeneralFiltersEnum.people)}
        >
          {handleSpotPeopleAmountFilterValue()}
        </button>
        <span
          className="hidden md:flex separator h-[21px] w-[1px] bg-gray-300 mx-3"
          onClick={() => handleOpenFilters(GeneralFiltersEnum.commodities)}
        ></span>
        <button className="hidden md:flex text-black text-sm  font-light">
          {handleSpotCommoditiesFilterValue()}
        </button>

        <span className="rounded-full p-1 bg-blue-400 ml-3">
          <MdSearch size={18} color="white" />
        </span>
      </div>

      <section className="flex flex-row flex-nowrap items-center justify-center">
        <button
          onClick={openDiscoveringPlaceModal}
          className="
                            hidden md:flex
                            flex-items flex-nowrap 
                            py-2 px-4 mr-3 
                            items-center justify-center 
                            outline outline-1 outline-gray-300 rounded-full 
                            text-center 
                            cursor-pointer
                            hover:bg-gray-100
                        "
        >
          <span className="text-black text-sm">
            {t("actions.discover.suggest.spot")}
          </span>
        </button>

        {/* Get geolocation from user */}
        <span
          className={`
                p-3 mr-2
                hidden md:flex items-center justify-center
                rounded-full outline outline-1 ${
                  userLocation
                    ? "outline-blue-400 text-blue-600 bg-blue-100"
                    : "outline-gray-300 text-gray-500 hover:bg-gray-100"
                }
                cursor-pointer
          `}
          onClick={handleUserGeoLocation}
        >
          <FaLocationArrow size={12} />
        </span>
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
                    <span className="font-light mx-1 text-sm text-black">
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
      </section>

      {showFilters && (
        <BlurAppModal>
          <SearchSpotsGeneralFilters
            defaultFilter={currentFilter}
            closeCallback={() => setShowFilters(false)}
          />
        </BlurAppModal>
      )}

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
                                    text-black 
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

      {
        (recoverPasswordToken && recoverEmail)  && (
          <AppModal>
            <ResetPasswordModal 
              email={recoverEmail}
              token={recoverPasswordToken}
              closeCallback={closeRecoveredPasswordModal}
            />
          </AppModal>
        )
      }

      {/* Discovering place modal */}
      {
        showDiscoveringPlace && (
          <NewPlaceDiscoveredModal closeCallback={closeDiscoveringPlaceModal} onSuccess={handlingSpotDiscovered} />
        )
      }

      {spotDiscovered && (
        <AppModal>
          <section
            className="
                                    relative flex flex-col items-center justify-center
                                    w-[90%] max-w-xl
                                    bg-white 
                                    rounded-lg
                                    p-6 shadow-xl 
                                    text-black 
                                "
          >
            <h2 className="text-2xl font-bold">
              🌟 Thank you for sharing your discovery!

            </h2>
            <div className="w-full h-[2px] my-3 bg-gray-300"></div>
            <p>
              Your spot is now up for community review.
            </p>
            <p>
              It needs 6 thumbs-ups within 3 weeks to be permanently added.
            </p>
            <p className="mb-6">
              Keep an eye on its progress and we'll let you know anything about it.
            </p>
            <SimpleButton
              action={closeDiscoveredSpot}
              text={t("actions.navigation.continue")}
            />
          </section>
        </AppModal>
      )}
    </IonHeader>
  );
};
