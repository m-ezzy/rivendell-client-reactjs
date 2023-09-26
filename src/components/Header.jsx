import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useUser } from "../contexts/User"
import { useChat } from "../contexts/Chat";

export default () => {
	const { user } = useUser();
	const { current, conversations } = useChat();
	// const location = useLocation();
	// const chatId = location.pathname.split('/')[2];
	// const conv = conversations[current];
	// console.log('Header', location.pathname.split('/')[1]);
	console.log(current);

	return (
		<Alert variant="primary">
			{current.users[0]._id == user.id ? current.users[1].name : current.users[0].name}
		</Alert>
	);
}
