import { IonCol, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdHome,
  MdLanguage,
  MdOutlineWork,
  MdWork,
} from "react-icons/md";
import { useHistory, useParams } from "react-router";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { SimpleButton } from "../../../components/buttons/simple";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { SpotsDiscoveredModal } from "../../../containers/profile/spotsDiscovered";
import { SpotsRecommendedModal } from "../../../containers/profile/spotsRecommendedModal";
import { ProfileDTO } from "../../../dto/user";
import { AppLayout } from "../../../layouts/AppLayout";
import { SocialServices } from "../../../services/social";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { toFollowRequest } from "../../../store/redux/slices/social";
import { unfollowUser } from "../../../store/redux/slices/user";

export const ExternalProfilePage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { userID } = useParams<{ userID: string }>();
  const { userData: authUser } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user.auth);
  const { toFollowRequests } = useAppSelector((state) => state.social);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState<Boolean>(false);
  const [userData, setUserData] = useState<ProfileDTO | undefined>(undefined);


  function getUserJoinedYear() {
    if(userData?.createdDate) {
      const date = new Date(userData.createdDate)
      return date.getFullYear()
    }
    return ''
  }

  function getUserLangs(langs: string[]) {
    if(langs.length === 1) {
      return langs[0]
    }

    if(langs.length === 2) {
      return `${langs[0]} ${t('messages.utils.and')} ${langs[1]}`
    }

    const lastLang = langs.pop()
    return `${langs.join(', ')} ${t('messages.utils.and')} ${lastLang}`
  }

  function getUserIndustries(industries: string[]) {
    if(industries.length === 1) {
      return t(`filters.users.industries.${industries[0]}`)
    }

    if(industries.length === 2) {
      return `${t(`filters.users.industries.${industries[0]}`)} ${t('messages.utils.and')} ${t(`filters.users.industries.${industries[1]}`)}`
    }

    const lastIndustry = t(`filters.users.industries.${industries.pop()}`)
    const currentLangIndustries = industries.map(industry => t(`filters.users.industries.${industry}`))
    return `${currentLangIndustries.join(', ')} ${t('messages.utils.and')} ${lastIndustry}`
  }


  const [spotsDiscoveredModal, setSpotsDiscoveredModal] = useState(false);
  function onSpotsDiscovered() {
    setSpotsDiscoveredModal(true);
  }
  function closeSpotsDiscovered() {
    setSpotsDiscoveredModal(false);
  }

  const [spotsRecommendedModal, setSpotsRecommendedModal] = useState(false);
  function onSpotsRecommended() {
    setSpotsRecommendedModal(true);
  }
  function closeSpotsRecommended() {
    setSpotsRecommendedModal(false);
  }

  function isFollowingRequested() {
    return toFollowRequests.some(
      (request) =>
        request.receiverID === userID && request.senderID === authUser?.id
    );
  }

  async function handleOnUnfollow() {
    setIsLoadingFollow(true);
    try {
      await dispatch( unfollowUser({ userToUnfollowID: userID }) )
      if(userData && userData.followers) {
        userData.followers = userData.followers.filter(follower => follower !== authUser?.id)
      }
    } catch (error) {
      await dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
    } finally {
      setIsLoadingFollow(false)
    }
  }

  async function getExternalProfileData() {
    setIsLoading(true);
    try {
      if (!token) {
        dispatch(
          addError(
            new ControlledError(
              "You must be logged in to access this page",
              ControlledErrorType.FRONTEND_SYSTEM
            )
          )
        );
        return;
      }
      const socialServices = new SocialServices();
      const externalProfileData = await socialServices.getExternalProfile({
        token,
        userID,
      });
      setUserData(externalProfileData);
    } catch (error) {
      dispatch(
        addError(
          new ControlledError(
            "An error occurred while trying to get the user data",
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authUser?.id === userID) {
      history.push("/profile/me");
      return;
    }
    getExternalProfileData();
  }, [token]);

  async function onFollow() {
    setIsLoadingFollow(true);
    if (!token) {
      dispatch(
        addError(
          new ControlledError(
            "You must be logged in to access this page",
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      return;
    }

    try {
      await dispatch(toFollowRequest({ userToFollowID: userID }));
    } catch (error) {
      dispatch(
        addError(
          new ControlledError(
            "An error occurred while trying to follow the user",
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      console.error(error);
    } finally {
      setIsLoadingFollow(false);
    }
  }

  return (
    <AppLayout>
      <IonRow
        className="
                relative
                w-full h-full
                bg-gray-100 text-black
                flex flex-col items-center justify-start
            "
      >
        <IonRow className="flex flex-row items-start justify-center w-full h-full bg-white rounded-lg pt-20 max-w-2xl md:pt-0 overflow-y-auto overflow-x-hidden">
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <IonRow className="flex flex-col items-center p-5">
                <figure className="w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
                  <img
                    src={userData?.profilePicture}
                    alt=""
                    className="w-full h-full object-cover roudned-full"
                  />
                </figure>

                <div className="mt-3">
                  {isLoadingFollow ? (
                    <LoaderSpinner />
                  ) : authUser?.following?.some(
                      (following) => following === userID
                    ) ? (
                    <button onClick={handleOnUnfollow} className="underline font-light text-md">
                      { t('actions.social.unfollow') }
                    </button>
                  ) : isFollowingRequested() ? (
                    <p className="border-[1px] border-black text-center text-xs font-light p-2 rounded-md">
                      { t('messages.social.externalProfile.socialRequest.followSent') }
                    </p>
                  ) : (
                    <SimpleButton text={t('actions.social.follow')} action={onFollow} />
                  )}
                </div>

                <h2 className="font-bold text-4xl mt-3">
                  {t("messages.social.externalProfile.greeting", {name: `${userData?.person.firstName} ${userData?.person.lastName}`} )}
                </h2>
                <span className="font-light text-md">{t("messages.social.general.joinedAt", { date: getUserJoinedYear() })}</span>

                <p className="text-md font-light my-2 text-center">
                  {userData?.person.about ? (
                    <>{userData?.person.about}</>
                  ) : (
                    t('messages.social.externalProfile.empty.personalDescription', { name: userData?.person.firstName })
                  )}
                </p>
              </IonRow>

              <IonRow className="bg-zinc-100 rounded-md flex flex-row flex-wrap items-start justify-around p-6 w-10/12 mb-5">
                <article className="flex flex-col items-center justify-center text-center p-2 w-5/12">
                  <strong className="text-2xl font-semibold my-0 py-0">
                    {userData?.following?.length &&
                    userData?.following?.length > 0
                      ? userData.following.length
                      : 0}
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                    {t('messages.social.general.following')}
                  </span>
                </article>
                <article className="relative flex flex-col items-center justify-center text-center p-2 w-5/12">
                  <strong className="relative text-2xl font-semibold my-0 py-0">
                    {userData?.followers?.length &&
                    userData?.followers?.length > 0
                      ? userData.followers.length
                      : 0}
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                    {t('messages.social.general.followers')}
                  </span>
                </article>
                <button
                  className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
                  onClick={onSpotsDiscovered}
                >
                  <strong className="text-2xl font-semibold my-0 py-0">
                    { userData?.visitedPlacesIDs?.length || 0 }
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                  { t('visited.titles.visited') }
                  </span>
                </button>
                <button
                  className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
                  onClick={onSpotsRecommended}
                >
                  <strong className="text-2xl font-semibold my-0 py-0">
                    { userData?.discoveredPlacesIDs?.length || 0 }
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                    { t('discover.titles.discoveredPlaces') }
                  </span>
                </button>
                <article className="flex flex-col items-center justify-center text-center p-2 w-5/12">
                  <strong className="text-2xl font-semibold my-0 py-0">
                    { userData?.gamification.points || 0 }
                  </strong>
                  <span className="font-light text-md my-0 py-0">{ t('gamification.utils.points') }</span>
                </article>
              </IonRow>

              {/* Separator */}
              <div className="w-full h-[1px] bg-gray-400"></div>

              <IonCol
                size="12"
                className="flex flex-col items-start w-full py-5 px-9"
              >
                <h2 className="font-bold text-3xl">
                  {t('titles.social.externalProfile.about', {name: userData?.person.firstName})}
                </h2>
                <section className="my-3">
                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdLanguage size={30} className="mr-2" />
                    {userData?.person.languages &&
                    userData.person.languages.length > 0 ? (
                      <p className="font-light text-md">
                        {
                          t('messages.social.externalProfile.speaks', {languages: getUserLangs(userData.person.languages)})
                        }
                      </p>
                    ) : (
                      <p className="font-light text-md">
                        {t('messages.social.externalProfile.empty.languages', { name: userData?.person.firstName })}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdHome size={30} className="mr-2" />
                    {userData?.person.country ? (
                      <p className="font-light text-md">
                        {
                          t('messages.social.externalProfile.from', {from: userData.person.country})
                        }
                      </p>
                    ) : (
                      <p className="font-light text-md">
                        {t('messages.social.externalProfile.empty.country', { name: userData?.person.firstName })}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdOutlineWork size={30} className="mr-2" />
                    <p>
                      {userData?.person.industry &&
                      userData?.person.industry.length > 0 ? (
                        <span className="font-light text-md">
                          {
                            t('messages.social.externalProfile.industry', {industry: getUserIndustries(userData.person.industry)})
                          }
                        </span>
                      ) : (
                        <span className="font-light text-md">
                          {t('messages.social.externalProfile.empty.industry')}
                        </span>
                      )}
                    </p>
                  </div>
                </section>
              </IonCol>
            </>
          )}
        </IonRow>
      </IonRow>
      {/* Modals */}
      {spotsDiscoveredModal && (
        <SpotsDiscoveredModal closeCallback={closeSpotsDiscovered} externalProfileID={userID} />
      )}

      {spotsRecommendedModal && (
        <SpotsRecommendedModal closeCallback={closeSpotsRecommended} externalProfileID={userID} />
      )}
    </AppLayout>
  );
};
