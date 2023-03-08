import React, { useEffect, useRef, useState } from "react";
import {
  IonCol,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRouterLink,
  IonRouterOutlet,
  IonRow,
} from "@ionic/react";
import { BrowserRouter, Route, useRouteMatch, Switch, Link } from "react-router-dom";

import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions";
import { LocationBasicInformation } from "../../components/Location/LocationBasicInformation";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { ListSearchPlaces } from "../../containers/listSearchPlaces";
import Home from "../../pages/Home";

export const ItemsAndMapLayout: React.FC<{
  children: JSX.Element;
  map: JSX.Element;
}> = ({ children, map }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { path } = useRouteMatch();

  const [isMobile] = useIsMobile();

  useEffect(() => {
    // console.log(path, "PATH")
    // history.push('/home/random-id')
  }, []);

  return (
    <IonPage
      className="
                relative
                w-full h-screen overflow-hidden
                flex flex-column md:flex-row md:flex-nowrap
                p-0
            "
    >
      {/* Items */}
      <IonModal
        ref={modal}
        isOpen={isMobile}
        initialBreakpoint={0.42}
        breakpoints={[0.25, 0.5, 0.75]}
        backdropDismiss={false}
        backdropBreakpoint={0.5}
      >
        <IonRouterOutlet>
            <Route path="/home/detail/:id">
                <IonRow class="h-full w-full">
                  <h2>This is the detail page</h2>
                  <IonRouterLink routerLink="/home">Go back</IonRouterLink>
                </IonRow>
              </Route>

              <Route exact path="/home">
                <LocationBasicInformation />
                <RowPlacesFilterOptions />

                <IonList
                  className="
                      relative flex flex-col
                      overflow-y-auto
                  "
                  color="light"
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
                <IonRow class="h-full w-full">
                  <h2>This is the detail page</h2>
                  <IonRouterLink routerLink="/home">Go back</IonRouterLink>
                </IonRow>
              </Route>
              <Route exact path="/home">
                <IonRow>
                    {
                      children
                    }
                </IonRow>
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
