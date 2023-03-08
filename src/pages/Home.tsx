// import { useRef, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { GoogleMapWrapper } from '../components/maps/googleMapWrapper'
// import { Request } from "../common/request";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-8xl">
            Hello world
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="w-full h-full">
          <GoogleMapWrapper />
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
