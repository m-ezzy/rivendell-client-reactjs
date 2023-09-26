import { useRef } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";
import makeRequest from '../utils/makeRequest.js';

export default () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null); //email username phone
	const passwordRef = useRef(null);

	let errorMessage = '';

	const navigate = useNavigate();
	const { user, setUser } = useUser();

	async function handleClick(e) {
		e.preventDefault();

		if (nameRef.current.value == '' || emailRef.current.value == '' || passwordRef.current.value == '') { return; }

		let data = await makeRequest('/user/create', { name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value })
		.then((data) => {
			console.log(data, "signup successful");
			setUser(prev => data);
			navigate('/');
		})
		.catch(error => {
			errorMessage = error;
		});
	}
	return (
    <form>
			<input type='text' name='name' placeholder="name" ref={nameRef} />
			<input type='text' name='email' placeholder="email" ref={emailRef} />
			<input type='text' name='password' placeholder="password" ref={passwordRef} />
			<button onClick={handleClick}>signup</button>

			<div>{errorMessage}</div>

			<Link to={"login"}>already have an account? Login</Link>
		</form>
	)
}
