import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { useTranslation } from "react-i18next"
import { SimpleButton, SimpleButtonOutline } from "../../../../components/buttons/simple"
import { SimpleDropdown } from "../../../../components/dropdowns/simple"
import { GeneralFiltersEnum } from "../../../../models/filters"
import { PlaceTypesFilter } from "../../../../components/filters/placeTypesFilter"
import { PlaceRulesSelection } from "../../../../components/filters/placeRulesSelection"
import { PlaceCommoditiesSelection } from "../../../../components/filters/placeCommoditiesSelection"
import { PlaceMindsetsFilters } from "../../../../components/filters/placeMindsetsFilter"
import { SpotAmountPeopleFilter } from "../../../../components/filters/spotAmountPeopleFilter"
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors"

type SearchSpotsGeneralFiltersProps = {
    closeCallback: () => void
    defaultFilter?: GeneralFiltersEnum
}


export const SearchSpotsGeneralFilters:React.FC<SearchSpotsGeneralFiltersProps> = ({ closeCallback, defaultFilter }) => {

    const { t } = useTranslation()
    
    const { 
        spotTypesFilter, selectedSpotTypesFilter,
        spotAmountPeopleFilter, selectedSpotAmountPeopleFilter,
        spotCommoditiesFilter, selectedSpotCommoditiesFilter,
        spotRulesFilters, selectedSpotRulesFilter,
        spotMindsetFilter, selectedSpotMindsetFilter
     } = useAppSelector(state => state.filters)

    function handleSpotTypeFilterCurrentValue() {
        if(!selectedSpotTypesFilter.length) return t('filters.labels.none')

        const MAXIMUN_SPOT_TYPES = spotTypesFilter.length
        if(selectedSpotTypesFilter.length === MAXIMUN_SPOT_TYPES) return t('filters.labels.all')

        const firstSpotType = spotTypesFilter.find(spotType => spotType.id === selectedSpotTypesFilter[0])
        if(!firstSpotType) return t('filters.labels.none')

        if(selectedSpotTypesFilter.length > 1) return `${firstSpotType?.title} +${selectedSpotTypesFilter.length - 1}`
        return t(`filters.spotTypes.${firstSpotType?.title.toLowerCase()}`)
    }

    function handlPeopleAmountFilterCurrentValue() {
        if(!selectedSpotAmountPeopleFilter) return t('filters.labels.any')
        const peopleAmountOption = spotAmountPeopleFilter.find(peopleAmount => peopleAmount.id === selectedSpotAmountPeopleFilter)
        if(!peopleAmountOption) return t('filters.labels.none')
        return peopleAmountOption.text
    }

    function handleMindsetFilterCurrentValue() {
        if(!selectedSpotMindsetFilter.length) return t('filters.labels.none')
        const mindsetOption = spotMindsetFilter.find(mindset => mindset.id === selectedSpotMindsetFilter[0])
        if(!mindsetOption) return t('filters.labels.none')
        if(selectedSpotMindsetFilter.length > 1) return `${t(`filters.mindsets.${mindsetOption.name.toLowerCase()}`)} +${selectedSpotMindsetFilter.length - 1}`
        return t(`filters.mindsets.${mindsetOption.name.toLowerCase()}`)
    }

    function handleCommoditiesFilterCurrentValue() {
        if(!selectedSpotCommoditiesFilter.length) return t('filters.labels.any')
        const commodityOption = spotCommoditiesFilter.find(commodity => commodity.id === selectedSpotCommoditiesFilter[0])
        if(!commodityOption) return t('filters.labels.any')
        if(selectedSpotCommoditiesFilter.length > 1) return `${t(`filters.commodities.${commodityOption.commodity}`)} +${selectedSpotCommoditiesFilter.length - 1}`
        return t(`filters.commodities.${commodityOption.commodity}`)
    }

    function handleRulesFilterCurrentValue() {
        if(!selectedSpotRulesFilter.length) return t('filters.labels.any')
        const ruleOption = spotRulesFilters.find(rule => rule.id === selectedSpotRulesFilter[0])
        if(!ruleOption) return t('filters.labels.any')
        if(selectedSpotRulesFilter.length > 1) return `${t(`filters.rules.${ruleOption.rule}`)} +${selectedSpotRulesFilter.length - 1}`
        return t(`filters.rules.${ruleOption.rule}`)
    }

    function handleOnSearch() {

        closeCallback()
    }

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
                        { t('filters.texts.title') }
                    </h1>
                </IonCol>
            </IonRow>

            {/* Filters options */}
            <IonRow className="w-full h-full overflow-y-auto pb-9 flex flex-col flex-nowrap items-center justify-start px-3 py-9">
                {/* Filter by type of place - Example: By Coffee, library, park, lookout, etc. */}
                <SimpleDropdown 
                    title={t('filters.labels.whatTypeOfSpot?')}
                    currentValue={handleSpotTypeFilterCurrentValue()}
                    badge={selectedSpotTypesFilter.length >= 1}
                    isOpen={currentFilter === GeneralFiltersEnum.type}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.type)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceTypesFilter />
                </SimpleDropdown>

                {/* Filter by mindset ambient - Example: For study, work, romantic, etc. */}
                <SimpleDropdown 
                    title={t('filters.labels.mindsetVibes')}
                    currentValue={handleMindsetFilterCurrentValue()}
                    badge={selectedSpotTypesFilter.length >= 1}
                    isOpen={currentFilter === GeneralFiltersEnum.mindset}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.mindset)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceMindsetsFilters />
                </SimpleDropdown>

                {/* Filter by commodities from the spot - Example: Public wifi, parking, cowork space, plugs, etc */}
                <SimpleDropdown 
                    title={t('filters.titles.commodities')}
                    currentValue={handleCommoditiesFilterCurrentValue()}
                    badge={selectedSpotCommoditiesFilter.length >= 1}
                    isOpen={currentFilter === GeneralFiltersEnum.commodities}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.commodities)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceCommoditiesSelection />
                </SimpleDropdown>

                {/* Filter by rules from the spot - Example: closedAt, openAt, petFriendly, under age, smoking */}

                <SimpleDropdown 
                    title={t('filters.titles.rules')}
                    currentValue={handleRulesFilterCurrentValue()}
                    badge={selectedSpotRulesFilter.length >= 1}
                    isOpen={currentFilter === GeneralFiltersEnum.rules}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.rules)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                    <PlaceRulesSelection />
                </SimpleDropdown>
                
                {/* Filter by amount of people in the spot - Example: +10 people, -10 people */}
                <SimpleDropdown 
                    title={t('filters.labels.peopleAmount')}
                    currentValue={handlPeopleAmountFilterCurrentValue()}
                    badge={selectedSpotAmountPeopleFilter !== null}
                    isOpen={currentFilter === GeneralFiltersEnum.people}
                    openCallback={() => setCurrentFilter(GeneralFiltersEnum.people)}
                    closeCallback={() => setCurrentFilter(GeneralFiltersEnum.none)}
                >
                        <SpotAmountPeopleFilter />
                </SimpleDropdown>
                
                {/* Filter by distance from current location */}


            </IonRow>

            <IonRow className="
                sticky bottom-0 left-0
                w-full h-auto
                flex flex-row flex-nowrap items-center justify-start
                px-3 py-6
                bg-white
                border-t border-gray-300
            ">

                <SimpleButton 
                    text={t('actions.general.search')}
                    action={handleOnSearch}
                />
                <SimpleButtonOutline 
                    text={t('actions.general.close')}
                    action={closeCallback}
                />

            </IonRow>

        </IonCol>
    )
}