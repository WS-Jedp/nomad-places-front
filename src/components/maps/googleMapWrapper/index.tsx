import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { GoogleMapNomadsComponent } from "../googleMapNomads";

const Render = (status: Status) => {

  const { zoomInMap } = useAppSelector(state => state.user)
  // Just ot use for the MVP
  const medellinLatLong = { lat: 6.250910937220285, lng: -75.57915349417806 }

  switch (status) {
    case Status.LOADING:
      return <h1>Loading...</h1>;
    case Status.FAILURE:
      return <h1>Error</h1>;
    case Status.SUCCESS:
      return (
        <GoogleMapNomadsComponent
          center={medellinLatLong}
          zoom={zoomInMap}
        />
      );
  }

  
};

// We need to hide the api key
export const GoogleMapWrapper = () => (
  <Wrapper
    version="beta"
    apiKey={"AIzaSyA_KOtPw9DvhlbdDvdy689sRNA_NPNtzmc"}
    render={Render}
    libraries={['marker']}
  />
);
