let validation = {
	signUp: {
		userName: {
			filled: false,
			maximumCharacters: false,
			characters: false,
			specialCharacters: false,
			available: false,
		},
		passWord: {
			filled: false,
			minimumCharacters: false,
			maximumCharacters: false,
			characters: false,
			alphabets: false,
			numbers: false,
			specialCharacters: false,
		},
	},
	logIn: {
		userName: false,
		passWord: false,
	},
}

async function check_user_name(user_name) {
	let data = await fetchData('check_user_name', {'user_name': user_name})
}
async function handleChangeSUUN() {
	let user_name = document.getElementById("signUpUserName").value
	if (user_name == "") { return }
	let rows = await check_user_name(user_name)
	if (rows.length == 0) {
		validation.signUp.userName = true
	} else {
	}
}
async function handleChangeLIUN() {/*
	let user_name = document.getElementById("logInUserName").value
	if (user_name == "") { return }
	let rows = await check_user_name(user_name)
	if (rows.length) {
		validation.logIn.userName = true
	} else {
	}*/
}
async function handleChangeSUPW() {
	let pass_word = document.getElementById("signUpPassWord").value
}
async function handleChangeLIPW() {
	let pass_word = document.getElementById("logInPassWord").value
}
async function handleClickSignUp() {
	let userName = document.getElementById("signUpUserName").value
	let passWord = document.getElementById("signUpPassWord").value
	let data = await fetchData('signUp', {'userName': userName, 'passWord': passWord})
}
async function handleClickLogIn() {
	let userName = document.getElementById("logInUserName").value
	let passWord = document.getElementById("logInPassWord").value
	let data = await fetchData('logIn', {'userName': userName, 'passWord': passWord})
	// setCookie('user_id', data[0].user_id, 1)
	// console.log(getCookie('user_id'))
}
