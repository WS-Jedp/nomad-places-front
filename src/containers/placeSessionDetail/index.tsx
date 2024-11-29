import { IonCol, IonRow } from "@ionic/react";
import { AvatarGroup } from "../../components/avatar/group";
import { SimpleButton } from "../../components/buttons/simple";
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity";
import { useEffect, useState } from "react";
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

export const PlaceSessionDetail: React.FC = () => {
  const { t } = useTranslation();

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
  const [recentActivityOpened, setRecentActivityOpened] = useState<number[]>([])
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
    setRecentActivityOpened([...recentActivityOpened, index])
  }

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
        await dispatch(addRecentActivityAction({
          id: payload.action.id,
          createdDate: getLocalISODate(payload.action.createdDate),
          type: recentActivityPayload.type,
          url: recentActivityPayload.url,
          userID: payload.action.userID,
          username: payload.action.username,
          userPhotoURL: recentActivityPayload.userPhotoURL
         }));

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
    setQuickActionModal(true);
    setQuickActionType(actionType);
    setQuickActionValue(value);
  }

  function handleAmountOfPeopleQuickAction(
    actionType: UPDATE_ACTIONS,
    value: string
  ) {
    setQuickActionModal(true);
    setQuickActionType(actionType);
    setQuickActionValue(value);
  }

  function handleUpdateMultipleActions(
    actions: { type: UPDATE_ACTIONS; data: any }[]
  ) {
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

  async function onRecentActivityFileChange(file: File) {
    setRecentActivityFile(file);
  }

  function onRecentActivityFileError(error: string) {
    setRecentActivityError(error);
  }

  function onRecentActivityFileSuccess(file: File) {
    setRecentActivityFile(file);
  }

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
        userProfilePicture: userData?.profilePicture|| "",
      });
    }

    await setTimeout(() => {
      setRecentActivityLoading(false);
      setRecentActivityFile(null);
    }, 3000);
  }

  if (!currentPlace) return null;

  return (
    <IonRow className="relative w-full h-full overflow-hidden">
      {userInSession && (
        <section className="realtive w-full h-auto
            px-3 py-1
            flex flex-row items-center justify-start
            overflow-hidden overflow-x-auto
            border-b-[1px] border-gray-300 
          ">
            <div className="border-solid border-r-[1px] border-gray-300 mr-3">
              <RecentActivityButton
                onError={onRecentActivityFileError}
                onSuccess={onRecentActivityFileSuccess}
              />
            </div>
          {cachedSession?.lastRecentlyActivities?.map(
            (activity, index) => (
              <RecentActivityCard
                key={index}
                callback={() => handleRecentActivityOpen(index)}
                isImage={activity.type === MULTIMEDIA_TYPE.IMAGE}
                checked={recentActivityOpened.includes(index)}
              />
            )
          )}
        </section>
      )}

      <IonRow className="w-full p-3 pb-5 relative flex flex-col flex-nowrap border-b border-gray-300">
        {cachedSession &&
          cachedSession.lastActions.length > 0 &&
          cachedSession?.lastUpdate && (
            <section className="my-1">
              <h2 className="text-xs font-light">
                {t("spots.messages.session.lastUpdateAt")}{" "}
                <span className="font-light">
                  -{" "}
                  {format(
                    parseISO(getLocalISODate(cachedSession.lastUpdate)),
                    "p"
                  )}
                </span>
              </h2>
            </section>
          )}
        <section className="mb-3">
          <h2 className="font-bold text-lg mb-1">
            {t("spots.session.perfectTo")}
          </h2>
          {userInSession ? (
            <AmountMindsetActions mindsetCallback={handleMindsetQuickAction} />
          ) : (
            <HandleMindsetTags mindset={MINDSETS.UNKNOWN} />
          )}
        </section>

        <IonRow className="relative w-full flex flex-row mb-3">
          <IonCol size="12">
            <h2 className="font-bold text-lg">
              {t("spots.session.amountOfPeople")}:
            </h2>
            <div className="my-1">
              {userInSession && (
                <AmountOfPeopleActionsAmount
                  callback={handleAmountOfPeopleQuickAction}
                />
              )}
            </div>
          </IonCol>
          <AvatarGroup users={cachedSession?.usersInSession || []} />
        </IonRow>
        <section className="w-full mb-2">
          {/* <p className="font-regular text-xs my-3 text-left">Last update made 30 minutes ago</p> */}
        </section>
        {userInSession ? (
          <article className="flex flex-row flex-nowrap w-full items-center justify-start">
            <div className="w-5/10">
              <SimpleButton
                action={() => setUpdateSessionModal(true)}
                text={t("actions.session.update")}
                loading={joiningSessionLoader}
              />
            </div>
            <span
              className="cursor-pointer text-red-500 underline ml-6"
              onClick={() => setLeaveSessionModal(true)}
            >
              {t("actions.session.leave")}
            </span>
          </article>
        ) : (
          // JOIN SESSION BUTTON
          <SimpleButton
            action={handleJoinSession}
            text={t("actions.session.join")}
            loading={joiningSessionLoader}
            disabled={!auth.isAuth}
          />
        )}
      </IonRow>

      <section className="relative w-full h-3/6 overflow-y-auto">
        <article className="relative w-full pt-3 border-solid border-b-[1px] border-gray-300">
          <h2 className="w-full font-bold text-lg mb-1 pb-3 px-3">
            {t("spots.session.communityActions")}:
          </h2>
        </article>
        <section className="relative h-full flex flex-col flex-nowrap mb-3">
          <ol className="w-full min-h-full h-auto my-3">
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

      {recentActivityOpen && (
        <AppModal>
          <MultimediaSliderModal
            images={
              cachedSession?.lastRecentlyActivities || []
            }
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
          <article className="w-full max-w-xs bg-white rounded-lg text-black p-6">
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
              "linear-gradient(180deg, rgba(210, 210, 210, 0.90), rgba(210, 210, 210, 1))",
          }}
          className="absolute z-40 w-full h-full flex flex-col items-center justify-center text-center"
        >
          <FaLock size={90} className="my-5" />
          <h2 className="font-bold text-2xl">
            {t("messages.auth.notLoggedIn")}
          </h2>
          <div className="w-4/6 h-[1px] bg-black my-3"></div>
          <p className="text-md font-light mx-3">
            {t("messages.auth.required.message")}
          </p>
          <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
            <SimpleButton action={handleLogin} text={t("actions.auth.login")} />
          </div>
        </section>
      )}
    </IonRow>
  );
};
