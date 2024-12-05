import { IonRow } from "@ionic/react";
import { HandleMindsetTags } from "../../tags/mindsets";
import {
  resetMindsetlaceFilters,
  selectSpotKnownForFilter,
  removeSpotKnownForFilter,
  resetSpotKnownForFilters,
  selectSpotTypeFilter,
  removeSpotTypeFilter,
  resetSelectedSpotTypeFilters,
} from "../../../store/redux/slices/filters";

import { AllMindsetTag } from "../../tags/mindsets/all";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { PlaceTypeTag } from "../../tags/placeTypes";
import { AllPlaceTypesTag } from "../../tags/placeTypes/all";

export const RowPlacesTypeFilterOptions: React.FC<{ chilren?: JSX.Element }> = ({
  chilren,
}) => {
  const dispatch = useAppDispatch();

  const { spotTypesFilter: filters, selectedSpotTypesFilter: selectedFilters } =
    useAppSelector((state) => state.filters);

  const handleAction = (filterID: number) => {
    if (selectedFilters.some((id) => id === filterID)) {
      dispatch(removeSpotTypeFilter({ spotTypeFilterID: filterID }));
    } else {
      dispatch(selectSpotTypeFilter({ spotTypeFilterID: filterID }));
    }
  };

  const isFilterActivated = (filterID: number): boolean =>
    selectedFilters.some((id) => id === filterID);

  const handleAllTagActions = () => {
    if (selectedFilters.length === filters.length) return;
    dispatch(resetSelectedSpotTypeFilters());
  };

  return (
    <IonRow
      className="
            relative
            w-full h-14 overflow-x-auto overflow-y-hidden
            flex flex-nowrap items-center
            border-y border-gray-300
            px-3 md:px-9
        "
    >
      <AllPlaceTypesTag onClick={handleAllTagActions} />

      <div className="inline-flex ml-3 mr-6 h-full w-[1px] bg-gray-300"></div>

      {/* Other filters */}
      {filters.map((filter) => (
        <div className="mr-1" key={filter.id}>
          <PlaceTypeTag
            type={filter.name}
            isSelected={isFilterActivated(filter.id)}
            disabled={!isFilterActivated(filter.id)}
            action={() => handleAction(filter.id)}
          />
        </div>
      ))}
    </IonRow>
  );
};
