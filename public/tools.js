function getCookie(cookieKey) {
	const decodedCookie = decodeURIComponent(document.cookie) //to be careful
	const cookieArray = decodedCookie.split('; ')
	let value = null
	cookieArray.forEach(e => {
		if (e.indexOf(cookieKey + "=") === 0) {
			value = e.substring(cookieKey.length + 1)
		}
	})
	return value
}
function setCookie(cookieKey, cookieValue, expireDays) {
	const date = new Date()
	date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
	let dateString = date.toUTCString()
	document.cookie = `${cookieKey}=${cookieValue};expires=${dateString};path=/`
}
let fetchData = async (route, o, fd) => {
	let body = ''
	let headers = {
		'Access-Control-Allow-Origin': '*',
	}

	if(fd) {
		body = o
	} else {
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
		if (Object.keys(o).length) {
			Object.entries(o).forEach(([key, value]) => {
				body += (key + '=' + value + '&')
			})
		}
	}
	let response = await fetch(
		`api/${route}`, {
			method: 'POST', 
			mode: 'cors', 
			headers: headers, 
			body: body
		}
	)
	let data = await response.json()
	console.log("----------fetch----------   ", data)
	return data
}

// default form content-type   'application/x-www-form-urlencoded'
// for uploading files use     'multipart/form-data'
