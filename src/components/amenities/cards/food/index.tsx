import { MdOutlineRestaurant } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"
import { COMMODITY_QUALITY, FOOD_COMMODITY_ENUM } from "../../../../models/places"

interface FoodCommoditiessCardProps {
    state?: boolean
    value?: FOOD_COMMODITY_ENUM[] | null
    quality?: COMMODITY_QUALITY | null
}

export const FoodAmenitiesCard:React.FC<FoodCommoditiessCardProps> = ({ state, value = null, quality = null }) => {
    const { t } = useTranslation()

    function getFoodTypesText() {
        if (!state || !value || !value.length) return t(`filters.commodities.food.label`);
    
        if (value.length === 1) return t(`filters.commodities.food.${value[0]}`);
    
        const foodtypes = Array(...value);
        const lastFoodType = foodtypes.pop();
        return `${t('messages.utils.find')} ${foodtypes.map((r, i) => t(`filters.options.${r}`).toLowerCase()).join(', ')}  ${t('messages.utils.and')} ${t(`filters.options.${lastFoodType}`).toLowerCase()}`;
      }
    return (
        <AmenitiesCard 
            Icon={MdOutlineRestaurant}
            amenities={getFoodTypesText()}
            state={state || false}
            value={t(`filters.options.${quality}`)}
            tagValue
            commodityQuality={quality as COMMODITY_QUALITY}
        />
    )
}