// Inline styling
// CSS stylesheets
// CSS Modules
// SasS

// import '../styles/all.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContextProvider } from '../contexts/User';
import { ChatContextProvider } from '../contexts/Chat';
import ClientRoutes from './ClientRoutes';

export default function() {
	return (
		<UserContextProvider>
			{/* <ChatContextProvider> */}
				<ClientRoutes />
			{/* </ChatContextProvider> */}
		</UserContextProvider>
	);
}
