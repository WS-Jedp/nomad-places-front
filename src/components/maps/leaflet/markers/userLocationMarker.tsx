import ReactDOM from "react-dom/server";
import { PlaceWithCachedSession } from "../../../../models/session";
import L from "leaflet";
import { MdPerson } from "react-icons/md";

const UserMarkerContent: React.FC<{
  scale?: string;
}> = ({ scale }) => (
  <article className="flex flex-col items-center justify-center text-center">
    <div
      className={`  
          custom-profile-marker
                      relative
                      hover:z-50
                    rounded-full p-2
                    bg-white text-black border-black
                    shadow-lg
                    ${scale ? scale : ""}
                `}
    >
      <span
        className={`absolute top-[-50%] max-w-none min-w-max w-auto font-bold text-xs px-3 rounded-sm bg-white text-black shadow-md`}
      >
        You
      </span>
      <MdPerson size={21} />
    </div>
  </article>
);

// Custom icon setup
export const createUserMarker = (
  scale?: string
) => {
  const customMarkerContent = ReactDOM.renderToString(
    <UserMarkerContent scale={scale} />
  );

  return L.divIcon({
    className: "custom-profile-marker",
    html: customMarkerContent,
  });
};
