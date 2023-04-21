import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { SimpleDropdown } from "../../../../components/dropdowns/simple"

type SearchSpotsGeneralFiltersProps = {
    closeCallback: () => void
}

enum GeneralFiltersEnum {
    type = 'type',
    mindset = 'mindset',
    commodities = 'commodities',
    rules = 'rules',
    people = 'people',
    distance = 'distance',
    none = 'none'
}

export const SearchSpotsGeneralFilters:React.FC<SearchSpotsGeneralFiltersProps> = ({ closeCallback }) => {

    const [currentFilter, setCurrentFilter] = useState<GeneralFiltersEnum>(GeneralFiltersEnum.type)

    return (
        <IonCol className="
                relative
                flex flex-col items-start justify-start
                h-full w-full
                py-6
            "
        >

            {/* Filters Header */}
            <IonRow className="w-full h-auto flex flex-row items-center justify-between border-b-2 border-gray-600 pb-3">
                <IonCol className="flex items-center justify-start px-3">
                    <button
                        className="w-auto h-auto flex items-center justify-center bg-white outline p-1 outline-gray-300 rounded-full"
                        onClick={closeCallback}
                    >
                        <MdClose size={18} color="gray" />
                    </button>
                </IonCol>
                <IonCol>
                    <h1 className="text-2xl font-bold text-black">
                        Spots filters
                    </h1>
                </IonCol>
            </IonRow>

            {/* Filters options */}
            <IonRow className="w-full h-auto flex flex-row items-center justify-start px-3 py-9">
                {/* Filter by type of place - Example: By Coffee, library, park, lookout, etc. */}
                <SimpleDropdown 
                    title="Which type of place?"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.type}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.type)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <p>
                        Type filters
                    </p>
                </SimpleDropdown>

                {/* Filter by mindset ambient - Example: For study, work, romantic, etc. */}
                <SimpleDropdown 
                    title="Mindset vibes"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.mindset}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.mindset)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <p>
                        Mindset filters
                    </p>
                </SimpleDropdown>
                

                {/* Filter by commodities from the spot - Example: Public wifi, parking, cowork space, plugs, etc */}

                {/* Filter by rules from the spot - Example: closedAt, openAt, petFriendly, under age, smoking */}
                
                {/* Filter by amount of people in the spot - Example: +10 people, -10 people */}
                
                {/* Filter by distance from current location */}


            </IonRow>

        </IonCol>
    )
}