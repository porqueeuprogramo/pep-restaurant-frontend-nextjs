import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {fetchMenuById, Menu} from "@/api/fetchMenu";



export default function MenuPageItem(props: { menuData: Menu }) {
    const router = useRouter();
    return (
        <>
            <h1>Menu - {router.query.menuId}</h1>
            <li key={props.menuData.id}>{props.menuData.language}</li>
            <Button variant="contained" href={"/menu"}>Menu</Button>
        </>
    )
}

export async function getServerSideProps(context: { query: { menuId: number; }; }) {
    const menuData = await fetchMenuById(context.query.menuId);
    return { props: { menuData } }
}
