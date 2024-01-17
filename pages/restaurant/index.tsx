import React, {useEffect, useReducer, useRef, useState} from 'react';
import Link from "next/link";
import useGetRestaurants from "@/hooks/useGetRestaurants";
import {useRouter} from "next/router";
import {Button, FormControl, OutlinedInput} from "@mui/material";
import {createRestaurant} from "@/api/restaurant";
import useAutocomplete from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import WeekdaySchedule from "@/pages/restaurant/weekdaySchedule";
import {
    daysOfWeek,
    FilmOptionType,
    InputWrapper,
    Label,
    Listbox,
    StyledTag,
    WeekDayStyle
} from "@/pages/restaurant/weekDayStyle";
import {Restaurant} from "@/domain/restaurantDomain";
import {api} from "@/api";

export default function RestaurantPage() {
    const restaurantHTMLRefs = {
        name: useRef<HTMLInputElement>(null),
        addressName: useRef<HTMLInputElement>(null),
        addressPostalCode: useRef<HTMLInputElement>(null),
        addressCity: useRef<HTMLInputElement>(null),
        addressCountry: useRef<HTMLInputElement>(null),
        locationCoordinateLatitude: useRef<HTMLInputElement>(null),
        locationCoordinateLongitude: useRef<HTMLInputElement>(null),
        capacity: useRef<HTMLInputElement>(null),
        menuLanguage: useRef<HTMLInputElement>(null)
    }
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const restaurants = useGetRestaurants();
    const router = useRouter();

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'weekDaySelector',
        defaultValue: [],
        multiple: true,
        options: daysOfWeek,
        getOptionLabel: (option: { weekDay: any; }) => option.weekDay,
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        //console.log(restaurant)
        //
        // //Get values from UI form
        // const name = restaurantHTMLRefs.name.current?.value || '';
        // const addressName = restaurantHTMLRefs.addressName.current?.value || '';
        // const postalCode = restaurantHTMLRefs.addressPostalCode.current?.value || '';
        // const city = restaurantHTMLRefs.addressCity.current?.value || '';
        // const country = restaurantHTMLRefs.addressCountry.current?.value || '';
        // const latitude = parseFloat(restaurantHTMLRefs.locationCoordinateLatitude.current?.value || '0');
        // const longitude = parseFloat(restaurantHTMLRefs.locationCoordinateLongitude.current?.value || '0');
        // const capacity = parseInt(restaurantHTMLRefs.capacity.current?.value || '0');
        // const menuLanguage = restaurantHTMLRefs.menuLanguage.current?.value || '';
        //
        // //Create object with restaurant info
        // const newRestaurant: Restaurant = {
        //     uid: 'uid-value',
        //     name,
        //     hereId: 'here-id-value',
        //     location: {
        //         address: {
        //             name: addressName,
        //             postalCode,
        //             city,
        //             country,
        //         },
        //         locationCoordinate: {
        //             latitude: isNaN(latitude) ? 0 : latitude,
        //             longitude: isNaN(longitude) ? 0 : longitude,
        //         },
        //     },
        //     capacity,
        //     menu: {
        //         language: menuLanguage,
        //     },
        //     schedule: {},
        // };
        //
        // //TODO json for schedule
        // // schedule: {
        // //     daysScheduleMap: {
        // //         MONDAY: [
        // //             {
        // //                 startTime: '',
        // //                 endTime: ''
        // //             },
        // //             {
        // //                 startTime: '',
        // //                 endTime: ''
        // //             }
        // //         ],

        //print restaurant on state after submit

        //setRestaurant(newRestaurant);
        //TODO map restaurant schedule





        //await createRestaurant(restaurantState);
        //restaurants.refetch();
    }

    function printRestaurants() {
        if (restaurants.data !== undefined) {
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

    function showScheduleStartTimeAndEndTime(value: string | null ) {
            return (
                <div>
                    <WeekdaySchedule restaurant={restaurant} setRestaurant={setRestaurant} weekDay={`${value}`} mealName="Lunch"/>
                    <WeekdaySchedule restaurant={restaurant} setRestaurant={setRestaurant} weekDay={`${value}`} mealName="Dinner"/>
                </div>
            );
    }

    return (
        <>
            {restaurants.data && printRestaurants()}
            <Button variant="contained" href={"/"}>Main Menu</Button>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{width: '25ch'}}>
                    <OutlinedInput placeholder="Restaurant Name" inputRef={restaurantHTMLRefs.name} />
                    <OutlinedInput placeholder="Address Name" inputRef={restaurantHTMLRefs.addressName}/>
                    <OutlinedInput placeholder="Address Postal Code" inputRef={restaurantHTMLRefs.addressPostalCode}/>
                    <OutlinedInput placeholder="Address City" inputRef={restaurantHTMLRefs.addressCity}/>
                    <OutlinedInput placeholder="Address Country" inputRef={restaurantHTMLRefs.addressCountry}/>
                    <OutlinedInput placeholder="Location Coordinate Latitude"
                                   inputRef={restaurantHTMLRefs.locationCoordinateLatitude}/>
                    <OutlinedInput placeholder="Location Coordinate Longitude"
                                   inputRef={restaurantHTMLRefs.locationCoordinateLongitude}/>
                    <OutlinedInput placeholder="Restaurant Capacity" inputRef={restaurantHTMLRefs.capacity}/>
                    <OutlinedInput placeholder="Menu Language" inputRef={restaurantHTMLRefs.menuLanguage}/>
                    <WeekDayStyle>
                        <div {...getRootProps()}>
                            <Label {...getInputLabelProps()}>Week Days Schedule</Label>
                            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                                {value.map((option: FilmOptionType, index: number) => (
                                    <StyledTag label={option.weekDay} {...getTagProps({ index })} />
                                ))}
                                <input {...getInputProps()} />
                            </InputWrapper>
                        </div>
                        {groupedOptions.length > 0 ? (
                            <Listbox {...getListboxProps()}>
                                {(groupedOptions as typeof daysOfWeek).map((option, index) => (
                                    <li {...getOptionProps({ option, index })}>
                                        <span>{option.weekDay}</span>
                                        <CheckIcon fontSize="small" />
                                    </li>
                                ))}
                            </Listbox>
                        ) : null}
                    </WeekDayStyle>
                    {value.map(value => value.weekDay).map(value => showScheduleStartTimeAndEndTime(value))}
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </>
    )
}