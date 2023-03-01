import React, { useEffect, useRef, useState } from "react"
import { IonModal } from "@ionic/react"

import { useWindowSize } from '../../common/hooks/useWindowSize'

export const ItemsAndMapLayout: React.FC<{ children: JSX.Element, map: JSX.Element }> = ({ children, map }) => {

    const modal = useRef<HTMLIonModalElement>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        if(!isMobile && modal.current) {
            modal.current.setAttribute('is-open', 'false')
        }
    }, [isMobile])

    const [ screenWidth ] = useWindowSize() 
    useEffect(() => {
        setIsMobile( screenWidth <= 760 )
    }, [screenWidth])

    return (
        <section
            className="
                relative
                w-full h-screen
                flex flex-column md:flex-row md:flex-nowrap
                p-0
            "
        >
            {/* Items */}
           
      
                <IonModal
                    color="light"
                    ref={modal}
                    isOpen={isMobile}
                    initialBreakpoint={0.42}
                    breakpoints={[0.25, 0.5, 0.75]}
                    backdropDismiss={false}
                    backdropBreakpoint={0.5}
                >
                    
                </IonModal>
                {
                    !isMobile && (
                        <article 
                            className="
                                block
                                w-full min-w-full md:w-7/12 md:min-w-min
                                p-6
                                bg-gray-100
                                z-30
                            "
                        >
                            {
                                children
                            }
                        </article>
                    )
                }
            
            


            {/* Map */}
            <article
                className="
                    block
                    w-full min-w-full h-full md:w-5/12 md:min-w-min
                    bg-gray-500
                    z-40
                "
            >
                {
                    map
                }
            </article>
        </section>
    )
}