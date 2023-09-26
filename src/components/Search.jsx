import { useState, useRef } from 'react';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import { useChat } from '../contexts/Chat';
import makeRequest from '../utils/makeRequest.js';

export default function Search() {
	const searchRef = useRef(null);
	const [ results, setResults ] = useState([]);
	const { setConversations } = useChat();

	async function handleClick(e, userId) {
		e.preventDefault();
		let { data, error } = await makeRequest('/chat/create', { userId: userId });
		setResults([]);
		setConversations(prev => [...prev, data.chat]);
	}
	async function handleChange(e) {
		e.preventDefault();
		if(searchRef.current.value == '') { return; }
		let { data, error } = await makeRequest('/user/search', { query: searchRef.current.value }); //searchTerm //query

		if(data) {
			let a = data.users.map((user) => {
				return (
					<Container key={user._id}>
						<Row>
							<Col>{user.name}</Col>
							<Col><Button onClick={(e) => handleClick(e, user._id)}>create</Button></Col>
						</Row>
					</Container>
				);
			});
			setResults(a);
		} else if(error) {
			console.log(error);
		}
	}
	return (
		<Container>
			<Row>
				<Form>
					<FormControl type='text' name='search' placeholder='type search term here' ref={searchRef} onChange={handleChange} />
				</Form>
			</Row>
			<Row>
				{results}
			</Row>
		</Container>
	);
}
