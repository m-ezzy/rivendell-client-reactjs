import React from 'react'
import Header from './Header'
// import MediaList from './MediaList'
// import Sender from './Sender'

function ConversationBar({selected}) {
	return (
		<div className="border grid conversation-bar">
			<Header />
			{/* <MediaList selected={selected} /> */}
			{/* <Sender /> */}
		</div>
	)
}
export default ConversationBar
