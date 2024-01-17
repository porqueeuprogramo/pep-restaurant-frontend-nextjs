import {Box, OutlinedInput} from "@mui/material";
import React, {useState} from "react";
import {Restaurant, Schedule, ScheduleTime} from "@/domain/restaurantDomain";

interface weekDayProps {
    restaurant?: Restaurant;
    setRestaurant: React.Dispatch<React.SetStateAction<Restaurant | undefined>>;
    weekDay: string;
    mealName: string;
}

export default function WeekdaySchedule({restaurant, setRestaurant , weekDay, mealName} : weekDayProps ) {

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newSchedule: Schedule = {
            MONDAY: [
                {
                    startTime: event.target.value,
                    endTime: endTime
                }
            ]
        };

        setStartTime(event.target.value)

        const newRestaurant: Restaurant = {
            uid: restaurant?.uid || '',
            name: restaurant?.name || '',
            hereId: restaurant?.hereId || '',
            location: {
                address: {
                    name: restaurant?.location.address.name || '',
                    postalCode: restaurant?.location.address.postalCode || '',
                    city: restaurant?.location.address.city || '',
                    country: restaurant?.location.address.country || '',
                },
                locationCoordinate: {
                    latitude: isNaN(restaurant?.location.locationCoordinate.latitude || 0) ? 0 : restaurant?.location.locationCoordinate.latitude || 0,
                    longitude: isNaN(restaurant?.location.locationCoordinate.longitude || 0) ? 0 : restaurant?.location.locationCoordinate.longitude || 0,
                },
            },
            capacity: restaurant?.capacity || 0,
            menu: {
                language: restaurant?.menu.language || '',
            },
            schedule: newSchedule
        };
        console.log(newRestaurant)
        setRestaurant(newRestaurant)
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newSchedule: Schedule = {
            MONDAY: [
                {
                    startTime: startTime,
                    endTime: event.target.value
                }
            ]
        };

        setEndTime(event.target.value)

        const newRestaurant: Restaurant = {
            uid: restaurant?.uid || '',
            name: restaurant?.name || '',
            hereId: restaurant?.hereId || '',
            location: {
                address: {
                    name: restaurant?.location.address.name || '',
                    postalCode: restaurant?.location.address.postalCode || '',
                    city: restaurant?.location.address.city || '',
                    country: restaurant?.location.address.country || '',
                },
                locationCoordinate: {
                    latitude: isNaN(restaurant?.location.locationCoordinate.latitude || 0) ? 0 : restaurant?.location.locationCoordinate.latitude || 0,
                    longitude: isNaN(restaurant?.location.locationCoordinate.longitude || 0) ? 0 : restaurant?.location.locationCoordinate.longitude || 0,
                },
            },
            capacity: restaurant?.capacity || 0,
            menu: {
                language: restaurant?.menu.language || '',
            },
            schedule: newSchedule
        };

        //TODO pass values of restaurants using this implm
        // const newRestaurant: Restaurant = {...restaurant,
        //     schedule: newSchedule
        // };
        //----

        console.log(newRestaurant)
        setRestaurant(newRestaurant)
    };

    return (
        <div>
            <Box display="flex" flexDirection="row" alignItems="center" sx={{width: '450px'}}>
                <b>{`${mealName}`}</b>
                <OutlinedInput
                    placeholder={`${weekDay} ${mealName} Start Time`}
                    onChange={handleStartTimeChange}
                />
                <OutlinedInput
                    placeholder={`${weekDay} ${mealName} End Time`}
                    onChange={handleEndTimeChange}
                />
            </Box>
        </div>
    );
}