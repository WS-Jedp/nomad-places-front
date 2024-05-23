import { useAppSelector } from "../useTypedSelectors"

export const useRewardPoints = () => {
    const { userData } = useAppSelector(state => state.user)
}