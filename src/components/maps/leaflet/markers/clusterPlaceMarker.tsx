
import ReactDOM from "react-dom/server";
import L from "leaflet";


const CustomClusterMarker:React.FC<{count: number}> = ({ count }) => {

    function handleAmountColor() {
        if (count < 10) {
            return "bg-green-500 text-white";
        } else if (count < 50) {
            return "bg-yellow-500 text-white";
        } else {
            return "bg-red-500 text-white";
        }
    }

    return (
        <article className="flex flex-col items-center justify-center text-center">
            <div
            className={`
                            relative
                            hover:z-50
                            rounded-full p-2
                            ${handleAmountColor()}
                            font-bold
                        `}
            >
            {count}
            </div>
        </article>
    )
}

export const createCustomClusterIcon = (cluster: L.MarkerCluster) => {
    const count = cluster.getChildCount();
  
    return L.divIcon({
      html: ReactDOM.renderToString(<CustomClusterMarker count={count} />),
      className: "custom-cluster-icon",
    });
  };
