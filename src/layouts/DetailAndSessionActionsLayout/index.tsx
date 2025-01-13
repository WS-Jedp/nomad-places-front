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
          <IonCol size="12" className="w-full">{children}</IonCol>
        ) : (
          <IonCol size="12" className="h-full">
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
                w-full
                flex flex-row flex-nowrap
                p-0
                ion-no-padding
            "
      >
        <IonCol
          size="12"
          sizeMd="7"
          className="relative
                  flex flex-col
                  w-full min-w-full md:w-7/12 md:min-w-min
                  bg-white text-coffi-black
                  z-30
                  ion-no-padding"
        >
          {children}
        </IonCol>
        <IonCol
          size="12"
          sizeMd="5"
          className="block
            w-full min-w-full md:w-5/12 md:min-w-min
            z-40
            ion-no-padding ion-no-margin"
        >
          {secondTab}
        </IonCol>
      </IonPage>
    );
  }

  return (
    <IonRow className="w-full h-full text-coffi-black">
      {/* Header of the layout */}
      {!isMobile && <GeneralHeader />}

      {/* Tabs for change section in mobile view - This should be an independent component */}
      {isMobile && (
        <IonRow className="relative w-full flex-row flex-nowrap h-12 border-b-[1px] border-gray-300 ">
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
                className={`text-coffi-black ${!isRenderSession ? "font-bold" : ""}`}
              >
                {t("spots.information.aboutTheSpot")}
              </h2>
            </section>
          </IonCol>
          <IonCol size="6" onClick={() => setIsRenderSession(true)}>
            <section
              className={`
                            w-full h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${isRenderSession ? "bg-gray-300" : ""}
                        `}
            >
              <h2
                className={`text-coffi-black ${isRenderSession ? "font-bold" : ""}`}
              >
                {t("spots.information.aboutTheSession")}
              </h2>
            </section>
          </IonCol>
        </IonRow>
      )}

      <IonRow className="relative w-full md:h-full bg-gray-100 text-coffi-black">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </IonRow>
    </IonRow>
  );
};
