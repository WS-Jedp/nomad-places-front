import { IonCol, IonRow } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { handleSpotTypeIcon } from "../../../common/utils/icons/icons";
import { SimpleButton } from "../../../components/buttons/simple";
import { SimpleDropdown } from "../../../components/dropdowns/simple";
import { SimpleCheckbox } from "../../../components/form/inputs/checkbox";
import { TextInput } from "../../../components/form/inputs/text";
import { TextAreaInput } from "../../../components/form/inputs/textarea";
import { SimpleMindsetCard } from "../../../components/mindsets/cards/simpleCardMindset";
import { SimplePlaceTypeCard } from "../../../components/places/types/cards/simple";
import { SpotCommoditiesFilters, SpotRulesFilters } from "../../../models/filters";
import { PLACE_COMMODITIES_ENUM } from "../../../models/places";

export const DiscoveredPlaceForm: React.FC<{
  onSave: () => void;
  onCancel: () => void;
}> = ({ onCancel, onSave }) => {
  const { t } = useTranslation();
  const {
    spotRulesFilters,
    spotCommoditiesFilter,
    spotTypesFilter,
    spotMindsetFilter,
  } = useAppSelector((state) => state.filters);

  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const handleRuleInput = (id: number) => {
    if (selectedRules.includes(id)) {
      setSelectedRules(selectedRules.filter((rule) => rule !== id));
    } else {
      setSelectedRules([...selectedRules, id]);
    }
  };

  const [selectedCommodities, setSelectedCommodities] = useState<number[]>([]);
  const handleCommodityInput = (id: number) => {
    if (selectedCommodities.includes(id)) {
      setSelectedCommodities(
        selectedCommodities.filter((commodity) => commodity !== id)
      );
    } else {
      setSelectedCommodities([...selectedCommodities, id]);
    }
  };
  //  Rules with detail
  const [wifiSpeed, setWifiSpeed] = useState<string>();
  const [plugsAmount, setPlugsAmonunt] = useState<string>();

  function handleRuleWithDetailInput(rule: SpotCommoditiesFilters, value: string) {
    if (rule.name === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
      setWifiSpeed(value);
    }

    if (rule.name === PLACE_COMMODITIES_ENUM.PLUGS_AMOUNT) {
      setPlugsAmonunt(value);
    }
  }

//   Multimedia content
const [files, setFiles] = useState<File[]>([]);
const [previews, setPreviews] = useState<{ url: string, type: string }[]>([]);

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        updatePreviews(selectedFiles);
    }
};

const updatePreviews = (selectedFiles: File[]) => {
    const newPreviews = selectedFiles.map(file => {
        const fileType = file.type.startsWith('video/') ? 'video' : 'image';
        return { url: URL.createObjectURL(file), type: fileType };
    });
    setPreviews(newPreviews);
};


  return (
    <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto text-start">
      <h2 className="font-bold text-2xl mb-1 text-start">
        Tell us about the Spot
      </h2>
      <p>
        Please, provide us with the following information about the place you
        discovered.
      </p>

      <form className="py-3 w-full">
        <div className="w-full md:w-4/12">
          <TextInput
            label="Name of the spot"
            placeholder="Write the name of the spot"
            value="try"
            callback={() => {}}
          />
        </div>

        <div className="w-full my-2">
          <TextAreaInput
            callback={() => {}}
            label="About the spot"
            placeholder="Write a little description about the spot"
            value={"Description"}
            rows={4}
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold my-1">Spot type</label>
          <IonRow
            className="relative
                    w-full overflow-x-auto overflow-y-hidden py-1
                    flex flex-nowrap items-center justify-start"
          >
            {spotTypesFilter.map((spotType, index) => (
              <div key={index} className="mr-3">
                <SimplePlaceTypeCard
                  text={t(`filters.spotTypes.${spotType.name.toLowerCase()}`)}
                  icon={handleSpotTypeIcon(spotType.name)}
                  callback={() => {}}
                  isSelected={false}
                />
              </div>
            ))}
          </IonRow>
        </div>

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
                  callback={() => {}}
                  mindset={mindset.name}
                  isSelected={false}
                />
              </div>
            ))}
          </IonRow>
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold my-1">Spot Rules</label>
          <IonRow>
            {spotRulesFilters.map((rule) => (
              <IonCol size="12" sizeMd="6" key={rule.id}>
                <SimpleCheckbox
                  label={t(`filters.rules.${rule.rule}`)}
                  callback={() => handleRuleInput(rule.id)}
                  isSelected={selectedRules.includes(rule.id)}
                  small
                />
              </IonCol>
            ))}
          </IonRow>
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold my-1">Spot Commodities</label>
          <IonRow>
            {spotCommoditiesFilter.map((commodity) => (
              <IonCol size="12" sizeMd="6" key={commodity.id}>
                <SimpleCheckbox
                  label={t(`filters.commodities.${commodity.commodity}`)}
                  callback={() => handleCommodityInput(commodity.id)}
                  isSelected={selectedCommodities.includes(commodity.id)}
                  small
                  withInputValue={
                    commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI && selectedCommodities.includes(commodity.id) ||
                    commodity.commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS && selectedCommodities.includes(commodity.id)
                  }
                  onChangeInputValue={(value) => handleRuleWithDetailInput(commodity, value)}
                />
              </IonCol>
            ))}
          </IonRow>
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold my-1">Spot Multimedia</label>
          <input type="file" multiple onChange={handleFileChange} className="mb-4" accept="image/*,video/*" />
            <div className="grid grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                    <div key={index} className="w-full">
                        {preview.type === 'image' ? (
                            <img src={preview.url} alt="Preview" className="w-full h-auto" />
                        ) : (
                            <video src={preview.url} controls className="w-full h-auto" />
                        )}
                    </div>
                ))}
            </div>
        </div>
      </form>
      <div className="my-5">
        <SimpleButton text="Save" action={() => {}} />
      </div>
    </section>
  );
};
