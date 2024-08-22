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
export const GoogleMapWrapper = () => {

  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

  if (!API_KEY) {
    throw new Error('API_KEY is not defined')
  }

  return (
    <Wrapper
      version="beta"
      apiKey={API_KEY}
      render={Render}
      libraries={['marker']}
    />
  )
}
