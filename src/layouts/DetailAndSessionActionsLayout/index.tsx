import { IonCol, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router";

import { useIsMobile } from "../../common/hooks/useIsMobile";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { GeneralHeader } from "../../components/header/general";

interface DetailAndSessionActionsLayoutProps {
  children: JSX.Element;
  secondTab: JSX.Element;
}

export const DetailAndSessionActionsLayout: React.FC<
  DetailAndSessionActionsLayoutProps
> = ({ children, secondTab }) => {
  const [isMobile] = useIsMobile();
  const history = useHistory();
  const [isRenderSession, setIsRenderSession] = useState<boolean>(false);
  const currentPlace = useAppSelector((state) => state.places.currentPlace);


  function renderMobileView() {
    return (
      <>
        {!isRenderSession ? (
          <IonCol size="12">{children}</IonCol>
        ) : (
          <IonCol size="12" className="pb-32">
            {secondTab}
          </IonCol>
        )}
      </>
    );
  }

  function renderDesktopView() {
    return (
      <>
        <IonCol
          size="12"
          sizeMd="6"
          className="bg-gray-50 overflow-y-auto h-screen"
        >
          <section className="py-5 w-full border-b-[2px] border-b-gray-300">
              <IonRow className="px-3 d-flex flex-row flex-nowrap mb-2">
                <BackNavigationButton />
              </IonRow>
            <IonText>
              <h2 className="font-bold text-3xl px-3">{currentPlace?.name}</h2>
              <p className="pt-1 px-3">
                <span>Type of place</span> - <span>Zone of the place</span>
              </p>
            </IonText>
          </section>
          {children}
        </IonCol>
        <IonCol size="12" sizeMd="6" className="overflow-y-auto h-screen pb-32">
          {secondTab}
        </IonCol>
      </>
    );
  }

  return (
    <IonRow className="w-screen h-auto relative overflow-hidden flex flex-col bg-gray-100">
      {/* Header of the layout */}
      {!isMobile && <GeneralHeader />}

      {/* Tabs for change section in mobile view - This should be an independent component */}
      {isMobile && (
        <IonRow className="w-full flex-row flex-nowrap h-12 border-b-[1px] border-gray-300 ">
          <IonCol size="6" onClick={() => setIsRenderSession(false)}>
            <section
              className={`
                            w-full h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${!isRenderSession ? "bg-gray-300" : ""}
                        `}
            >
              <h2
                className={`text-black ${!isRenderSession ? "font-bold" : ""}`}
              >
                About The Place
              </h2>
            </section>
          </IonCol>
          <IonCol size="6" onClick={() => setIsRenderSession(true)}>
            <section
              className={`
                            h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${isRenderSession ? "bg-gray-300" : ""}
                        `}
            >
              <h2
                className={`text-black ${isRenderSession ? "font-bold" : ""}`}
              >
                About The Session
              </h2>
            </section>
          </IonCol>
        </IonRow>
      )}

      <IonRow className="w-full h-screen relative overflow-y-auto overflow-x-hidden bg-gray-100 text-black">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </IonRow>
    </IonRow>
  );
};
