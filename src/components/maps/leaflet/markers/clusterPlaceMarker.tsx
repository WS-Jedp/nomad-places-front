import ReactDOM from "react-dom/server";
import L from "leaflet";

const CustomClusterMarker: React.FC<{ count: number }> = ({ count }) => {
  function handleAmountColor() {
    if (count <= 5)
      return "bg-blue-300 text-white border-blue-600 hover:bg-blue-200";
    if (count <= 10)
      return "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600";

    return "bg-amber-300 text-white border-amber-500 hover:bg-amber-500";
  }

  return (
    <article className="flex flex-col items-center justify-center text-center">
      <div
        className={`
            custom-cluster-marker
            relative
            hover:z-50
            rounded-full p-2
            shamdw
            ${handleAmountColor()}
            font-bold
        `}
      >
        {count}
      </div>
    </article>
  );
};

export const createCustomClusterIcon = (cluster: L.MarkerCluster) => {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: ReactDOM.renderToString(<CustomClusterMarker count={count} />),
    className: "custom-cluster-icon",
  });
};
