export default async function token() {
	const bodyParams = {
		grant_type: "password",
		client_id: "peprestaurant",
		client_secret: "s6By4IrUabat0HpziFXH5qxCnNZai4Zr",
		username: "pepuser",
		password: "1234",
	};

	const searchParams = Object.keys(bodyParams)
		.map((key) => {
			return (
				encodeURIComponent(key) + "=" + encodeURIComponent(bodyParams[key])
			);
		})
		.join("&");

	const url =
		"http://localhost:8081/auth/realms/peprestaurant/protocol/openid-connect/token";
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-type": "application/x-www-form-urlencoded" },
		body: searchParams,
	});

	return await res.json();
}
