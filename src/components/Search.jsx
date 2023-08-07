import React from 'react'

function Search({previousChatsData, setPreviousChatsData}) {
	const refSearch = React.useRef(null)
	console.log(refSearch.current)
	//when new state is set, only the component where state is declared and its child components are re-rendered

	/*function handleChange(e) {
		setFormData(prev => {
			return e.target.value
		})
	}*/
	async function handleClick(e) {
		console.log(refSearch.current.value)
		if(refSearch.current.value == '') { return }
		let data = await fetchData('create_chat', {user_name: refSearch.current.value})
		if(data.chat_id == undefined) { return }
		setPreviousChatsData(prev => {
			return [...prev, {chat_id: data.chat_id, user_id: data.user_id, user_name: refSearch.current.value}]
		})
	}
	return (
		<div className='grid border padding col-gap search'>
			<input className='border' type='text' name='search' ref={refSearch} />
			<button className='border square' onClick={handleClick}>create chat</button>
		</div>
	)
}
export default Search
