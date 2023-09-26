import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useChat } from '../contexts/Chat';
import { useMessages } from '../contexts/Messages';
import MediaItem from './MessageItem';
import makeRequest from '../utils/makeRequest';

export default function() {
	const { current, setConversations } = useChat();
	const { messages, setMessages } = useMessages();

	useEffect(() => {
		async function fetchData() {
			let { data, error } = await makeRequest('/message/previous', { chatId: current._id });
			setMessages(prev => {
				return {...prev, [current._id]: data }
			});
		}
		fetchData();
	}, []);
	
	let items = [];
	if(messages && messages[current._id]) {
		items = messages[current._id].map((message, index) => {
			return <MediaItem key={message._id} message={message} />;
		});
	}
	return (
		<Container>
			<Row>
				<Col>
					{items}
				</Col>
			</Row>
		</Container>
	)
}
