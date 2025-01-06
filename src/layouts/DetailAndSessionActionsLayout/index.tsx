import { IonCol, IonPage, IonRow } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useIsMobile } from "../../common/hooks/useIsMobile";
import { GeneralHeader } from "../../components/header/general";

interface DetailAndSessionActionsLayoutProps {
  children: JSX.Element;
  secondTab: JSX.Element;
}

export const DetailAndSessionActionsLayout: React.FC<
  DetailAndSessionActionsLayoutProps
> = ({ children, secondTab }) => {
  const { t } = useTranslation();
  const [isMobile] = useIsMobile();
  const [isRenderSession, setIsRenderSession] = useState<boolean>(true);

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
      <IonPage
        className="
                relative
                w-full h-screen overflow-hidden
                flex flex-column md:flex-row md:flex-nowrap
                p-0
            "
      >
        <IonCol
          size="12"
          sizeMd="7"
          className="relative
                  flex flex-col
                  w-full min-w-full md:w-7/12 md:min-w-min
                  bg-white text-black
                  z-30
                  ion-no-padding"
        >
          {children}
        </IonCol>
        <IonCol
          size="12"
          sizeMd="5"
          className="block
            w-full min-w-full h-full md:w-5/12 md:min-w-min
            z-40
            ion-no-padding ion-no-margin"
        >
          {secondTab}
        </IonCol>
      </IonPage>
    );
  }

  return (
    <IonRow className="w-full relative flex flex-col bg-gray-100">
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
                {t("spots.information.aboutTheSpot")}
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
                {t("spots.information.aboutTheSession")}
              </h2>
            </section>
          </IonCol>
        </IonRow>
      )}

      <IonRow className="w-full h-auto relative bg-gray-100 text-black">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </IonRow>
    </IonRow>
  );
};
