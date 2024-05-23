import { IonList } from "@ionic/react"
import { RowPlacesFilterOptions } from "../../components/filters/rowPlacesFilterOptions"

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
                w-full h-[90%]
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