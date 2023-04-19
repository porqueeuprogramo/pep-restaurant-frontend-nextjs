import {api} from "@/api/index";

export type Menu = { uid: string; language: string; };

export async function fetchMenus()  {
    const res = await api.get('/pep/restaurant/bff/api/menu', {
        data: {}
    })
    return res.data as Menu[];
}

export async function fetchMenuByUid( menuUid: number ) {
    const res = await api.get(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuUid}`, {
        data: {}
    })
    return res.data as Menu;
}

export async function createMenu(language: string) {
    const res = await api.post('http://localhost:8080/pep/restaurant/bff/api/menu', language);
    return res.data as Menu;
}

export async function editMenu(menuUid: number, menu: Menu) {
    const res = await api.put(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuUid}`, menu);
    return res.data as Menu;
}

export async function deleteMenuByUid( menuUid: number ) {
    const res = await api.delete(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuUid}`, {
        data: {}
    })
    return res.data as Menu;
}
