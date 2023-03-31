import React, { useEffect, useRef, useState } from "react";
import {
  IonCol,
  IonList,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonRow,
} from "@ionic/react";
import {  Route, useHistory } from "react-router-dom";

import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions";
import { LocationBasicInformation } from "../../components/Location/LocationBasicInformation";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { ListSearchPlaces } from "../../containers/listSearchPlaces";
import { PlaceQuickSession } from "../../containers/placeQuickSession";

export const ItemsAndMapLayout: React.FC<{
  children: JSX.Element;
  map: JSX.Element;
}> = ({ children, map }) => {
  const history = useHistory()
  const modal = useRef<HTMLIonModalElement>(null);

  const [isMobile] = useIsMobile();

  const [shouldModalBeOpen, setShouldModalBeOpen] = useState<boolean>(false)

  const goToPlaceSession = async (id: string) => {
    await setShouldModalBeOpen(false)
    console.log(shouldModalBeOpen)
    history.push(`/place/${id}/session`)
  }

  useEffect(() => {
    if(isMobile) setShouldModalBeOpen(isMobile)
  }, [isMobile]);

  return (
    <IonPage
      className="
                relative
                w-full h-full overflow-hidden
                flex flex-column md:flex-row md:flex-nowrap
                p-0
            "
    >
      {/* Items */}
      <IonModal
        ref={modal}
        isOpen={isMobile && shouldModalBeOpen}
        initialBreakpoint={0.42}
        breakpoints={[0.25, 0.5, 0.81]}
        backdropDismiss={false}
        backdropBreakpoint={0.5}
      >
        <IonRouterOutlet>
            <Route path="/home/detail/:id">
                <IonRow class="h-full w-full">
                  <PlaceQuickSession changePageCallback={goToPlaceSession} />
                </IonRow>
              </Route>

              <Route exact path="/home">
                <LocationBasicInformation />
                <RowPlacesFilterOptions />

                <IonList
                  className="
                      relative flex flex-col
                      overflow-y-auto bg-neutral-900
                  "
                >
                    {children}
                </IonList>
              </Route>
        </IonRouterOutlet>
      </IonModal>

      {!isMobile && (

        <IonCol
        size="12"
        sizeMd="7"
        className="
                  relative
                  flex flex-col
                  w-full min-w-full md:w-7/12 md:min-w-min
                  bg-white text-black
                  z-30
                  ion-no-padding
              "
        >
          <IonRouterOutlet>
              <Route path="/home/detail/:id">
                  <PlaceQuickSession changePageCallback={goToPlaceSession} />
              </Route>
              <Route exact path="/home">
                <ListSearchPlaces>
                    {
                      children
                    }
                </ListSearchPlaces>
              </Route>
          </IonRouterOutlet>
        </IonCol>
      )}

      
      {/* Map */}
      <IonCol
        size="12"
        sizeMd="5"
        className="
            block
            w-full min-w-full h-full md:w-5/12 md:min-w-min
            bg-gray-500
            z-40
            ion-no-padding ion-no-margin
        "
      >
        {map}
      </IonCol>
    </IonPage>
  );

 
};
