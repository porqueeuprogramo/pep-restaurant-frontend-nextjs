import { api } from "@/api/index";
import { Restaurant } from "@/domain/restaurantDomain";

export async function fetchRestaurants() {
	const res = await api.get("/pep/restaurant/bff/api/restaurant", {
		data: {},
	});
	return res.data as Restaurant[];
}

export async function fetchRestaurantByUid(restaurantUid: string) {
	const res = await api.get(
		`http://localhost:8080/pep/restaurant/bff/api/restaurant/${restaurantUid}`,
		{
			data: {},
		},
	);
	return res.data as Restaurant;
}

export async function createRestaurant(restaurant: Restaurant) {
	const res = await api.post(
		"http://localhost:8080/pep/restaurant/bff/api/restaurant",
		restaurant,
	);
	return res.data as Restaurant;
}

export async function editRestaurant(
	restaurantUid: string,
	restaurant: Restaurant,
) {
	const res = await api.put(
		`http://localhost:8080/pep/restaurant/bff/api/restaurant/${restaurantUid}`,
		restaurant,
	);
	return res.data as Restaurant;
}

export async function deleteRestaurantByUid(restaurantUid: string) {
	const res = await api.delete(
		`http://localhost:8080/pep/restaurant/bff/api/restaurant/${restaurantUid}`,
		{
			data: {},
		},
	);
	return res.data as Restaurant;
}
