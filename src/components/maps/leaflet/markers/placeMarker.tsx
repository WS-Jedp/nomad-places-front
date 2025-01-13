import ReactDOM from "react-dom/server";
import {
  handleCardColor,
  handleMindsetIcon,
  handleShadowCardColor,
  handleSpotTypeIcon,
} from "../../../../common/utils/icons/icons";
import { PlaceWithCachedSession } from "../../../../models/session";
import { MdCoffee } from "react-icons/md";
import L from "leaflet";

function handleIconToRender(place: PlaceWithCachedSession) {
  if (place.knownFor) {
    return handleMindsetIcon(place.knownFor);
  }

  if (place.type.length > 0 && place.type[0]) {
    return handleSpotTypeIcon(place.type[0]);
  }
  return <MdCoffee size={21} />;
}

const CustomPlaceMarkerContent: React.FC<{
  place: PlaceWithCachedSession;
  scale?: string;
}> = ({ place, scale }) => (
  <article className="flex flex-col items-center justify-center text-center">
    <div
      className={`custom-place-marker
                      relative
                      hover:z-50
                    rounded-full p-2
                    ${handleCardColor(place.knownFor)}
                    ${handleShadowCardColor(place.knownFor)}
                    ${scale ? scale : ""}
                `}
    >
      <span
        className={`absolute top-[-50%] max-w-none min-w-max w-auto font-bold text-xs px-3 rounded-sm bg-white text-coffi-black shadow-md`}
      >
        {place.name}
      </span>
      {handleIconToRender(place)}
    </div>
  </article>
);

// Custom icon setup
export const createCustomPlaceMarker = (
  place: PlaceWithCachedSession,
  scale?: string
) => {
  const customMarkerContent = ReactDOM.renderToString(
    <CustomPlaceMarkerContent place={place} scale={scale} />
  );

  return L.divIcon({
    className: "custom-marker",
    html: customMarkerContent,
  });
};
