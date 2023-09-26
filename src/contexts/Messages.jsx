import { createContext, useContext, useEffect, useState } from 'react';
import { useChat } from './Chat';

const MessagesContext = createContext();

export function useMessages() {
	return useContext(MessagesContext);
}
export function MessagesContextProvider({ children }) {
	const [messages, setMessages] = useState({});
	const { socketRef } = useChat();
	
	useEffect(() => {
		socketRef.current.on('receive-message', (data) => {
			console.log(data)
			setMessages(prev => {
				return {...prev, [data.chatId]: [...prev[data.chatId], data.message] }
			});
		});
		// return () => socketRef.current.off('receive-message');
	}, []);
	return (
		<MessagesContext.Provider value={{ messages, setMessages }}>
			{children}
		</MessagesContext.Provider>
	);
}
