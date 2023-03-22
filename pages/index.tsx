import { Inter } from 'next/font/google'
import {Button} from "@mui/material";
import token from "@/api/token";
import {useEffect} from "react";
import {setCookie} from "nookies";
import Link from "next/link";
import {api} from "@/api";

const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {

     useEffect(() => {
         setCookie(null, 'token' , props.data.access_token);
     }, [])

    return (
        <>
            <Link passHref href={"/menu"}>
                <Button variant="contained" >Menu</Button>
            </Link>
        </>
    )
}

export async function getServerSideProps() {
    const tokenValue = await token();
    return { props: {data: tokenValue} }
}
