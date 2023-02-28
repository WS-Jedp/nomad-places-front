import { useState } from "react";
import { GoogleMapCustomMaker } from "../../googleMapsMarker";
import './styles.css'

interface NomadPlacesMarkersProps {
  map: google.maps.Map;
}

type Place = {
    id: string
    name: string
    location: {
        latitude: number
        longitude: number
    }

}

export const NomadPlacesMakers: React.FC<NomadPlacesMarkersProps> = ({
  map,
}) => {
  const [places, setPlaces] = useState<Place[]>([
    {
      id: "63fa821df0ff2bf1fd4810f4",
      name: "Cafe Velvet",
      location: {
        latitude: 6.2079597,
        longitude: -75.5691657,
      },
    },
    {
      id: "63fab588bdd02a21abdd4aae",
      name: "Cafe Noir",
      location: {
        latitude: 6.2074437,
        longitude: -75.5686723,
      },
    },
    {
      id: "63fab5e6bdd02a21abdd4ab7",
      name: "Cafe Pergamino",
      location: {
        latitude: 6.2077575,
        longitude: -75.5679017,
      },
    },
    {
      id: "63fab93bbdd02a21abdd4ab8",
      name: "Cafe Semilla",
      location: {
        latitude: 6.245982333352215,
        longitude: -75.59266408802893,
      },
    },
  ]);
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
