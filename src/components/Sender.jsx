import { useEffect, useRef } from 'react';
import { Form, Button, FormControl, Container, Row, Col } from 'react-bootstrap';
import { useUser } from '../contexts/User';
import { useChat } from '../contexts/Chat';
import { useMessages } from '../contexts/Messages';
import makeRequest from '../utils/makeRequest';

export default () => {
	const { user } = useUser();
	const { current, chats, setChats, socketRef } = useChat();
	const { messages, setMessages } = useMessages();
	const messageRef = useRef(null);

	async function handleClick(e) {
		e.preventDefault();
		const text = messageRef.current.value;
		if(text == '') { return; }
		messageRef.current.value = '';

		let { data, error } = await makeRequest('/message/create', { chatId: current._id, text });
		let message = {
			_id: data.messageId,
			sender: user.id,
			text: text,
			time: data.time,
		}
		socketRef.current.emit('send-message', { chatId: current._id, message });
		setMessages(prev => {
			console.log(prev);
			return {...prev, [current._id]: [...prev[current._id], message]}
		});
	}
	return (
		<Form className="d-flex">
			<Container>
				<Row>
					<Col>
						<FormControl type='text' ref={messageRef} />
					</Col>
					<Col>
						<Button onClick={handleClick}>send</Button>
					</Col>
				</Row>
			</Container>
		</Form>
	);
}
