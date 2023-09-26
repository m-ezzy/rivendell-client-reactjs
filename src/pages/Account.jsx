import { ListGroup } from 'react-bootstrap';
import { useUser } from '../contexts/User'

export default () => {
	const { user } = useUser();
	return (
		<div>
			<div>Account</div>
			<div>id    : {user.id}</div>
			<div>email : {user.email}</div>
			<div>name  : {user.name}</div>
		</div>
	);
}
