import React from 'react'
import Signup from './Signup'
import Login from './Login'

function Auth({setUser}) {
	const [currentForm, setCurrentForm] = React.useState('login')
	return (
		<div className="grid center auth">
      {currentForm == 'signup' ? 
        <Signup setUser={setUser} setCurrentForm={setCurrentForm} /> : 
        <Login setUser={setUser} setCurrentForm={setCurrentForm} />
      }
		</div>
	)
}
export default Auth
