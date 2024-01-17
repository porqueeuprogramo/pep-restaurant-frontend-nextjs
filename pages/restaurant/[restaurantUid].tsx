import {Button} from "@mui/material";
import {useRouter} from "next/router";
import useGetRestaurantById from "@/hooks/useGetRestaurantByUid";
import React, {useEffect, useState} from "react";
import {deleteRestaurantByUid, ScheduleTime} from "@/api/restaurant";
import Link from "next/link";
import useGetRestaurantByUid from "@/hooks/useGetRestaurantByUid";

export default function RestaurantPageItem() {
    const router = useRouter();
    const restaurantQuery = useGetRestaurantByUid(router.query.restaurantUid);

    const [uid, setUid] = useState();
    //const [language, setLanguage] = useState();

    // const handleEdit = async (event : any) => {
    //     event.preventDefault();
    //     const restaurant = { uid: uid, language: language }
    //     await editRestaurant(router.query.restaurantUid, restaurant);
    //     restaurantQuery.refetch();
    // }

    // useEffect(() => {
    //     if (restaurantQuery.data) {
    //         setUid(restaurantQuery.data.uid)
    //         setLanguage(restaurantQuery.data.language)
    //     }
    // }, [restaurantQuery.data]);
    //
    // if (!restaurantQuery.data) return <p>Loading...</p>
    //
    const handleDelete = async (event : any) => {
        event.preventDefault();
        await deleteRestaurantByUid(router.query.restaurantUid);
        router.push('/restaurant')
    }

    function printKeyWithScheduleTimeList(key: string) {
        return <>
            <li>{key}</li>
            {restaurantQuery.data?.schedule.daysScheduleMap[key]
                .map(scheduleTime => printScheduleTime(scheduleTime))}
        </>
    }

    function printScheduleTime(scheduleTime: ScheduleTime) {
        return <>
            <li>start Time: {scheduleTime.startTime}</li>
            <li>end Time: {scheduleTime.endTime}</li>
        </>
    }

    function printSchedule() {
        if(restaurantQuery.data?.schedule.daysScheduleMap !== undefined){
            return Object.keys(restaurantQuery.data?.schedule.daysScheduleMap)
                .map( key => printKeyWithScheduleTimeList(key))
        }
    }

    function printRestaurant(){
        return <>
            <h1>Restaurant Id: {router.query.restaurantUid}</h1>
            <li key={restaurantQuery.data?.uid}>Name: {restaurantQuery.data?.name}</li>
            <li key={restaurantQuery.data?.uid}>HereId: {restaurantQuery.data?.hereId}</li>
            <li key={restaurantQuery.data?.uid}>Uid: {restaurantQuery.data?.uid}</li>
            <li>ADDRESS:</li>
            <li key={restaurantQuery.data?.uid}>Name: {restaurantQuery.data?.location.address.name}</li>
            <li key={restaurantQuery.data?.uid}>City: {restaurantQuery.data?.location.address.city}</li>
            <li key={restaurantQuery.data?.uid}>Country: {restaurantQuery.data?.location.address.country}</li>
            <li key={restaurantQuery.data?.uid}>PostalCode: {restaurantQuery.data?.location.address.postalCode}</li>
            <li>LOCATION:</li>
            <li key={restaurantQuery.data?.uid}>latitude: {restaurantQuery.data?.location.locationCoordinate.latitude}</li>
            <li key={restaurantQuery.data?.uid}>longitude: {restaurantQuery.data?.location.locationCoordinate.longitude}</li>
            <li key={restaurantQuery.data?.uid}>Capacity: {restaurantQuery.data?.capacity}</li>
            <li>MENU:</li>
            <li key={restaurantQuery.data?.uid}>Language: {restaurantQuery.data?.menu.language}</li>
            {printSchedule()}
        </>

    }

    return (
        <>

            {printRestaurant()}
            <Button variant="contained" href={"/restaurant"}>Restaurant List</Button>

            {/*<h1>Edit Restaurant</h1>*/}
            {/*<form onSubmit={handleEdit}>*/}
            {/*    <FormControl sx={{width: '25ch'}}>*/}
            {/*        <OutlinedInput placeholder="language" value={language} onChange={e => setLanguage(e.target.value)}/>*/}
            {/*    </FormControl>*/}
            {/*    <Button type="submit" variant="contained">Submit</Button>*/}
            {/*</form>*/}

            <Button variant="contained" onClick={handleDelete}>Delete</Button>
        </>
    )
}
