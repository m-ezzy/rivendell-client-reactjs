import { useEffect, useRef } from 'react';
import { Link, Form as RouterForm, useNavigate } from 'react-router-dom';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useUser } from '../contexts/User';
import makeRequest from '../utils/makeRequest.js';

export default function () {
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	let errorMessage = '';

	const { user, setUser } = useUser();

	async function handleClick(e) {
		e.preventDefault();
		
		let email = emailRef.current.value;
		let password = passwordRef.current.value;

		if(email == '' || password == '') { return; }

		let { data, error } = await makeRequest('/auth/login', { email, password })
		// .catch(error => {
		// 	console.log(error);
		// 	errorMessage = error;
		// 	return;
		// });
		if(error) {
			errorMessage = error;
			return;
		} else if(data) {
			console.log(data, "login successful");
			setUser(prev => data.user);
			// navigate('/');
		}
	}
	return (
    <Form>
			<FormControl input type='text' name='email' placeholder='email' ref={emailRef} />
			<FormControl type='text' name='password' placeholder='password' ref={passwordRef} />
			<Button onClick={handleClick}>login</Button>
			<div>{ errorMessage ? errorMessage : '' }</div>
			<Link to='/signup'>don't have an account? signup</Link>
		</Form>
	)
}
