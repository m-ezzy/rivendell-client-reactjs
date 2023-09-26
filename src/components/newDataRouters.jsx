import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import makeRequest from "../utils/makeRequest";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<div className="app"><Outlet /></div>}>
			<Route index element={<Navigate to='/login' />} />
			<Route path="signup" element={<Signup />} />
			<Route path="login" element={<Login />} />
			<Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}>
				<Route index element={<Navigate to='chats' />} />
				<Route path="search" element={<Search />} />
				<Route path="account" element={<Account />} />
				<Route path="chats" element={<Chats />}>
					<Route
						path=":chatId"
						element={<Conversation />}
						loader={
							async (params, signal) => {
								return await makeRequest('/message/previous', { chatId: params.chatId }, { signal });
							}
						}
						fallback={<div>Loading...</div>}
					/>
				</Route>
			</Route>
		</Route>
	)
);
