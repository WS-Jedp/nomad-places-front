import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  IonCol,
  IonContent,
  IonList,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonRow,
} from "@ionic/react";
import { Route, useHistory, useLocation } from "react-router-dom";

import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { ListSearchPlaces } from "../../containers/listSearchPlaces";
import { PlaceQuickSession } from "../../containers/placeQuickSession";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";
import { RowPlacesTypeFilterOptions } from "../../components/filters/rowPlaceTypeFilterOptions";
import { PlaceSessionDetail } from "../../containers/placeSessionDetail";

export const ItemsAndMapLayout: React.FC<{
  children: JSX.Element;
  map: JSX.Element;
}> = ({ children, map }) => {
  const location = useLocation();
  const history = useHistory();
  const onSession = useMemo(
    () => location.pathname.includes("session"),
    [location]
  );
  
  const modal = useRef<HTMLIonModalElement>(null);

  const { canUseRealTimeFilters } = useUserPermissions();

  const [isMobile] = useIsMobile();

  const [shouldModalBeOpen, setShouldModalBeOpen] = useState<boolean>(false);

  const goToPlaceSession = async (id: string) => {
    await setShouldModalBeOpen(true);
    history.push(`/home/place/${id}/session`);
  };

  useEffect(() => {
    if (isMobile) setShouldModalBeOpen(isMobile);
  }, [isMobile]);


  return (
    <IonPage
      className="
                relative
                w-full h-full overflow-hidden
                flex flex-col md:flex-row md:flex-nowrap
                p-0
            "
    >
      {/* Items */}
      <IonModal
        ref={modal}
        isOpen={isMobile && shouldModalBeOpen}
        initialBreakpoint={0.3}
        breakpoints={[0.3, 0.5, 0.93]}
        backdropDismiss={false}
        backdropBreakpoint={0.5}
        color="transparent"
      >
        <IonContent className="no-padding bg-white">
          <IonRouterOutlet>
            <Route path="/home/detail/:id">
              <IonRow class="h-full w-full">
                <PlaceQuickSession changePageCallback={goToPlaceSession} />
              </IonRow>
            </Route>

            <Route path="/home/place/:id/session">
              <IonRow class="h-full w-full">
                <PlaceSessionDetail withBackButtonAction />
              </IonRow>
            </Route>

            <Route exact path="/home">
              <>
                {/* <LocationBasicInformation /> */}
                {canUseRealTimeFilters() ? (
                  <RowPlacesFilterOptions />
                ) : (
                  <RowPlacesTypeFilterOptions />
                )}
                <section className="relative h-full overflow-y-auto mb-36">
                  <IonList
                    className="
                    relative flex flex-col items-start justify-start
                    overflow-y-auto bg-white h-[87%]
                    "
                  >
                    {children}
                  </IonList>
                </section>
              </>
            </Route>
          </IonRouterOutlet>
        </IonContent>
      </IonModal>

      {!isMobile && (
        <IonCol
          size="12"
          sizeMd="7"
          className="
                  relative
                  flex flex-col
                  w-full min-w-full md:w-7/12 md:min-w-min
                  bg-white text-coffi-black
                  shadow-2xl
                  z-30
                  ion-no-padding
              "
        >
          <IonRouterOutlet>
            <Route path="/home/detail/:id">
              <PlaceQuickSession
                changePageCallback={goToPlaceSession}
                onSessionPath={onSession}
              />
            </Route>
            <Route path="/home/place/:id/session">
              <PlaceQuickSession onSessionPath={onSession} />
            </Route>
            <Route exact path="/home">
              <ListSearchPlaces>{children}</ListSearchPlaces>
            </Route>
          </IonRouterOutlet>
        </IonCol>
      )}

      {/* Map or Session */}
      <IonCol
        size="12"
        sizeMd="5"
        className="
            block
            w-full min-w-full h-full md:w-5/12 md:min-w-min
            bg-white
            z-40
            ion-no-padding ion-no-margin
        "
      >
        {!isMobile && onSession ? (
          <PlaceSessionDetail withCloseSessionButton />
        ) : (
          map
        )}
      </IonCol>
    </IonPage>
  );
};
