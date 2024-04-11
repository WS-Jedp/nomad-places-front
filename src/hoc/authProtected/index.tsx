import { useEffect } from "react";
import { useHistory } from "react-router";
import { ControlledError } from "../../common/controlledError";
import { ControlledErrorType } from "../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { addError } from "../../store/redux/slices/controlledErrors";
import { getUserFollowRequests } from "../../store/redux/slices/social";
import { authUser, getUserData } from "../../store/redux/slices/user";

export const AuthProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const history = useHistory();
  const { token } = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  async function automaticallyAuthUser(token: string) {
      await dispatch(getUserData({ token }));
      await dispatch(getUserFollowRequests());
  }

  useEffect(() => {
    if (!token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        automaticallyAuthUser(localToken);
        return
      }
      
      dispatch(
        addError(
          new ControlledError(
            "You must be logged in to access this page",
            ControlledErrorType.FRONTEND_SYSTEM
          )
        )
      );
      history.push("/home");
    }
  }, [token]);

  return <>{children}</>;
};
