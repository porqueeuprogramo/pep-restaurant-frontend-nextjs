import {useQuery} from "@tanstack/react-query";
import {fetchMenuByUid} from "@/api/menu";

export default function useGetMenuByUid(menuId: number) {
    return useQuery(
        ["get-menu-by-uid", menuId],
        async () => {
            if(!menuId) return null
            return await fetchMenuByUid(menuId)
        } );
}


