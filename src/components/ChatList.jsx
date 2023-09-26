import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

import { useUser } from '../contexts/User';
import { useChat } from '../contexts/Chat';
import ChatItem from './ChatItem';
import makeRequest from '../utils/makeRequest';

// a chat list is just that, a list of chats. it is not meant to download the chats, but just to display them.
// the chats are downloaded in chat context
export default () => {
	const { user } = useUser();
	const { conversations } = useChat();

	let items = [];
	if(conversations.length) {
		items = conversations.map(conv => {
			const user2 = conv.users.find(member => member._id != user.id);
			return <ChatItem key={conv._id} chatId={conv._id} user={user2} />;
		});
	}
	return (
		<ListGroup fluid="sm">{ items }</ListGroup>
	);
}
