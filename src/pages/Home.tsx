// import { useRef, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
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
          <IonTitle>Hello</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section style={{width: "500px", height: "500px" }}>
          <GoogleMapWrapper />
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
