import { IonList, IonRow } from "@ionic/react";
import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { useTranslation } from "react-i18next";
import { SimpleButton } from "../../components/buttons/simple";
import { MdInfoOutline } from "react-icons/md";
import { useHistory } from "react-router";
import { createSocket } from "../../store/redux/slices/userSession";
import { RowPlacesTypeFilterOptions } from "../../components/filters/rowPlaceTypeFilterOptions";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";

interface ListSearchPlacesProps {
  children?: JSX.Element;
}

export const ListSearchPlaces: React.FC<ListSearchPlacesProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { canUseRealTimeFilters } = useUserPermissions();

  const userSession = useAppSelector((state) => state.userSession);
  const {
    userData,
    auth,
    location: userLocation,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const goToPlaceSession = async () => {
    if (!userData || !userSession.placeID) return;
    await dispatch(
      createSocket({
        userID: userData.id,
        placeID: userSession.placeID,
        username: userData.username,
        quickJoin: true,
      })
    );
    history.push(`/place/${userSession.placeID}/session`);
  };

  return (
    <>
      {/* Filters */}
      {/* <LocationBasicInformation /> */}
      {canUseRealTimeFilters() ? (
        <RowPlacesFilterOptions />
      ) : (
        <RowPlacesTypeFilterOptions />
      )}

      {/* {userSession.inSession && (
        <IonRow className="w-full border-solid border-b-[1px] px-12 bg-indigo-100 ">
          <section className="w-full p-3 rounded-md flex flex-row flex-nowrap items-center justify-between">
            <span className="text-md font-light text-black flex flex-row flex-nowrap items-center justify-center">
              <MdInfoOutline size={18} className="mr-2" /> You're already in a
              session
            </span>

            <SimpleButton
              action={() => goToPlaceSession()}
              text="Go to session"
            />
          </section>
        </IonRow>
      )} */}

      <IonList
        className="
                relative flex flex-col md:flex-row md:flex-wrap
                w-full h-[90%]
                p-6
                md:bg-white
                overflow-y-auto
            "
      >
        {children}
      </IonList>
    </>
  );
};
