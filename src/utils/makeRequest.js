// async await

export default async (route, input) => {
	console.log("---api---", route, input);

	const headers = {
		// Authorization: `Bearer ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json'
	}
	const server = {
		protocol: import.meta.env.VITE_SERVER_PROTOCOL,
		name: import.meta.env.VITE_SERVER_HOSTNAME,
		port: import.meta.env.VITE_SERVER_PORT,
	}
	const url = `${server.protocol}://${server.name}:${server.port}${route}`;
	let response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		crossOrigin: true,
		cookies: 'include',
		credentials: 'include',
		headers: headers,
		body: JSON.stringify(input)
	})
	.catch(error => {
		console.log("---api response error---", error);
		return { error }
	});

	let data = await response.json()
	.catch(error => {
		console.log("---api data error---", error);
		return { error }
	})

	console.log("---api---", response.status, response.statusText, data);

	if(response.status == 200) {
		return { data };
	} else {
		return { error: data };
		// throw new Error(response.statusText)
	}
	// return response

	// return { error: error, data: data }
}
