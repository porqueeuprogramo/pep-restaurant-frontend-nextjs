import {api} from "@/api/index";

export type Menu = { uid: string; language: string; };

export async function fetchMenus()  {
    const res = await api.get('/pep/restaurant/bff/api/menu', {
        data: {}
    })
    return res.data as Menu[];
}

export async function fetchMenuById( menuId: number ) {
    const res = await api.get(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuId}`, {
        data: {}
    })
    return res.data as Menu;
}

export async function createMenu(menu: Menu) {
    const res = await api.post('http://localhost:8080/pep/restaurant/bff/api/menu', menu);
    return res.data as Menu;
}

export async function editMenu(menuId: number, menu: Menu) {
    const res = await api.put(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuId}`, menu);
    return res.data as Menu;
}

export async function deleteMenuById( menuId: number ) {
    const res = await api.delete(`http://localhost:8080/pep/restaurant/bff/api/menu/${menuId}`, {
        data: {}
    })
    return res.data as Menu;
}
