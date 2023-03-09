import { Inter } from 'next/font/google'
import {Button} from "@mui/material";
import {fetchMenus, Menu} from "@/api/fetchMenu";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function MenuPage( props: { menuData: Menu[] }) {
    return (
        <>
            {props.menuData.map(menu => <>
                <Link key={menu.id} href={`/menu/${menu.id}`}>{menu.language}</Link>
                <br/>
            </>)}
            <Button variant="contained" href={"/"}>Home</Button>
        </>
    )
}

export async function getServerSideProps() {
    const menuData = await fetchMenus();
    return { props: { menuData } }
}