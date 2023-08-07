import React from 'react'

const MediaItem = React.forwardRef(({user, media_id, chat_id, user_id, user_name, type, time, data}, ref) => {
	let c = (user_id == user.user_id) ? 'sent' : 'received'
	let data2
	
	/*React.useEffect(() => {
		if(type == 2) {
			async function gets() {
				let response = await fetch(
					`api/media_image/${media_id}/${data}`, {
						method: 'GET', 
						mode: 'cors', 
						headers: {
							// 'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/x-www-form-urlencoded'
						}, 
					}
				)
				console.log(response)
				data2 = await response.arrayBuffer()
				data2 = data2.toString('base64')
				console.log(data2)
				var base64 = btoa(
					new Uint8Array(data2)
						.reduce((data, byte) => data + String.fromCharCode(byte), '')
				)
			}
			gets()
		}
	}, [])*/

	return (
		<div className={`grid border padding media-item ${c}`} ref={ref}>
			{(type == 1) && <div className='message'>{data}</div>}
			{(type == 2) && <img className='border' src={`api/get_media_data/${media_id}.${data}`} />}
			{(type == 3) && <video className='border' controls><source src={`api/get_media_data/${media_id}.${data}`} type='video/mp4' /></video>}
			{(type == 4) && <audio controls src={`api/get_media_data/${media_id}.${data}`}></audio>}
			{(type == 5) && <><div>document</div><a className='border' href={`api/get_media_data/${media_id}.${data}`} download>download</a></>}
			<div className='grid time'>{time}</div>
		</div>
	)
})
export default MediaItem
