import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/User';
import makeRequest from '../utils/makeRequest';

export default function({ children }) {
	const { user, setUser } = useUser();
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const { data, error } = await makeRequest('/auth/isAuthenticated');
	// 		if(data) setUser(prev => data.user);
	// 	}
	// 	fetchData();
	// }, []);
	return (
		user ? children : <Navigate to="/login" />
	);
}
