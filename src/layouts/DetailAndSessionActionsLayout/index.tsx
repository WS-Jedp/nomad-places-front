import { IonCol, IonRow } from "@ionic/react";
import { useState } from "react";
import { useIsMobile } from "../../common/hooks/useIsMobile";

interface DetailAndSessionActionsLayoutProps {
  children: JSX.Element;
  secondTab: JSX.Element;
}

export const DetailAndSessionActionsLayout: React.FC<
  DetailAndSessionActionsLayoutProps
> = ({ children, secondTab }) => {
  const [isMobile] = useIsMobile();
  const [isRenderSession, setIsRenderSession] = useState<boolean>(false);

  function renderMobileView() {
    return (
        <>
            {
                !isRenderSession ? (
                    <IonCol size="12">
                        {children}
                    </IonCol>
                ) : (
                    <IonCol size="12" className="pb-32">
                        {secondTab}
                    </IonCol>
                )
            }
        </>
    )
  }

  function renderDesktopView() {
    return (
        <>
            <IonCol size="12" sizeMd="6" className="bg-gray-50 overflow-y-auto h-screen">
                {children}
            </IonCol>
            <IonCol size="12" sizeMd="6" className="overflow-y-auto h-screen pb-32">
                {secondTab}
            </IonCol>
        </>
    )
  }

  return (
    <IonRow className="w-screen h-auto relative overflow-hidden flex flex-col bg-gray-100">
      {isMobile && (
        <IonRow className="w-full flex-row flex-nowrap h-12 border-b-[1px] border-gray-300 ">
          <IonCol
            size="6"
            onClick={() => setIsRenderSession(false)}
          >
            <section  className={`
                            w-full h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${!isRenderSession ? "bg-gray-300" : ""}
                        `}
            >
              <h2 className={`text-black ${!isRenderSession ? "font-bold" : ""}`}>
                About The Place
              </h2>
            </section>
          </IonCol>
          <IonCol
            size="6"
            onClick={() => setIsRenderSession(true)}
            
          >
            <section className={`
                            h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${isRenderSession ? "bg-gray-300" : ""}
                        `}
            >
              <h2 className={`text-black ${isRenderSession ? "font-bold" : ""}`}>
                About The Session
              </h2>
            </section>
          </IonCol>
        </IonRow>
      )}

      <IonRow className="w-full h-screen relative overflow-y-auto overflow-x-hidden bg-gray-100 text-black">
        {
            isMobile ? renderMobileView() : renderDesktopView()
        }
      </IonRow>

    </IonRow>
  );
};
