import { IonRow } from "@ionic/react";
import { HandleMindsetTags } from "../../tags/mindsets";
import {
  resetMindsetlaceFilters,
  selectSpotKnownForFilter,
  removeSpotKnownForFilter,
  resetSpotKnownForFilters,
} from "../../../store/redux/slices/filters";

import { AllMindsetTag } from "../../tags/mindsets/all";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";

export const RowPlacesFilterOptions: React.FC<{ chilren?: JSX.Element }> = ({
  chilren,
}) => {
  const dispatch = useAppDispatch();

  const {
    spotKnownForFilter: filters,
    selectedSpotKnownForFilter: selectedFilters,
  } = useAppSelector((state) => state.filters);

  const handleAction = (filterID: number) => {
    if (selectedFilters.some((id) => id === filterID)) {
      dispatch(removeSpotKnownForFilter({ spotKnownForFilterID: filterID }));
    } else {
      dispatch(selectSpotKnownForFilter({ spotKnownForFilterID: filterID }));
    }
  };

  const isFilterActivated = (filterID: number): boolean =>
    selectedFilters.some((id) => id === filterID);

  const handleAllTagActions = () => {
    if (selectedFilters.length === filters.length) return;
    dispatch(resetSpotKnownForFilters());
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
      <AllMindsetTag onClick={handleAllTagActions} />

      <div className="inline-flex ml-3 mr-6 h-full w-[1px] bg-gray-300"></div>

      {/* Other filters */}
      {filters.map((filter) => (
        <div className="mr-1" key={filter.id}>
          <HandleMindsetTags
            disabled={!isFilterActivated(filter.id)}
            mindset={filter.name}
            action={() => handleAction(filter.id)}
          />
        </div>
      ))}
    </IonRow>
  );
};
