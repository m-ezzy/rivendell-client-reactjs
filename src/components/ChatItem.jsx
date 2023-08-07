import React from 'react'

function ChatItem({chat_id, user_id, user_name, current, setCurrent}) {
	let bgcolor = chat_id == current ? 'selected' : ''
	// fix this. color doesn't change on select because of glass.css

	function handleClick(e) {
		let cid = e.target.attributes['data-key'].value
		if(cid != current) {
			setCurrent(prev => {
				return chat_id
			})
		}
	}
	return (
		<div className={`border-bottom padding grid chat-item ${bgcolor}`} data-key={chat_id} onClick={handleClick}>
			<img className='square border profile' src="images/profile.jpg" />
			{`user id ${user_id} , user name ${user_name}`}
		</div>
	)
}
export default ChatItem
