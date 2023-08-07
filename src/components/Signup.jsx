import React from 'react'

function Signup({setUser, setCurrentForm}) {
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
		let data = await fetchData('signup', {username: formData.username, password: formData.password})
    if(data.user_id) {
			setUser(prev => data)
		} else {
			setShowFailed(prev => true)
		}
	}
	async function handleClickLink(e) {
		setCurrentForm(prev => 'login')
	}
	return (
    <div className="grid border padding row-gap signup">
			<label htmlFor='username'>username</label>
			<input className='border' type='text' name='username' value={formData.username} onInput={handleChange} />
			<label htmlFor='password'>password</label>
			<input className='border' type='text' name='password' value={formData.password} onInput={handleChange} />
			<button className='border' onClick={handleClickLogin}>signup</button>
			{showFailed && <div className='grid center border red'>username not available!</div>}
			<button className='link' onClick={handleClickLink}>already have an account? Login{'>>>>>'}</button>
		</div>
	)
}
export default Signup
