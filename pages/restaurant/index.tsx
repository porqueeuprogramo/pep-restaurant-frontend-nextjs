import { Inter } from 'next/font/google'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import useGetRestaurants from "@/hooks/useGetRestaurants";
import {keys} from "@mui/system";
import {Restaurant, ScheduleTime} from "@/api/restaurant";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {Button} from "@mui/material";

const inter = Inter({ subsets: ['latin'] })

export default function RestaurantPage() {

    const restaurants = useGetRestaurants();
    const router = useRouter();

    const [uid, setUid] = useState();
    // const [language, setLanguage] = useState();
    //
    // const handleSubmit = async (event : any) => {
    //     event.preventDefault();
    //     const restaurant = { language: language }
    //     await createRestaurant(restaurant);
    //     restaurants.refetch();
    // }

    function printRestaurants() {
        if(restaurants.data !== undefined) {
            return restaurants.data?.map(restaurant => <>
                <Link key={restaurant.uid} href={`/restaurant/${restaurant.uid}`}>
                    Name: {restaurant.name} -
                    Id: {restaurant.uid}
                </Link>
                <br/>
            </>)
        }
    }

    useEffect(() => {
        console.log(restaurants.data?.length)
        restaurants.data?.length == 0 ? router.push('/') : printRestaurants()
    }, [restaurants, router]);


    return (
        <>
            {restaurants.data && printRestaurants()}
            <Button variant="contained" href={"/"}>Main Menu</Button>
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <FormControl sx={{width: '25ch'}}>*/}
            {/*        <OutlinedInput placeholder="language" value={language} onChange={e => setLanguage(e.target.value)}/>*/}
            {/*    </FormControl>*/}
            {/*    <Button type="submit" variant="contained">Submit</Button>*/}
            {/*</form>*/}
        </>
    )
}


