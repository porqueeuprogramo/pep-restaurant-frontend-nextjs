import { Inter } from 'next/font/google'
import {Button, FormControl, OutlinedInput} from "@mui/material";
import {createMenu} from "@/api/menu";
import React, {useState} from 'react';
import Link from "next/link";
import useGetMenus from "@/hooks/useGetMenus";

const inter = Inter({ subsets: ['latin'] })

export default function MenuPage() {

    const menus = useGetMenus();

    const [id, setId] = useState();
    const [language, setLanguage] = useState();

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        const menu = { id: id, language: language }
        await createMenu(menu);
        menus.refetch();
    }

    return (
        <>
            {menus.data?.map(menu => <>
                <Link key={menu.id} href={`/menu/${menu.id}`}>{menu.language}</Link>
                <br/>
            </>)}

            <Button variant="contained" href={"/"}>Home</Button>

            <form onSubmit={handleSubmit}>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="id" value={id} onChange={e => setId(e.target.value)}/>
                </FormControl>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="language" value={language} onChange={e => setLanguage(e.target.value)}/>
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </>
    )
}


