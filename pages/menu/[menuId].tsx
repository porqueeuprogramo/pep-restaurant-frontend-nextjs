import {Button, FormControl, OutlinedInput} from "@mui/material";
import {useRouter} from "next/router";
import useGetMenuById from "@/hooks/useGetMenuById";
import React, {useEffect, useState} from "react";
import {deleteMenuById, editMenu} from "@/api/menu";
import {setCookie} from "nookies";

export default function MenuPageItem() {
    const router = useRouter();
    const menuQuery = useGetMenuById(router.query.menuId);

    const [id, setId] = useState();
    const [language, setLanguage] = useState();

    const handleEdit = async (event : any) => {
        event.preventDefault();
        const menu = { id: id, language: language }
        await editMenu(router.query.menuId, menu);
        menuQuery.refetch();
    }

    useEffect(() => {
        if (menuQuery.data) {
            setId(menuQuery.data.id)
            setLanguage(menuQuery.data.language)
        }
    }, [menuQuery.data]);

    if (!menuQuery.data) return <p>Loading...</p>

    const handleDelete = async (event : any) => {
        event.preventDefault();
        await deleteMenuById(router.query.menuId);
        router.push('/menu')
    }


    return (
        <>
            <h1>Menu - {router.query.menuId}</h1>
            <li key={menuQuery.data.id}>{menuQuery.data.language}</li>
            <Button variant="contained" href={"/menu"}>Menu</Button>

            <h1>Edit Menu</h1>
            <form onSubmit={handleEdit}>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="id" value={id} onChange={e => setId(e.target.value)}/>
                </FormControl>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="language" value={language} onChange={e => setLanguage(e.target.value)}/>
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
            </form>

            <Button variant="contained" onClick={handleDelete}>Delete</Button>
        </>
    )
}
