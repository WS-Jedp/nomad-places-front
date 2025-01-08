import { IonRow, IonText } from "@ionic/react";
import { IconType } from "react-icons";
import { getCommodityQualityColor } from "../../../common/utils/colors";
import { COMMODITY_QUALITY } from "../../../models/places";

interface AmmenitiesCardProps {
  state: boolean;
  Icon: IconType;
  amenities: string;
  value?: string;
  tagValue?: boolean;
  commodityQuality?: COMMODITY_QUALITY;
}

export const AmenitiesCard: React.FC<AmmenitiesCardProps> = ({
  Icon,
  amenities,
  state,
  value,
  tagValue,
  commodityQuality,
}) => {
  return (
    <IonRow className="relative w-full h-auto flex flex-row flex-nowrap items-center">
      <Icon
        size="24px"
        className={`mr-2 ${!state ? "text-gray-300" : "text-black"}`}
      />
      <IonText className={`flex flex-row items-center justify-start`}>
        <strong
          className={`font-normal text-md ${
            !state ? "line-through text-gray-400" : ""
          }`}
        >
          {amenities}
          {value && tagValue && (
            <span
              className={`inline-flex rounded-md ml-1 px-1 ${getCommodityQualityColor(
                commodityQuality
              )}`}
            >
              <span className="text-xs font-medium">{value}</span>
            </span>
          )}
        </strong>
      </IonText>
    </IonRow>
  );
};
