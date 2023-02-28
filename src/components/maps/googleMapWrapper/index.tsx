import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMapNomadsComponent } from "../googleMapNomads";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <h1>Loading...</h1>;
    case Status.FAILURE:
      return <h1>Error</h1>;
    case Status.SUCCESS:
      return (
        <GoogleMapNomadsComponent
          center={{ lat: 6.250910937220285, lng: -75.57915349417806 }}
          zoom={14}
        />
      );
  }
};

// We need to hide the api key
export const GoogleMapWrapper = () => (
  <Wrapper
    version="beta"
    apiKey={"AIzaSyA_KOtPw9DvhlbdDvdy689sRNA_NPNtzmc"}
    render={render}
    libraries={['marker']}
  />
);
