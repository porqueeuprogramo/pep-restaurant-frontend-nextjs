import {useQuery} from "@tanstack/react-query";
import {fetchRestaurants} from "@/api/restaurant";
import {parseCookies} from "nookies";

export default function useGetRestaurants() {
    return useQuery({ queryKey: ["get-restaurants"], queryFn: fetchRestaurants, refetchOnWindowFocus: false });
}

