import React, { useEffect, useRef, useState } from "react"
import { IonCol, IonList, IonModal, IonRow } from "@ionic/react"

import { RowPlacesFilterOptions } from '../../components/filters/rowPlacesFilterOptions'
import { LocationBasicInformation } from '../../components/Location/LocationBasicInformation'
import { useIsMobile } from '../../common/hooks/useIsMobile'

export const ItemsAndMapLayout: React.FC<{ children: JSX.Element, map: JSX.Element }> = ({ children, map }) => {

    const modal = useRef<HTMLIonModalElement>(null);

    const [ isMobile ] = useIsMobile()

    return (
        <IonRow
            className="
                relative
                w-full h-screen overflow-hidden
                flex flex-column md:flex-row md:flex-nowrap
                p-0
            "
        >
            {/* Items */}
                <IonModal
                    ref={modal}
                    isOpen={isMobile}
                    initialBreakpoint={0.42}
                    breakpoints={[0.25, 0.5, 0.75]}
                    backdropDismiss={false}
                    backdropBreakpoint={0.5}
                >
                    <LocationBasicInformation />
                    <RowPlacesFilterOptions />

                    <IonList className="
                         relative flex flex-col
                         overflow-y-auto
                    "
                    color="light"
                    >
                        {
                            children
                        }
                    </IonList>
                </IonModal>
                {
                    !isMobile && (
                        <IonCol 
                            size="12"
                            sizeMd="7"
                            className="
                                relative
                                flex flex-col
                                w-full min-w-full md:w-7/12 md:min-w-min
                                bg-white text-black
                                z-30
                                ion-no-padding
                            "
                        >
                            {/* Filters */}
                            <LocationBasicInformation />
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
                        </IonCol>
                    )
                }
            
            


            {/* Map */}
            <IonCol
                size="12"
                sizeMd="5"
                className="
                    block
                    w-full min-w-full h-full md:w-5/12 md:min-w-min
                    bg-gray-500
                    z-40
                    ion-no-padding ion-no-margin
                "
            >
                {
                    map
                }
            </IonCol>
        </IonRow>
    )
}