import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "../contexts/User";

export default function ({ message: { messageId, sender, text, createdAt } }) {
	const { user } = useUser();
	const side = sender == user.id ? "right" : "left";

	return (
		<Container className={`justify-content-${side}`}>
			<Row>{text}</Row>
			<Row>{new Date(createdAt).getTime()}</Row>
		</Container>
	);
}
