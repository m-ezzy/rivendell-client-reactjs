import React from 'react'

import ChatItem from './ChatItem'

import socket from '../socket'

function ChatList({previousChatsData, setPreviousChatsData, current, setCurrent}) {
	let items = []

	React.useEffect(() => {
		async function gets() {
			let data = await fetchData('previous_chats', '')
			sessionStorage.setItem('previous_chats', JSON.stringify(data))

			data.forEach(d => {
				console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', d)
				socket.emit('connect-to-chat', {chat_id: d.chat_id})
			})

			setPreviousChatsData(prev => {
				return data
			})
		}
		gets()
	}, [])
	if (previousChatsData.length) {
		items = previousChatsData.map(d => {
			return (
				<ChatItem key={d.chat_id} chat_id={d.chat_id} user_id={d.user_id} user_name={d.user_name} current={current} setCurrent={setCurrent} />
			)
		})
	}
	return (
		<div className="chat-list">
			{items}
		</div>
	)
}
export default ChatList
