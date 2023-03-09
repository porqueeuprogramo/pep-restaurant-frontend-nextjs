import fetchToken from "@/api/fetchToken";
import {type} from "os";

export type Menu = { id: number; language: string; };

export async function fetchMenus() : Promise<{ data: Menu[] }> {
    const token = await fetchToken();
    const res = await fetch('http://localhost:8080/pep/restaurant/bff/api/menu', {
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Content-Type': 'application/json'
        }
    })

    return (await res.json()) as ({ data: Menu[] })
}

export async function fetchMenuById( menuId: number ) : Promise<{ data: Menu }> {
    const token = await fetchToken();
    const res = await fetch(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuId}`, {
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Content-Type': 'application/json'
        }
    })

    return (await res.json()) as ({ data: Menu })
}