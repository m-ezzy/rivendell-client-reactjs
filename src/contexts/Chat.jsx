import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Manager, io } from 'socket.io-client';
import { useUser } from './User';
import makeRequest from '../utils/makeRequest';

const ChatContext = createContext();

export function useChat() {
	return useContext(ChatContext);
}
export function ChatContextProvider({ children }) {
	const { user } = useUser();
	const [current, setCurrent] = useState(null); //chats setChats
	const [conversations, setConversations] = useState([]);
	// const [messages, setMessages] = useState(null);
	// const [socket, setSocket] = useState(null);

	let socketRef = useRef();
	// let socket = socketRef.current;

	const userId = user?.id;
	useEffect(() => {
		async function fetchData() {
			let { data, error } = await makeRequest('/chat/previous');
			setConversations(prev => data.chats);
		}
		if(userId) fetchData();
	}, [userId]);

	if(conversations.length) {
		conversations.forEach(chat => {
			// setConversations(prev => {
			// 	return {...prev, [chat.chatId]: []}
			// });
			socketRef.current.emit('connect-to-chat', { chatId: chat._id });
			socketRef.current.emit('check-user-online-status', { userId: chat.users[0]._id });
		});
	}

	useEffect(() => {
		const { VITE_SERVER_PROTOCOL, VITE_SERVER_HOSTNAME, VITE_SERVER_PORT } = import.meta.env;
		const URL = `${VITE_SERVER_PROTOCOL}://${VITE_SERVER_HOSTNAME}:${VITE_SERVER_PORT}`;
		socketRef.current = io(URL, {
			transports: ['websocket', 'polling', 'flashsocket'],
			// withCredentials: true,
			// auth: {
				// token: localStorage.getItem('token'),
			// },
		});
		socketRef.current.on('data', (data) => {
			console.log("dddddddddddd", data);
		});
		socketRef.current.on('connect', () => {
			console.log('connect!');
		});
		socketRef.current.on('disconnect', () => {
			console.log('disconnect!');
		});
		socketRef.current.on('error', (err) => {
			console.log('socket error! : ', err);
		});
		socketRef.current.on('new-chat', (data) => {
			console.log(data);
			socketRef.current.emit('connect-to-chat', { chatId: data.chatId });
			setConversations(prev => {
				return {...prev, [data.chatId]: data}
			});
		});
		// return () => socketRef.current.off('receive-media')
		return () => socketRef.current.disconnect();
	}, []);
	return (
		<ChatContext.Provider value={{ current: current, setCurrent, conversations, setConversations, socketRef }}>
			{ children }
		</ChatContext.Provider>
	);
}
