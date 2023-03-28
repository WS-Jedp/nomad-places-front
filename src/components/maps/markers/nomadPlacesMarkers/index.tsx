import { useState } from "react";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { GoogleMapCustomMaker } from "../../googleMapsMarker";
import './styles.css'

interface NomadPlacesMarkersProps {
  map: google.maps.Map;
}

export const NomadPlacesMakers: React.FC<NomadPlacesMarkersProps> = ({
  map,
}) => {
  const places = useAppSelector(state => state.places.nearPlaces)
  const [markerHovered, setMakerHovered] = useState<string | null>(null)

  function handleClickInPlace (id:string) {
    console.log('This is the place ' + id)
  }

  return (
    <>
      {places.map((place) => {
        return (
          <GoogleMapCustomMaker
            map={map}
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            key={place.id}
            onClick={() => handleClickInPlace(place.id)}
          >
            <div className={`nomad-place-makers
                ${markerHovered === place.id ? 'nomad-place-marker--detail' : ''}
            `} 

                // Simulate the hover in the marker
                onMouseEnter={() => {setMakerHovered(place.id)}}
                onMouseLeave={() => {setMakerHovered(null)}}
            >
                { place.name }
            </div>
          </GoogleMapCustomMaker>
        );
      })}
    </>
  );
};
