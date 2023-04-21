import { IonRow, IonText, IonItemDivider } from "@ionic/react";

export const LocationBasicInformation: React.FC = () => {
  return (
    <IonRow
      className="
                relative
                flex flex-col md:flex-row md:items-center w-full p-9 md:py-4
            "
    >
      <IonText color="white" className="block">
        <h1 className="text-xl font-bold font-sans">El poblado, Medellin</h1>
      </IonText>
      <div className="hidden md:inline-block mx-3 h-full w-[1px] bg-gray-300"></div>
      <IonText className="block">
        <h2 className="text-sm font-semibold font-sans text-gray-500 mt-1 md:mt-0">
          22 - Mostly cloudy
        </h2>
      </IonText>
    </IonRow>
  );
};
