import { createContext, useContext, useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}
export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		async function fetchData() {
			const { data, error } = await makeRequest('/auth/isAuthenticated');
			if(data) setUser(prev => data.user);
		}
		fetchData();
	}, []);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{ children }
		</UserContext.Provider>
	);
}
