import {useQuery} from "@tanstack/react-query";
import {fetchMenus} from "@/api/menu";
import {parseCookies} from "nookies";

export default function useGetMenus() {
    return useQuery(["get-menus"], fetchMenus);
}

