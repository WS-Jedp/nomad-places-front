import { IonCol, IonRow } from "@ionic/react";
import { AvatarGroup } from "../../components/avatar/group";
import {
  SimpleButton,
  SimpleButtonOutline,
} from "../../components/buttons/simple";
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity";
import { useEffect, useMemo, useState } from "react";
import { AppModal } from "../../components/modals/container";
import { MultimediaSliderModal } from "../multimediaSliderModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { UserActionsModal } from "../session/userActionsModal";
import { BlurAppModal } from "../../components/modals/blurContainer";
import {
  createSocket,
  userJoinedSession,
  userLeftSession,
} from "../../store/redux/slices/userSession";
import {
  PLACE_SESSION_ACTIONS_ENUM,
  PlaceSessionRecentAcitivityResp,
  UPDATE_ACTIONS,
} from "../../models/session";
import { HandleActionCardType } from "../../components/actions/cards/handleActionType";
import {
  addActionToCurrentSession,
  addMultipleActionsToCurrentSession,
  addRecentActivityAction,
  addUserIntoCachedSession,
  getSpotCachedSession,
  removeUserFromCachedSession,
  uploadRecentActivity,
} from "../../store/redux/slices/spotSession";
import { AmountMindsetActions } from "../../components/mindsets/containers/amountMindsetActions";
import { QuickActionModal } from "../session/quickActionModal";
import { MINDSETS } from "../../models/mindsets";
import { AmountOfPeopleActionsAmount } from "../../components/amountOfPeople/containers";
import { HandleMindsetTags } from "../../components/tags/mindsets";
import { useTranslation } from "react-i18next";
import { FaLock, FaPlus } from "react-icons/fa";
import { setPointsToUser, showAuthModal } from "../../store/redux/slices/user";
import { userInAllowedRange } from "../../common/utils/geoLocation";
import { SatelliteLoader } from "../../components/loaders/satellite";
import { addError } from "../../store/redux/slices/controlledErrors";
import { ControlledError } from "../../common/controlledError";
import { ControlledErrorType } from "../../common/controlledError/types";
import { getLocalISODate } from "../../common/utils/dates";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { MULTIMEDIA_TYPE } from "../../models/multimedia";
import { RecentActivityButton } from "../../components/buttons/recentActivityButton";
import { RecentActivityFileModal } from "../session/recentActivityFileModal";
import { PayloadAction } from "@reduxjs/toolkit";
import { PlaceSessionAction } from "../../models/session/actions";
import { UserGamification } from "../../models/gamification";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { useHistory } from "react-router";
import { returnUpForward } from "ionicons/icons";
import { findPlace } from "../../store/redux/slices/places";
import { LoaderSpinner } from "../../components/loaders/spinner";
import { NoiseLevelActionsAmount } from "../../components/noiseLevel/sessionContainer";
import { PLACE_NOISE_LEVEL } from "../../models/placeNoiseLevel";

interface PlaceSessionDetailProps {
  withBackButtonAction?: boolean;
  withCloseSessionButton?: boolean;
}

export const PlaceSessionDetail: React.FC<PlaceSessionDetailProps> = ({
  withBackButtonAction = false,
  withCloseSessionButton = false,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { canAuthSession } = useUserPermissions();

  const dispatch = useAppDispatch();
  const currentPlace = useAppSelector((state) => state.places.currentPlace);
  const { currentSessionActions, cachedSession } = useAppSelector(
    (state) => state.spotSession
  );

  function getCurrentSessionActionsOrderByDate() {
    if (!currentSessionActions || currentSessionActions.length === 0) return [];

    return currentSessionActions.slice().sort((a, b) => {
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });
  }

  const {
    userData,
    auth,
    location: userLocation,
  } = useAppSelector((state) => state.user);
  const { socket, sessionID } = useAppSelector((state) => state.userSession);

  const [recentActivityOpen, setRecentActivityOpen] = useState<boolean>(false);
  const [recentActivityOpened, setRecentActivityOpened] = useState<number[]>(
    []
  );
  const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);
  const [userInSession, setUserInSession] = useState<boolean>(false);
  const [joiningSessionLoader, setJoiningSessionLoader] =
    useState<boolean>(false);

  const [leaveSessionModal, setLeaveSessionModal] = useState(false);
  const [updateSessionModal, setUpdateSessionModal] = useState(false);
  const [quickActionModal, setQuickActionModal] = useState(false);
  const [quickActionType, setQuickActionType] = useState<UPDATE_ACTIONS>();
  const [quickActionValue, setQuickActionValue] = useState<string>();

  function handleRecentActivityOpen(index: number) {
    setMediaSelectedIndex(index);
    setRecentActivityOpen(true);
    setRecentActivityOpened([...recentActivityOpened, index]);
  }

  function onRecentActivitySelectionChange(index: number) {
    setRecentActivityOpened([...recentActivityOpened, index]);
  }

  // =========================
  // SESSION DATA METHODS
  // =========================
  const [fetchingSessionData, setFetchingSessionData] = useState(true);

  function goToMapRoute() {
    if (!currentPlace?.id) return;
    return history.push(`/home/detail/${currentPlace?.id}`);
  }

  function handleGoBack() {
    history.push("/home");
  }

  async function handleEmptyCurrentPlace() {
    if (!currentPlace?.id) return;
    await findPlace({ placeID: currentPlace?.id });
    if (!currentPlace) return handleGoBack();
  }

  async function handleCreateComponent() {
    if (!currentPlace?.id) return history.push("/home");
    if (!currentPlace) return handleEmptyCurrentPlace();
  }

  async function getCachedSession() {
    if (!currentPlace || !currentPlace.id) return;
    await dispatch(getSpotCachedSession({ spotID: currentPlace.id }));
  }

  async function getSessionData() {
    await handleCreateComponent();
    await getCachedSession();
    setFetchingSessionData(false);
  }

  useEffect(() => {
    getSessionData();
  }, []);

  // =========================
  // ACCESS TO SESSION METHODS
  // =========================
  async function connectUserToSession(placeID: string) {
    setJoiningSessionLoader(true);
    if (!socket && userData) {
      await dispatch(
        createSocket({
          placeID: placeID,
          userID: userData.id,
          username: userData.username,
        })
      );
    }
    if (!socket) {
      setJoiningSessionLoader(false);
      return;
    }

    await socket?.joinSession();
  }

  async function handleJoinSession() {
    setJoiningSessionLoader(true);

    if (!currentPlace) return;

    if (!userLocation.latitude || !userLocation.longitude) {
      dispatch(
        addError(
          new ControlledError(
            t("spots.messages.session.unallowed.userLocation"),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      setJoiningSessionLoader(false);
      return;
    }

    if (
      !userInAllowedRange(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        currentPlace.location
      )
    ) {
      dispatch(
        addError(
          new ControlledError(
            t("spots.messages.session.unallowed.locationRange"),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      setJoiningSessionLoader(false);
      return;
    }

    await connectUserToSession(currentPlace.id);
  }

  async function disconnectUserFromSession(sessionID: string) {
    if (!socket || !userData?.id) return;
    setJoiningSessionLoader(true);
    await dispatch(userLeftSession());
    await dispatch(removeUserFromCachedSession({ userID: userData.id }));
    await socket.leaveSession(sessionID);
  }

  async function handleLeaveSession() {
    if (!currentPlace || !sessionID) return;
    await disconnectUserFromSession(sessionID);
    setLeaveSessionModal(false);
    setUserInSession(false);
  }

  // ======================================
  // ====== UPDATE COMMUNITY ACTIONS ======
  useEffect(() => {
    if (!socket) return;
    socket?.onSessionMessage(async (payload) => {
      if (payload.type === PLACE_SESSION_ACTIONS_ENUM.JOIN) {
        if (userData?.id === payload.userID) {
          await dispatch(userJoinedSession({ sessionID: payload.sessionID }));
          await dispatch(addUserIntoCachedSession({ user: userData }));
          setUserInSession(true);
          if (payload.action?.userGamification?.earnedPoints) {
            toast.success(
              t("gamification.session.earned.joinSession", {
                points: payload.action.userGamification.earnedPoints,
              })
            );
            dispatch(
              setPointsToUser({
                points: payload.action.userGamification.points,
              })
            );
          }
        }
      } else if (payload.type === PLACE_SESSION_ACTIONS_ENUM.LEAVE) {
        if (userData?.id === payload.userID) {
          await dispatch(userLeftSession());
          setUserInSession(false);
        }
      }

      if (payload.type === PLACE_SESSION_ACTIONS_ENUM.RECENT_ACTIVITY) {
        const recentActivityPayload = JSON.parse(payload.action.payload) as {
          createdDateISO: string;
          type: MULTIMEDIA_TYPE;
          url: string;
          userID: string;
          username: string;
          userPhotoURL: string;
        };
        await dispatch(
          addRecentActivityAction({
            id: payload.action.id,
            createdDate: getLocalISODate(payload.action.createdDate),
            type: recentActivityPayload.type,
            url: recentActivityPayload.url,
            userID: payload.action.userID,
            username: payload.action.username,
            userPhotoURL: recentActivityPayload.userPhotoURL,
          })
        );
      } else if (payload.action) {
        await dispatch(addActionToCurrentSession({ action: payload.action }));
      }
      setJoiningSessionLoader(false);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket?.onSessionUpdated(async (payload) => {
      if (!Array.isArray(payload)) {
        toast.error(t(`messages.session.update.errors.${payload.error.type}`));
      } else {
        payload.forEach((action) => {
          if (action.userGamification?.earnedPoints) {
            toast.success(
              t("gamification.session.earned.specificUpdate", {
                points: action.userGamification.earnedPoints,
              })
            );
            dispatch(
              setPointsToUser({ points: action.userGamification.points })
            );
          }
        });

        await dispatch(addMultipleActionsToCurrentSession(payload));
      }
      setJoiningSessionLoader(false);
    });
  }, [socket]);

  function handleLogin() {
    dispatch(showAuthModal());
  }

  // Method to check if the user is in the session
  // If the user is in the session, then we need to add the user into the session
  async function isUserInSession() {
    if (
      cachedSession?.usersInSession?.find((user) => user.id === userData?.id)
    ) {
      if (!currentPlace || !userData || !sessionID) return;

      await dispatch(userJoinedSession({ sessionID: sessionID }));
      await dispatch(
        createSocket({
          placeID: currentPlace.id,
          userID: userData.id,
          username: userData.username,
          quickJoin: true,
        })
      );
      setUserInSession(true);
      return;
    }
    setUserInSession(false);
  }

  useEffect(() => {
    isUserInSession();
  }, [cachedSession?.usersInSession, sessionID]);

  // ============================
  // QUICK UPDATE ACTIONS METHODS
  // ============================
  function handleMindsetQuickAction(
    actionType: UPDATE_ACTIONS,
    value: MINDSETS
  ) {
    validateUserInSession();

    setQuickActionModal(true);
    setQuickActionType(actionType);
    setQuickActionValue(value);
  }

  function handleNoiseLevelQuickAction(
    actionType: UPDATE_ACTIONS,
    value: PLACE_NOISE_LEVEL
  ) {
    validateUserInSession();

    setQuickActionModal(true);
    setQuickActionType(actionType);
    setQuickActionValue(value);
  }

  function handleAmountOfPeopleQuickAction(
    actionType: UPDATE_ACTIONS,
    value: string
  ) {
    validateUserInSession();

    setQuickActionModal(true);
    setQuickActionType(actionType);
    setQuickActionValue(value);
  }

  function handleUpdateMultipleActions(
    actions: { type: UPDATE_ACTIONS; data: any }[]
  ) {
    validateUserInSession();

    setJoiningSessionLoader(true);
    setUpdateSessionModal(false);
    if (!sessionID) {
      setJoiningSessionLoader(false);
      return;
    }

    socket?.updateSessionMultipleActions({
      sessionID: sessionID,
      actions: actions,
    });
  }

  const [recentActivityFile, setRecentActivityFile] = useState<File | null>(
    null
  );
  const [recentActivityLoading, setRecentActivityLoading] =
    useState<boolean>(false);
  const [recentActivityError, setRecentActivityError] = useState<string | null>(
    null
  );

  function validateUserInSession() {
    if (!userInSession) {
      toast.error(t("spots.messages.session.unallowed.mustJoinToUpdate"));
      throw new Error(t("spots.messages.session.unallowed.mustJoinToUpdate"));
    }
  }

  async function onRecentActivityFileChange(file: File) {
    setRecentActivityFile(file);
  }

  function onRecentActivityFileError(error: string) {
    setRecentActivityError(error);
  }

  function onRecentActivityFileSuccess(file: File) {
    setRecentActivityFile(file);
  }

  const lastUpdateAction = useMemo(() => {
    if(!currentPlace || !currentPlace.sessionCachedData || !currentPlace.sessionCachedData.lastActions || !currentPlace.sessionCachedData.lastActions.length) return null
    const allUpdateActions = currentPlace.sessionCachedData.lastActions.filter(action => action.type === PLACE_SESSION_ACTIONS_ENUM.UPDATE)

    if(!allUpdateActions.length) return null
    return allUpdateActions[0]

  }, [currentPlace])

  async function shareRecentActivirtyMedia() {
    if (!recentActivityFile || !sessionID || !currentPlace?.id || !auth.token)
      return;
    setRecentActivityLoading(true);

    // Send the file to the backend
    const resp = (await dispatch(
      uploadRecentActivity({
        multimedia: recentActivityFile,
        sessionID: sessionID,
        spotID: currentPlace.id,
        token: auth.token,
      })
    )) as PayloadAction<PlaceSessionRecentAcitivityResp>;

    // Send URL to the socket and share with users
    if (resp.payload && resp.payload.data.url) {
      socket?.shareRecentActivity({
        sessionID: sessionID,
        url: resp.payload.data.url,
        type: resp.payload.data.type,
        userProfilePicture: userData?.profilePicture || "",
      });
    }

    await setTimeout(() => {
      setRecentActivityLoading(false);
      setRecentActivityFile(null);
    }, 3000);
  }

  if (!currentPlace) return null;

  if (fetchingSessionData)
    return (
      <IonRow className="flex flex-col justify-center items-center w-full h-full bg-gray-100">
        <LoaderSpinner />
      </IonRow>
    );

  return (
    <section className="relative flex flex-col justify-between w-full h-full bg-gray-100">
      <section className="relative w-full h-full overflow-y-auto">
        {/* Go Back button */}
        {withBackButtonAction && (
          <IonRow
            className="
                    relative
                    flex flex-row w-full h-16 p-6 md:py-3
                    items-center
                    border-b border-gray-300
                    mb-1
                "
          >
            <BackNavigationButton goToURL={`/home/detail/${currentPlace.id}`} />
          </IonRow>
        )}

        <section
          className="realtive w-full h-h-16
            flex flex-row items-center justify-start
            px-3 py-1
            overflow-hidden overflow-x-auto
            border-b-[1px] border-gray-300 
          "
        >
          <div className="border-solid border-r-[1px] border-gray-300 mr-3">
            <RecentActivityButton
              callback={validateUserInSession}
              onError={onRecentActivityFileError}
              onSuccess={onRecentActivityFileSuccess}
            />
          </div>
          {cachedSession?.lastRecentlyActivities?.map((activity, index) => (
            <RecentActivityCard
              key={index}
              callback={() => handleRecentActivityOpen(index)}
              isImage={activity.type === MULTIMEDIA_TYPE.IMAGE}
              checked={recentActivityOpened.includes(index)}
            />
          ))}
        </section>

        <IonRow className="w-full p-3 border-b border-gray-300 flex flex-col flex-nowrap items-start justify-start">
          <h1 className="font-bold text-lg md:text-xl">
            {t("spots.session.peopleUpdates")}
          </h1>

          <p className="text-coffi-black font-normal text-sm mt-1">
            {t("spots.session.about")}.
          </p>
        </IonRow>

        <IonRow className="w-full p-3 pb-5 relative flex flex-col flex-nowrap border-b border-gray-300">
          {lastUpdateAction &&  (
              <section className="my-1">
                <h2 className="text-xs font-light">
                  {t("spots.messages.session.lastUpdateAt")}{" "}
                  <span className="font-light">
                    -{" "}
                    {format(
                      parseISO(getLocalISODate(lastUpdateAction.createdDate)),
                      "p"
                    )}
                  </span>
                </h2>
              </section>
            )}

          <section className="mb-3">
            <h2 className="font-bold text-sm mb-1">
              {t("spots.session.usersInSession")}
            </h2>
            <article className="flex flex-row w-full items-start justify-start pb-3">
              <AvatarGroup users={cachedSession?.usersInSession || []} />
            </article>
            <h2 className="font-bold text-sm mb-1">
              {t("spots.session.perfectTo")}
            </h2>
            <AmountMindsetActions mindsetCallback={handleMindsetQuickAction} />
            {/* <HandleMindsetTags mindset={MINDSETS.UNKNOWN} /> */}
          </section>

          <IonRow className="relative w-full flex flex-row mb-3">
            <IonCol size="12">
              <h2 className="font-bold text-sm">
                {t("spots.session.amountOfPeople")}
              </h2>
              <div className="my-1">
                <AmountOfPeopleActionsAmount
                  callback={handleAmountOfPeopleQuickAction}
                />
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="relative w-full flex flex-row mb-3">
            <IonCol size="12">
              <h2 className="font-bold text-sm">
                {t("spots.session.updateNoiseLevel")}
              </h2>
              <div className="my-1">
                <NoiseLevelActionsAmount
                  callback={handleAmountOfPeopleQuickAction}
                />
              </div>
            </IonCol>
          </IonRow>
          <section className="w-full mb-2">
            {/* <p className="font-regular text-xs my-3 text-left">Last update made 30 minutes ago</p> */}
          </section>
          {userInSession ? (
            <article className="flex flex-row flex-nowrap w-full items-center justify-start">
              {/* <div className="w-5/10 mr-1">
                <SimpleButton
                  action={() => setUpdateSessionModal(true)}
                  text={t("actions.session.update")}
                  loading={joiningSessionLoader}
                />
              </div> */}
              <SimpleButtonOutline
                action={() => setLeaveSessionModal(true)}
                text={t("actions.session.leave")}
              />
            </article>
          ) : (
            // JOIN SESSION BUTTON
            canAuthSession() && (
              <SimpleButton
                action={handleJoinSession}
                text={t("actions.session.join")}
                loading={joiningSessionLoader}
                disabled={!auth.isAuth}
              />
            )
          )}
        </IonRow>

        <section className="w-full overflow-y-auto">
          <article className="w-full pt-3 border-solid border-b-[1px] border-gray-300">
            <h2 className="w-full font-bold text-md mb-1 pb-3 px-3">
              {t("spots.session.lastsUpdates")}:
            </h2>
          </article>
          <section className="relative flex flex-col flex-nowrap mb-3">
            <ol className="w-full h-auto my-3">
              {currentSessionActions.length > 0 ? (
                // Order by date, last action first
                getCurrentSessionActionsOrderByDate().map((action, index) => {
                  return (
                    <li key={index}>
                      <HandleActionCardType action={action} />
                    </li>
                  );
                })
              ) : (
                <li className="px-3">
                  <p className="text-xs font-light px-3 py-3 w-full bg-gray-200">
                    {t("spots.messages.noCommunityActions")}
                  </p>
                </li>
              )}
            </ol>
          </section>
        </section>
      </section>

      {withCloseSessionButton && (
        <article className="bg-white w-full h-12 shadow-md flex items-center justify-end px-3">
          <button
            className="
            px-6 py-1 
            font-light text-xs text-coffi-black border border-solid border-gray-300 
            rounded-md
            hover:bg-gray-200 transition-all ease-in-out duration-300
          "
            onClick={goToMapRoute}
          >
            {t("actions.general.seeMap")}
          </button>
        </article>
      )}

      {recentActivityOpen && (
        <AppModal>
          <MultimediaSliderModal
            images={cachedSession?.lastRecentlyActivities || []}
            closeCallback={() => setRecentActivityOpen(false)}
            currentImage={mediaSelectedIndex}
            recentActivity
            onChangeRecentActivity={onRecentActivitySelectionChange}
          />
        </AppModal>
      )}

      {recentActivityFile && (
        <AppModal>
          <RecentActivityFileModal
            file={recentActivityFile}
            onSave={shareRecentActivirtyMedia}
            onCancel={() => setRecentActivityFile(null)}
            isLoading={recentActivityLoading}
          />
        </AppModal>
      )}

      {updateSessionModal && (
        <BlurAppModal>
          <UserActionsModal
            closeCallback={() => setUpdateSessionModal(false)}
            onSaveCallback={handleUpdateMultipleActions}
          />
        </BlurAppModal>
      )}

      {quickActionModal && quickActionType && quickActionValue && (
        <AppModal>
          <QuickActionModal
            onCancel={() => setQuickActionModal(false)}
            onUpdate={() => setJoiningSessionLoader(true)}
            actionType={quickActionType}
            value={quickActionValue}
          />
        </AppModal>
      )}

      {leaveSessionModal && (
        <AppModal>
          <article className="w-full max-w-xs bg-white rounded-lg text-coffi-black p-6">
            <h2 className="font-bold text-2xl">
              {t("spots.information.leaveTheSession")}
            </h2>
            <div className="w-full h-[1px] bg-black my-3"></div>
            <p className="text-md font-light">
              {t("spots.messages.session.leaveSessionConfirmation")}
            </p>

            <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
              <SimpleButton
                action={handleLeaveSession}
                text={t("actions.session.leave")}
              />
              <span
                onClick={() => setLeaveSessionModal(false)}
                className="cursor-pointer font-light my-3 underline text-gray-600 text-sm"
              >
                {t("actions.general.cancel")}
              </span>
            </div>
          </article>
        </AppModal>
      )}

      {/* Not logged in user modal */}
      {!auth.isAuth && (
        <section
          style={{
            background:
              "linear-gradient(180deg, rgba(62, 40, 111, 0.961), #110226)",
          }}
          className="absolute z-40 w-full h-full flex flex-col items-center justify-center text-center text-white"
        >
          <FaLock size={90} className="my-5" color="white" />
          <h2 className="font-bold text-2xl">
            {t("messages.auth.notLoggedIn")}
          </h2>
          <div className="w-4/6 h-[1px] bg-white my-3"></div>
          <p className="text-md font-light mx-3">
            {t("messages.auth.required.message")}
          </p>
          <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
            <SimpleButton action={handleLogin} text={t("actions.auth.login")} />
          </div>
        </section>
      )}

      {/* User doens't have a plan with enough permissions modal */}
      {auth.isAuth && !canAuthSession() && (
        <section
          style={{
            background:
              "linear-gradient(180deg, rgba(62, 40, 111, 0.961), #110226)",
          }}
          className="absolute z-40 w-full h-full flex flex-col items-center justify-center text-center"
        >
          <article className="m-9 w-3/4 h-auto text-white">
            <h2 className="font-bold text-2xl">
              {t("messages.permissions.unlockRealTimeData")}
            </h2>
            <div className="w-full mx-auto h-[1px] bg-white my-3"></div>
            <p className="text-md font-light mx-3">
              {t("messages.auth.required.explorerPlan")}
            </p>
            <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
              <SimpleButton
                action={handleLogin}
                text={t("actions.subscriptionPlan.upgrade")}
              />
            </div>
          </article>
        </section>
      )}
    </section>
  );
};
