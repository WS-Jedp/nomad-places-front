import { IonList } from "@ionic/react"
import { RouteComponentProps } from "react-router"
import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions"
import { LocationBasicInformation } from "../../components/Location/LocationBasicInformation"

interface ListSearchPlacesProps {
    children?: JSX.Element
}

export const ListSearchPlaces:React.FC<ListSearchPlacesProps> = ({ children }) => {

    return (
        <>
            {/* Filters */}
            {/* <LocationBasicInformation /> */}
            <RowPlacesFilterOptions />

            <IonList className="
                relative flex flex-col md:flex-row md:flex-wrap
                w-full
                p-6
                md:bg-white
                overflow-y-auto
            "
            >
                {
                    children
                }
            </IonList>
        </>
    )
}