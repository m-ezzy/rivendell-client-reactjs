import React from 'react'

function Login({setUser, setCurrentForm}) {
	const [showFailed, setShowFailed] = React.useState(false)
	const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  })
	function handleChange(e) {
		setFormData(prev => {
			return {
        ...prev,
        [e.target.name]: e.target.value
      }
		})
	}
	async function handleClickLogin(e) {
		if(formData.username == '' || formData.password == '') {
			return
		}
		let data = await fetchData('login', {username: formData.username, password: formData.password})
    if(Object.keys(data).includes('user_id')) {
			setUser(prev => data)
		} else {
			setShowFailed(prev => true)
		}
	}
	async function handleClickLink(e) {
		setCurrentForm(prev => 'signup')
	}
	return (
    <div className="grid border padding row-gap login">
			<label htmlFor='username'>username</label>
			<input className='border' type='text' name='username' value={formData.username} onInput={handleChange} />
			<label htmlFor='password'>password</label>
			<input className='border' type='text' name='password' value={formData.password} onInput={handleChange} />
			<button className='border' onClick={handleClickLogin}>login</button>
			{showFailed && <div className='grid center border red'>enter correct username and password</div>}
			<button className='link' onClick={handleClickLink}>to create an account, signup{'>>>>>'}</button>
		</div>
	)
}
export default Login
