// .then .catch .finally

const { VITE_CLIENT_PROTOCOL, VITE_CLIENT_HOSTNAME, VITE_CLIENT_PORT, VITE_CLIENT_PATH } = import.meta.env

export async function makeHttpRequest(route, parameters) {

	/*
	const request = Request()
	.mode('cors')
	.credentials('include')
	.headers({
		'Access-Control-Allow-Origin': `${VITE_CLIENT_PROTOCOL}://${VITE_CLIENT_HOSTNAME}:${VITE_CLIENT_PORT}`, //'*' //'http://localhost:8000' //'http://localhost:5173'
		'Access-Control-Allow-Origin': `${window.location.hostname}:${window.location.port}`, //'*' //'http://localhost:8000' //'http://localhost:5173'
		'Content-Type': 'application/json'
	})
	.body(JSON.stringify(parameters))
	// .post(route, parameters);

	const response = await request.post(route, parameters);
	// return response;
	*/

	/*
	let headers = new Headers()
	headers.append(key, value)
	headers.append('Content-Type', 'application/json')

	let body = JSON.stringify(parameters)

	let headers = {
		// 'Origin': window.location.origin,
		// 'Accept': 'application/json',
		// 'Access-Control-Request-Method': 'POST',
		// 'Access-Control-Max-Age': '10000000',
		'Access-Control-Allow-Origin': `${VITE_CLIENT_PROTOCOL}://${VITE_CLIENT_HOSTNAME}:${VITE_CLIENT_PORT}`, //'*' //'http://localhost:8000' //'http://localhost:5173'
		'Access-Control-Allow-Origin': `${window.location.hostname}:${window.location.port}`,
		// no need to write. i think it is overwritten/added by the browser
	}
	*/

	/*
	let body = ''

	switch (contentType) {
		case 'plainText': {
			headers['Content-Type'] = 'text/plain'
			body = parameters
			break
		}
		case 'urlEncoded': {
			headers['Content-Type'] = 'application/x-www-form-urlencoded'

			if (Object.keys(parameters).length) {
				body = ''
				Object.entries(parameters).forEach(([key, value]) => {
					body += (key + '=' + value + '&')
				})
			}
			break
		}
		case 'multipartFormData': {
			headers['Content-Type'] = 'multipart/form-data'
			body = parameters
			break
		}
		case 'json': default: {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(parameters)
			break
		}
	}
	*/
	
	// default form content-type     'application/x-www-form-urlencoded'
	// json data form content-type   'application/json'
	// for uploading files use       'multipart/form-data'

	// api server configs
	// const protocol = NODE_ENV == 'dev' ? 'http' : 'http'
	// const hostname = NODE_ENV == 'dev' ? 'localhost' : 'ec2-15-206-68-210.ap-south-1.compute.amazonaws.com' //15.206.68.210 //window.location.hostname
	// const port = NODE_ENV == 'dev' ? 8000 : 8000

	const { MODE, VITE_API_PROTOCOL, VITE_API_HOSTNAME, VITE_API_PORT, VITE_API_PATH } = import.meta.env

	const API_HOSTNAME = MODE == 'development' ? window.location.hostname : VITE_API_HOSTNAME

	let o = await fetch(
		`${VITE_API_PROTOCOL}://${API_HOSTNAME}:${VITE_API_PORT}${route}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: headers,
			body: body
		}
	)
	.then(response => {
		console.log("---api---", response.status, response.statusText)
		return response
	})
	.catch(error => {
		console.log("---api---", error)
		return error
	})
	.finally(() => {
		console.log("---api---", "finally")
	});

	console.log("---api---", response.status, response.statusText)
	let data = await response.json()
	console.log("---api---", data)
	return data

	return { error: response.status, data: data }
}
