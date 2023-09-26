import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useChat } from "../contexts/Chat";
import Search from "../components/Search";
import ChatList from "../components/ChatList";

export default () => {
	const params = useParams();
	const { current, setCurrent, conversations } = useChat();

	// useEffect(() => {
		if(conversations.length) {
			const conv = conversations.find(conv => conv._id == params.chatId);
			console.log('Chats', conv);
			if(conv) {
				setCurrent(conv);
			}
		}
	// }, []);
	return (
		<Container>
			<Row className="p-3">
				<Col>
					{/* <Search /> */}
					<ChatList />
				</Col>
				<Col>
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
}
