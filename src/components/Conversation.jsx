import { useLoaderData } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useChat } from '../contexts/Chat';
import { MessagesContextProvider } from '../contexts/Messages';
import Header from './Header';
import MediaList from './MessageList';
import Sender from './Sender';

export default () => {
	const { current } = useChat();
	// const data = useLoaderData();
	// console.log('using loader data : ', data);

	return (
		current ? 
		<MessagesContextProvider>
			<Container>
				<Row>
					<Header />
				</Row>
				<Row>
					<Col>
						<MediaList />
					</Col>
				</Row>
				<Row>
					<Sender />
				</Row>
			</Container>
		</MessagesContextProvider>
		:
		<div>Loading...</div>
	);
}
