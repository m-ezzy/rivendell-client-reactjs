import React, { useEffect } from 'react'

import socket from '../socket'

function Sender({user, current, setPreviousMediaData}) {
	const filesRef = React.useRef(null)
	const messageRef = React.useRef(null)

	useEffect(() => {
		async function send() {
			let fd = new FormData()
			fd.append('chat_id', current)
			fd.append('files', filesRef.current.files[0])
			let data = await fetchData('send_media/files', fd, true)

			data.forEach(d => {
				socket.emit('send-media-files', d)
			})

			setPreviousMediaData(prev => {
				let newData = {...prev}
				// newData[current] = newData[current].concat(data)
				data.forEach(d => { newData[current].push(d) })
				return newData
			})
		}
		filesRef.current.addEventListener('change', send)
		return () => {
			filesRef.current.removeEventListener('change', send)
		}
	}, [])

	async function handleClickFiles(e) {
		//filesRef.current.click()
	}
	async function handleClickLocation(e) {
	}
	async function handleClickSpeechRecognition(e) {
	}
	async function handleClick(e) {
		const message = messageRef.current.value
		if(message == '') { return }
		messageRef.current.value = ''
		
		let data = await fetchData('send_message', {chat_id: current, type: 1, data: message})
		let o = {
			media_id: data.media_id,
			chat_id: current,
			user_id: user.user_id,
			type: 1,
			time: data.time,
			data: message
		}
		socket.emit('send-media-message', o)
		setPreviousMediaData(prev => {
			// console.log(prev)
			//prev is not new array. it is a reference to previousMediaData array. so we can't use push method on it directly. we need to return a new array
			let newData = {...prev}
			//there is a problem here. react doesn't allow to iterate over prev
			newData[current].push(o)
			return newData
		})
	}
	function updatePMD(type) {
	}
	return (
		<div className='grid border padding col-gap sender'>
			<label htmlFor='files' className='grid center border square' onClick={handleClickFiles}>files</label>
			<input className='hidden' id='files' type='file' name='files' multiple ref={filesRef} />

			<button className='border square' onClick={handleClickLocation}>location</button>
			<button className='border square' onClick={handleClickSpeechRecognition}>speech recognition</button>

			<input className='border' type='text' name='send' ref={messageRef} />
			<button className='border square' onClick={handleClick}>send</button>
		</div>
	)
}
export default Sender
