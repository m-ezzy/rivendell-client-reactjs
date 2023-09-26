import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useUser } from '../contexts/User';
import { ChatContextProvider, useChat } from '../contexts/Chat';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from '../pages/Dashboard';
import Chats from '../pages/Chats';
import Conversation from './Conversation';
import Search from './Search';
import Account from '../pages/Account';

import { isEmpty, getCookie } from '../utils/utils';

export default () => {
	const { user, setUser } = useUser();
	// const { current, setCurrent, conversations, setConversations, socketRef } = useChat();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<div className="app w-full"><Outlet /></div>}>
					<Route index element={user ? <Navigate to='chats' /> : <Navigate to='login' />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
					{/* <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}> */}
					<Route path="/" element={<ChatContextProvider><Dashboard /></ChatContextProvider>}>
						<Route index element={<Navigate to='chats' />} />
						<Route path="search" element={<Search />} />
						<Route path="account" element={<Account />} />
						<Route path="chats" element={<Chats />}>
							<Route path=":chatId" element={<Conversation />} />
						</Route>
						<Route path="groups" element={<div>groups</div>} />
					</Route>
					<Route path="/*" element={<div>error! page not found</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
