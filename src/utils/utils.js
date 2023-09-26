export function isEmpty(object) {
	return Object.keys(object).length === 0;
}
export function getCookie(cookieName) {
	let cookies = {};
	document.cookie.split(';').forEach(function(pair) {
		let [key, value] = pair.split('=');
		cookies[key.trim()] = value;
	})
	console.log(cookies);
	return cookies[cookieName];
}
