import { Inter } from 'next/font/google'
import {Button} from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Button variant="contained" href={"/menu"}>Menu</Button>
    </>
  )
}
