import { IonRow, IonText } from "@ionic/react"

import { FilterTag } from '../filterTag'

export const RowPlacesFilterOptions: React.FC<{ chilren?: JSX.Element}> = ({ chilren })  => {

    const filters = [
        {
            id: 1,
            name: 'Study',
        },
        {
            id: 2,
            name: 'Work',
        },
        {
            id: 3,
            name: 'Vibe',
        },
        {
            id: 4,
            name: 'Romantic',
        },
        {
            id: 5,
            name: 'Cowork',
        },
        {
            id: 6,
            name: 'Quiet',
        },
    ]

    return (
        <IonRow className="
            relative
            w-full h-24 overflow-x-auto overflow-y-hidden
            flex-nowrap
            p-6
            border-y border-gray-300
        ">
            <FilterTag
                action={(ev) => {console.log('Click in the filter tag')}}
                isSelected
                text="Todos"
            />

            <div className="inline-flex ml-3 mr-6 h-full w-[1px] bg-gray-300"></div>

            {/* Other filters */}

            {
                filters.map(filter => (
                    <FilterTag
                        key={filter.id}
                        action={(ev) => {console.log('Click in the filter tag')}}
                        text={filter.name}
                    />
                ))
            }

        </IonRow>
    )
}