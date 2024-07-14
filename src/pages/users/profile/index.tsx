import { IonCol, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdHome,
  MdLanguage,
  MdOutlineWork,
} from "react-icons/md";
import {
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { EditProfileModal } from "../../../containers/profile/editProfileModal";
import { SpotsDiscoveredModal } from "../../../containers/profile/spotsDiscovered";
import { SpotsRecommendedModal } from "../../../containers/profile/spotsRecommendedModal";
import { UserFollowersModal } from "../../../containers/profile/userFollowersModal";
import { UserFollowingModal } from "../../../containers/profile/userFollowingModal";
import { AppLayout } from "../../../layouts/AppLayout";

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation()
  const { followRequests } = useAppSelector((state) => state.social);
  const { userData } = useAppSelector((state) => state.user);

  const [editModal, setEditModal] = useState(false);
  function onEdit() {
    setEditModal(true);
  }
  function onClose() {
    setEditModal(false);
  }
  function onSave() {
    setEditModal(false);
  }

  const [followersModal, setFollowersModal] = useState(false);
  function onFollowers() {
    setFollowersModal(true);
  }
  function closeFollowers() {
    setFollowersModal(false);
  }

  const [followingModal, setFollowingModal] = useState(false);
  function onFollowing() {
    setFollowingModal(true);
  }
  function closeFollowing() {
    setFollowingModal(false);
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
    const lastIndustry = t(`filters.users.industries.${industries[industries.length - 1]}`)
    const currentLangIndustries = industries.map(industry => t(`filters.users.industries.${industry}`))
    return `${currentLangIndustries.join(', ')} ${t('messages.utils.and')} ${lastIndustry}`
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
          <IonRow className="flex flex-col items-center p-5">
            <figure className="w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
              <img
                src={userData?.profilePicture}
                alt={`${userData?.personalInformation.firstName} profile picture`}
                className="w-full h-full object-cover roudned-full"
              />
            </figure>

            <button
              onClick={onEdit}
              className="underline text-blue-600 py-2 font-light"
            >
              { t('actions.auth.editProfile') }
            </button>

            <h2 className="font-bold text-4xl mt-3">
              {t("messages.social.externalProfile.greeting", {name: userData?.personalInformation.firstName} )}
            </h2>
            <span className="font-light text-md">{t("messages.social.general.joinedAt", { date: getUserJoinedYear() })}</span>

            <p className="text-md font-light my-2 text-center">
              {userData?.personalInformation.about ? (
                <>{userData?.personalInformation.about}</>
              ) : (
                t('messages.social.userProfile.empty.personalDescription')
              )}
            </p>
          </IonRow>

          <IonRow className="bg-zinc-100 rounded-md flex flex-row flex-wrap items-start justify-around p-6 w-10/12 mb-5">
            <button
              className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
              onClick={onFollowing}
            >
              <strong className="text-2xl font-semibold my-0 py-0">
                {userData?.following?.length && userData?.following?.length > 0
                  ? userData.following.length
                  : 0}
              </strong>
              <span className="font-light text-md my-0 py-0">{t('messages.social.general.following')}</span>
            </button>
            <button
              className="relative flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
              onClick={onFollowers}
            >
              <strong className="relative text-2xl font-semibold my-0 py-0">
                {userData?.followers?.length && userData?.followers?.length > 0
                  ? userData.followers.length
                  : 0}
                {/* Notifications */}
                {
                    followRequests && followRequests.length > 0 && (
                        <div className="absolute top-0 right-[-12px] w-4 h-4 bg-blue-500 text-white font-bold text-xs rounded-full flex items-center justify-center text-center">
                            { followRequests.length }
                        </div>
                    )
                }
              </strong>
              <span className="font-light text-md my-0 py-0">{t('messages.social.general.followers')}</span>
            </button>
            <button
              className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
              onClick={onSpotsDiscovered}
            >
              <strong className="text-2xl font-semibold my-0 py-0">21</strong>
              <span className="font-light text-md my-0 py-0">
                Spots Discovered
              </span>
            </button>
            <button
              className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
              onClick={onSpotsRecommended}
            >
              <strong className="text-2xl font-semibold my-0 py-0">2</strong>
              <span className="font-light text-md my-0 py-0">
                Spots Recommended
              </span>
            </button>
            <article className="flex flex-col items-center justify-center text-center p-2 w-5/12">
              <strong className="text-2xl font-semibold my-0 py-0">320</strong>
              <span className="font-light text-md my-0 py-0">Points</span>
            </article>
          </IonRow>

          {/* Separator */}
          <div className="w-full h-[1px] bg-gray-400"></div>

          <IonCol
            size="12"
            className="flex flex-col items-start w-full py-5 px-9"
          >
            <h2 className="font-bold text-3xl">{t('titles.social.profile.about')}</h2>
            <section className="my-3">
              <div className="w-full flex flex-row items-center justify-start mb-3">
                <MdLanguage size={30} className="mr-2" />
                {userData?.personalInformation.languages &&
                userData.personalInformation.languages.length > 0 ? (
                  <p className="font-light text-md">
                    {t("messages.social.externalProfile.speaks", {languages: getUserLangs(userData.personalInformation.languages || []) })}
                  </p>
                ) : (
                  <p className="font-light text-md">
                    {t('messages.social.userProfile.empty.languages')}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-row items-center justify-start mb-3">
                <MdHome size={30} className="mr-2" />
                {userData?.personalInformation.country ? (
                  <p className="font-light text-md">{t("messages.social.externalProfile.from", { from: userData?.personalInformation.country  })}</p>
                ) : (
                  <p className="font-light text-md">
                    {t('messages.social.userProfile.empty.country')}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-row items-center justify-start mb-3">
                <MdOutlineWork size={30} className="mr-2" />
                <p>
                  {userData?.personalInformation.industry &&
                  userData?.personalInformation.industry.length > 0 ? (
                    <span className="font-light text-md">
                      {
                        t("messages.social.userProfile.industry", { industry: getUserIndustries(userData.personalInformation.industry) || [] })
                      }
                    </span>
                  ) : (
                    <span className="font-light text-md">
                      {t('messages.social.userProfile.empty.industry')}
                    </span>
                  )}
                </p>
              </div>
            </section>
          </IonCol>
        </IonRow>
      </IonRow>
      {/* Modals */}
      {editModal && (
        <EditProfileModal closeCallback={onClose} saveCallback={onSave} />
      )}

      {followersModal && <UserFollowersModal closeCallback={closeFollowers} />}

      {followingModal && <UserFollowingModal closeCallback={closeFollowing} />}

      {spotsDiscoveredModal && (
        <SpotsDiscoveredModal closeCallback={closeSpotsDiscovered} />
      )}

      {spotsRecommendedModal && (
        <SpotsRecommendedModal closeCallback={closeSpotsRecommended} />
      )}
    </AppLayout>
  );
};
