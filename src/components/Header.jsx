import React from 'react'

function Header({chat_id, user_id, user_name}) {
	return (
		<div className='border padding grid header'>
			<img className='square border profile' src="images/profile.jpg" />
			<div className='grid center-y'>{`chat id ${chat_id} , user id ${user_id} , user name ${user_name}`}</div>
		</div>
	)
}
export default Header
