import { InputRowSelect } from "../../form/container/rowSelect";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { selectSpotAmountPeopleFilter, removeSpotAmountPeopleFilter } from "../../../store/redux/slices/filters";

export const SpotAmountPeopleFilter: React.FC = () => {
  const { spotAmountPeopleFilter, selectedSpotAmountPeopleFilter } =
    useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch()
  return (
    <InputRowSelect
      defaultOption={{
        id: 0,
        text: "Any",
      }}
      selectedOptionId={selectedSpotAmountPeopleFilter || 0}
      options={spotAmountPeopleFilter.map((spotAmountPeople) => ({
        id: spotAmountPeople.id,
        text: spotAmountPeople.text,
      }))}
      onChange={(id) => dispatch(selectSpotAmountPeopleFilter({ spotAmountPeopleFilterID: id }))}
      onDefaultOptionClick={() => dispatch(removeSpotAmountPeopleFilter())}
    />
  );
};
