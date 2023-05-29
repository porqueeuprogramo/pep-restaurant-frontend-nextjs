import {useQuery} from "@tanstack/react-query";
import {fetchRestaurantByUid} from "@/api/restaurant";

export default function useGetRestaurantByUid(restaurantUid: string) {
    return useQuery(
        ["get-restaurant-by-uid", restaurantUid],
        async () => {
            if(!restaurantUid) return null
            return await fetchRestaurantByUid(restaurantUid)
        } );
}


