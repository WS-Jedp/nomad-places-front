import { IonChip, IonCol, IonLabel, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import {
  MdArrowBack,
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

export const ExternalProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
    const history = useHistory()
  const { userID } = useParams<{ userID: string }>();
  const { userData: authUser } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user.auth);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [userData, setUserData] = useState<ProfileDTO | undefined>(undefined);

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

  async function getExternalProfileData() {
    console.log(userID, "HELLO WORLD")
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
    if(authUser?.id === userID) {
        history.push('/profile/me')
        return
    }
    getExternalProfileData();
  }, [token]);

  async function onFollow() {
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
      const socialServices = new SocialServices();
      await socialServices.sendFollowRequest({ token, userToFollowID: userID });
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
                {
                    authUser?.following?.some(following => following === userID) ? (
                        <button  className="underline font-light text-md">
                            Unfollow
                        </button>
                    ) : (
                        <SimpleButton
                            text="Request to follow"
                            action={onFollow}
                        />
                    )
                }
                </div>

                <h2 className="font-bold text-4xl mt-3">
                  Hey, I'm {`${userData?.person.firstName} ${userData?.person.lastName}`} 
                </h2>
                <span className="font-light text-md">Joined in 2024</span>

                <p className="text-md font-light my-2 text-center">
                  {userData?.person.about ? (
                    <>{userData?.person.about}</>
                  ) : (
                    "There is no a description yet. :("
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
                    Following
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
                    Followers
                  </span>
                </article>
                <button
                  className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
                  onClick={onSpotsDiscovered}
                >
                  <strong className="text-2xl font-semibold my-0 py-0">
                    21
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                    Spots Discovered
                  </span>
                </button>
                <button
                  className="flex flex-col items-center justify-center text-center p-2 w-5/12 cursor-pointer hover:underline"
                  onClick={onSpotsRecommended}
                >
                  <strong className="text-2xl font-semibold my-0 py-0">
                    2
                  </strong>
                  <span className="font-light text-md my-0 py-0">
                    Spots Recommended
                  </span>
                </button>
                <article className="flex flex-col items-center justify-center text-center p-2 w-5/12">
                  <strong className="text-2xl font-semibold my-0 py-0">
                    320
                  </strong>
                  <span className="font-light text-md my-0 py-0">Points</span>
                </article>
              </IonRow>

              {/* Separator */}
              <div className="w-full h-[1px] bg-gray-400"></div>

              <IonCol
                size="12"
                className="flex flex-col items-start w-full py-5 px-9"
              >
                <h2 className="font-bold text-3xl">About</h2>
                <section className="my-3">
                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdLanguage size={30} className="mr-2" />
                    {userData?.person.languages &&
                    userData.person.languages.length > 0 ? (
                      <p className="font-light text-md">
                        Speaks {userData?.person.languages.join(", ")}
                      </p>
                    ) : (
                      <p className="font-light text-md">
                        We don't know which languages speak
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdHome size={30} className="mr-2" />
                    {userData?.person.country ? (
                      <p className="font-light text-md">
                        From Medellin, Colombia
                      </p>
                    ) : (
                      <p className="font-light text-md">
                        We don't know where it's from
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row items-center justify-start mb-3">
                    <MdOutlineWork size={30} className="mr-2" />
                    <p>
                      {userData?.person.industry &&
                      userData?.person.industry.length > 0 ? (
                        <span className="font-light text-md">
                          Focus on {userData?.person.industry.join(", ")}
                        </span>
                      ) : (
                        <span className="font-light text-md">
                          We don't know what does
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
        <SpotsDiscoveredModal closeCallback={closeSpotsDiscovered} />
      )}

      {spotsRecommendedModal && (
        <SpotsRecommendedModal closeCallback={closeSpotsRecommended} />
      )}
    </AppLayout>
  );
};
