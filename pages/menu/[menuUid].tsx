import {Button, FormControl, OutlinedInput} from "@mui/material";
import {useRouter} from "next/router";
import useGetMenuById from "@/hooks/useGetMenuById";
import React, {useEffect, useState} from "react";
import {deleteMenuByUid, editMenu} from "@/api/menu";

export default function MenuPageItem() {
    const router = useRouter();
    const menuQuery = useGetMenuById(router.query.menuUid);

    const [uid, setUid] = useState();
    const [language, setLanguage] = useState();

    const handleEdit = async (event : any) => {
        event.preventDefault();
        const menu = { uid: uid, language: language }
        await editMenu(router.query.menuUid, menu);
        menuQuery.refetch();
    }

    useEffect(() => {
        if (menuQuery.data) {
            setUid(menuQuery.data.uid)
            setLanguage(menuQuery.data.language)
        }
    }, [menuQuery.data]);

    if (!menuQuery.data) return <p>Loading...</p>

    const handleDelete = async (event : any) => {
        event.preventDefault();
        await deleteMenuByUid(router.query.menuUid);
        router.push('/menu')
    }


    return (
        <>
            <h1>Menu - {router.query.menuUid}</h1>
            <li key={menuQuery.data.Uid}>{menuQuery.data.language}</li>
            <Button variant="contained" href={"/menu"}>Menu</Button>

            <h1>Edit Menu</h1>
            <form onSubmit={handleEdit}>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="uid" value={uid} onChange={e => setId(e.target.value)}/>
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
