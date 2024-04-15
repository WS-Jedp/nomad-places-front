import { IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors";
import { SimpleMindsetCard } from "../../../../components/mindsets/cards/simpleCardMindset";
import { MINDSETS } from "../../../../models/mindsets";

export interface SpotKnownForProps {
    onSpotKnownFor: (mindset: MINDSETS) => void
    selectedSpotKnownFor?: MINDSETS
}

export const SpotKnownForInput: React.FC<SpotKnownForProps> = ({ onSpotKnownFor, selectedSpotKnownFor }) => {
    const { t } = useTranslation()
    const { spotMindsetFilter } = useAppSelector(state => state.filters)
  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">Know for</label>
      <IonRow
        className="relative
                    w-full overflow-x-auto overflow-y-hidden py-1
                    flex flex-nowrap items-center justify-start"
      >
        {spotMindsetFilter.map((mindset, index) => (
          <div key={index} className="mr-3">
            <SimpleMindsetCard
              text={t(`filters.mindsets.${mindset.name.toLowerCase()}`)}
              callback={() => onSpotKnownFor(mindset.name)}
              mindset={mindset.name}
              isSelected={selectedSpotKnownFor === mindset.name}
            />
          </div>
        ))}
      </IonRow>
    </div>
  );
};
