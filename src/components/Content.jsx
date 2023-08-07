import React from 'react'

import Search from './Search'
import ChatList from './ChatList'
import Header from './Header'
import MediaList from './MediaList'
import Sender from './Sender'

import socket from '../socket'

export default function Content({user}) {
	const [current, setCurrent] = React.useState(0)
	const [previousChatsData, setPreviousChatsData] = React.useState([])
	const [previousMediaData, setPreviousMediaData] = React.useState({})
	
	console.log(current)
	console.log(previousChatsData)
	console.log(previousMediaData)

	// let socket
	
	React.useEffect(function() {
		// socket = createSocketConnection()
		// socket = io('http://localhost:8000')
  	console.log(socket)
  	socket.emit('connection', {user_id: user.user_id})

		socket.on('receive-media-message', (data) => {
			console.log(data, current)
			setPreviousMediaData(prev => {
				console.log(prev)
				let pmd = {...prev}
				pmd[1].push(data)
				return pmd
			})
			// if (chats.current != data.chat_id) {
			// 	document.getElementById(`nmi_chats_${data.chat_id}`).innerHTML = 1
			// }
		})
		return () => socket.off('receive-media-message')
	}, [user.user_id])

	let o = {}
	let show = false
	if(current) {
		previousChatsData.forEach(pcd => {
			if(pcd.chat_id == current) {
				o = pcd
			}
		})
		show = true
	} else {
		show = false
	}

	/*if(previousChatsData.length) {
		previousChatsData.forEach(pcd => {
			socket.emit('connect-to-chat', {chat_id: current})
		})
	}*/

	return (
		<div className="grid content">
			<div className='grid border explore-bar'>
				<Search setPreviousChatsData={setPreviousChatsData} socket={socket} />
				<ChatList previousChatsData={previousChatsData} setPreviousChatsData={setPreviousChatsData} current={current} setCurrent={setCurrent} socket={socket} />
			</div>
			<div className="border grid conversation-bar">
				{show && <>
					<Header chat_id={o.chat_id} user_id={o.user_id} user_name={o.user_name} />
					<MediaList user={user} current={o.chat_id} user_id={o.user_id} previousMediaData={previousMediaData} setPreviousMediaData={setPreviousMediaData} socket={socket} />
					<Sender user={user} current={current} setPreviousMediaData={setPreviousMediaData} socket={socket} />
					</>
				}
			</div>
		</div>
	)
}
