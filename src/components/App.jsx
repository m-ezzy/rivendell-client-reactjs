import React from 'react'
// import { BrowserRoute, Routes, Route } from 'react-router-dom'

import Auth from './Auth'
import Content from './Content'

// Inline styling
// CSS stylesheets
// CSS Modules
// SasS
import '../styles/classes.css'
import '../styles/index.css'
// import '../styles/glass.css'

function App() {
	const [user, setUser] = React.useState({})
	if(Object.keys(user).length == 0 && getCookie('user_id')) {
		setUser(prev => {
			return {
				user_id: getCookie('user_id'),
				username: getCookie('username')
			}
		})
	}
	console.log(user)
	return (
		<div className="app">
			{user.user_id == undefined ? 
				<Auth setUser={setUser} /> :
				<Content user={user} />
			}
		</div>
	)
}
export default App
