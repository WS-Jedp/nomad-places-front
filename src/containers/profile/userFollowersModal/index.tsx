import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { AppModal } from "../../../components/modals/container";
import { User } from "../../../models/user";
import { SocialServices } from "../../../services/social";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { socialRequestResponded } from "../../../store/redux/slices/social";
import { acceptFollowRequest, rejectFollowRequest, removeUserFollower } from "../../../store/redux/slices/user";

export interface UserFollowersModalProps {
  closeCallback: () => void;
}

export const UserFollowersModal: React.FC<UserFollowersModalProps> = ({
  closeCallback,
}) => {
  const history = useHistory()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const { followRequests } = useAppSelector((state) => state.social);
  const { token } = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  function handleOnUser(userID: string) {
    history.push(`/profile/${userID}`)
  }
  async function handleOnAcceptRequest(requestID: string) {
    setIsLoading(true)
    try {
      await dispatch( acceptFollowRequest({ requestID }) )
      dispatch( socialRequestResponded({ requestID }) )
      await getFollowers()
    } catch (error) {
        dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
    } finally {
      setIsLoading(false)
    }
  }
  async function handleOnRejectRequest(requestID: string) {
    setIsLoading(true)
    try {
      await dispatch( rejectFollowRequest({ requestID }) )
      dispatch( socialRequestResponded({ requestID }) )
    } catch (error) {
        dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOnRemoveFollower(userID: string) {
    setIsLoading(true)
    try {
        await dispatch( removeUserFollower({ userToRemoveID: userID }) )
        setFollowers(followers => followers.filter(follower => follower.id !== userID))
    } catch (error) {
        dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
    } finally {
      setIsLoading(false)
    }
  }

  async function getFollowers() {
    try {
      setIsLoading(true)
      const socialServices = new SocialServices()
      if(!token) {
        await dispatch( addError(new ControlledError("You need to be logged in to see your followers", ControlledErrorType.FRONTEND_SYSTEM)) )
        return
      }
      const followers = await socialServices.getFollowers({ token });
      setFollowers(followers);
    } catch (error) {
      await dispatch( addError(new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM)) )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFollowers()
  },[])

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[72%] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={closeCallback}
          />

          <h2 className="font-bold text-md">
            {t('messages.social.general.followers')}
          </h2>
        </IonRow>

        {followRequests && followRequests.length > 0 && (
          <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
            <h2 className="font-bold text-lg mb-3">
              {
                t('messages.social.requests.follow')
              }
            </h2>
            <ul className="w-full">
                {
                  followRequests.map(req => (
                    <li className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2">
                      <button onClick={() => handleOnUser(req.sender.id)} className="flex flex-row items-center justify-start hover:underline">
                        <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                          <img
                            src={req.sender.profilePicture}
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                          />
                        </figure>
                        <h2 className="font-semibold text-sm ml-3">{ req.sender.username }</h2>
                      </button>

                      <div className="flex flex-row flex-nowrap">
                        <button
                          onClick={() => handleOnAcceptRequest(req.id)}
                          className="
                                            relative
                                            flex bg-blue-400 text-white text-center text-xs font-semibold px-3 py-1 mr-1
                                            rounded-md shadow-md
                                            transition-all duration-300 ease-in-out
                                            hover:bg-blue-300
                                        "
                        >
                          { t('actions.confirmation.accept') }
                        </button>
                        <button
                          onClick={() => handleOnRejectRequest(req.id)}
                          className="
                                            relative
                                            flex bg-zinc-400 text-white text-center text-xs font-semibold px-3 py-1
                                            rounded-md shadow-sm
                                            transition-all duration-300 ease-in-out
                                            hover:bg-zinc-300
                                        "
                        >
                          { t('actions.confirmation.decline') }
                        </button>
                      </div>
                    </li>
                  ))
                }
            </ul>
          </section>
        )}

        <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
          <h2 className="font-bold text-lg mb-3">
            {
              t('messages.social.followers.who')
            }
          </h2>
          {
            isLoading ? (
              <LoaderSpinner />
            ) : (
              <ul className="w-full">
                {
                  followers.length > 0 ? (
                    followers.map(follower => (
                      <li className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2">
                        <button onClick={() => handleOnUser(follower.id)} className="flex flex-row items-center justify-start hover:underline">
                          <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                            <img
                              src={follower.profilePicture}
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </figure>
                          <h2 className="font-semibold text-sm ml-3">{follower.username}</h2>
                        </button>

                        <button
                          onClick={() => handleOnRemoveFollower(follower.id)}
                          className="
                                          relative
                                          text-xs md:text-md font-light px-3 py-1 underline
                                      "
                        >
                          { t('actions.general.remove') }
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm font-light text-start">
                      {t('messages.social.followers.empty')}
                    </p>
                  )
                }
                
              </ul>
            )
          }
          
        </section>
      </section>
    </AppModal>
  );
};
