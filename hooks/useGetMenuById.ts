import {useQuery} from "@tanstack/react-query";
import {fetchMenuById} from "@/api/menu";

export default function useGetMenuById(menuId: number) {
    return useQuery(
        ["get-menu-by-id", menuId],
        async () => {
            if(!menuId) return null
            return await fetchMenuById(menuId)
        } );
}


