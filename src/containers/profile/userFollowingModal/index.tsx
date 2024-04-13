import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { AppModal } from "../../../components/modals/container";
import { User } from "../../../models/user";
import { SocialServices } from "../../../services/social";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { unfollowUser } from "../../../store/redux/slices/user";

export interface UserFollowingModalProps {
  closeCallback: () => void;
}

export const UserFollowingModal: React.FC<UserFollowingModalProps> = ({
  closeCallback,
}) => {
  const history = useHistory()
  const { t } = useTranslation()
  const { token } = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  const [following, setFollowing] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleOnUser(userID: string) {
    history.push(`/profile/${userID}`)
  }

  async function handleUnfollow(userID: string) {
    setIsLoading(true)
    try {
      await dispatch( unfollowUser({ userToUnfollowID: userID }) )
      setFollowing(old => old.filter(user => user.id !== userID))      
    } catch (error) {
      dispatch( addError( new ControlledError(String(error), ControlledErrorType.FRONTEND_SYSTEM) ) )
    } finally {
      setIsLoading(false)
    }
  }

  async function getFollowing() {
    setIsLoading(true);
    try {
      if (!token) {
        dispatch(
          addError(
            new ControlledError(
              "You need to be logged in to see your followers",
              ControlledErrorType.FRONTEND_SYSTEM
            )
          )
        );
        return;
      }

      const socialServices = new SocialServices();
      const following = await socialServices.getFollowing({ token });

      setFollowing(following);
    } catch (error) {
      console.error(error);
      dispatch(
        addError(
          new ControlledError(
            String(error),
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[720px] md:max-h-[600px]
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
            { t('messages.social.general.following') }
          </h2>
        </IonRow>

        <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
          <h2 className="font-bold text-lg mb-3">
            {
              t('messages.social.follows.who')
            }
          </h2>
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <ul className="w-full">
              {following.length > 0 ? (
                following.map((user) => (
                  <li className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2">
                    <button onClick={() => handleOnUser(user.id)} className="flex flex-row items-center justify-start hover:underline">
                      <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                        <img
                          src={user.profilePicture}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </figure>
                      <h2 className="font-semibold text-sm ml-3">{ user.username }</h2>
                    </button>

                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="
                                      relative
                                      text-xs md:text-md font-light px-3 py-1 underline
                                  "
                    >
                      { t('actions.social.unfollow') }
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-sm font-light text-start">
                  { t('messages.social.follows.empty') }
                </p>
              )}
            </ul>
          )}
        </section>
      </section>
    </AppModal>
  );
};
