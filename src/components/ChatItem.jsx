import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { useChat } from '../contexts/Chat';

export default ({ chatId, user }) => {
	const { setCurrent } = useChat();
	const [isOnline, setIsOnline] = useState(false);
	const [unread, setUnread] = useState(0);
	return (
		<ListGroup.Item>
			<Link to={`${chatId}`} onClick={ () => setCurrent({ chatId, users: [user] }) }>
				<Container>
					<Row>
						<Col><Image src="/images/vite.svg" /></Col>
						<Col className='d-flex j-c-left'>{user.name}</Col>
						{ isOnline ? <Col>online</Col> : <Col>offline</Col> }
						{ unread > 0 && <Col className="badge badge-primary ml-2">{unread}</Col> }
					</Row>
				</Container>
			</Link>
		</ListGroup.Item>
	);
}
