import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { MdClose, MdCoffee } from "react-icons/md"
import { SimpleButton, SimpleButtonOutline } from "../../../../components/buttons/simple"
import { SimpleDropdown } from "../../../../components/dropdowns/simple"
import { RowPlacesFilterOptions } from "../../../../components/filters/rowPlacesFilterOptions"
import { InputRowSelect } from "../../../../components/form/container/rowSelect"
import { SimpleCheckbox } from "../../../../components/form/inputs/checkbox"
import { GeneralFiltersEnum } from "../../../../models/filters"
import { PlaceTypesFilter } from "../../../../components/filters/placeTypesFilter"
import { PlaceRulesSelection } from "../../../../components/filters/placeRulesSelection"
import { PlaceCommoditiesSelection } from "../../../../components/filters/placeCommoditiesSelection"
import { PlaceMindsetsFilters } from "../../../../components/filters/placeMindsetsFilter"

type SearchSpotsGeneralFiltersProps = {
    closeCallback: () => void
    defaultFilter?: GeneralFiltersEnum
}


export const SearchSpotsGeneralFilters:React.FC<SearchSpotsGeneralFiltersProps> = ({ closeCallback, defaultFilter }) => {

    const [currentFilter, setCurrentFilter] = useState<GeneralFiltersEnum>(defaultFilter || GeneralFiltersEnum.type)

    return (
        <IonCol className="
                relative
                flex flex-col items-start justify-between
                w-full h-screen
                pt-6
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
            <IonRow className="w-full h-full overflow-y-auto pb-9 flex flex-col flex-nowrap items-center justify-start px-3 py-9">
                {/* Filter by type of place - Example: By Coffee, library, park, lookout, etc. */}
                <SimpleDropdown 
                    title="What type of spot?"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.type}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.type)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceTypesFilter />
                </SimpleDropdown>

                {/* Filter by mindset ambient - Example: For study, work, romantic, etc. */}
                <SimpleDropdown 
                    title="Mindset vibes"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.mindset}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.mindset)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceMindsetsFilters />
                </SimpleDropdown>
                

                {/* Filter by commodities from the spot - Example: Public wifi, parking, cowork space, plugs, etc */}
                <SimpleDropdown 
                    title="Commotities"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.commodities}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.commodities)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceCommoditiesSelection />
                </SimpleDropdown>

                {/* Filter by rules from the spot - Example: closedAt, openAt, petFriendly, under age, smoking */}

                <SimpleDropdown 
                    title="Rules"
                    currentValue="All"
                    isOpen={currentFilter === GeneralFiltersEnum.rules}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.rules)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceRulesSelection />
                </SimpleDropdown>
                
                {/* Filter by amount of people in the spot - Example: +10 people, -10 people */}
                <SimpleDropdown 
                    title="People amount"
                    currentValue="+10"
                    isOpen={currentFilter === GeneralFiltersEnum.people}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.people)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                        <InputRowSelect 
                            defaultOption="Cualquiera"
                            selectedOption="Cualquiera"
                            options={[
                                '0-5',
                                '5-10',
                                '10-15',
                                '15-20',
                                '+20',
                            ]}
                            onChange={() => {}}
                        />
                </SimpleDropdown>
                
                {/* Filter by distance from current location */}


            </IonRow>

            <IonRow className="
                sticky bottom-0 left-0
                w-full h-auto
                flex flex-row items-center justify-start
                px-3 py-6
                bg-white
                border-t border-gray-300
            ">

                <SimpleButton 
                    text="Apply filters"
                    action={() => {}}
                />
                <SimpleButtonOutline 
                    text="Cancel"
                    action={closeCallback}
                />

            </IonRow>

        </IonCol>
    )
}