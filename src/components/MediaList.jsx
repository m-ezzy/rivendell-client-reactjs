import React from 'react'
import MediaItem from './MediaItem'
import socket from '../socket'

function MediaList({user, current, user_id, previousMediaData, setPreviousMediaData, socket}) {
	const lastMediaRef = React.useRef()
	let items = []

	React.useEffect(() => {
		// let previousMedia = sessionStorage.getItem('previous_media')

		if(Object.keys(previousMediaData).includes(current + '') == false) {
			async function gets() {
				let data = await fetchData('previous_media', {'chat_id': current})
				// sessionStorage.setItem('previous_media', JSON.stringify(data))
				setPreviousMediaData(prev => {
					return {...prev, [current]: data}
				})
			}
			gets()
		}
	}, [current])

	React.useEffect(() => {
		if(lastMediaRef.current) {
			lastMediaRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
		}
	})

	if(previousMediaData[current]) {
		items = previousMediaData[current].map((r, index) => {
			const isLastMedia = (previousMediaData[current].length - 1) === index
			return (
				<MediaItem 
					user={user} key={r.media_id} media_id={r.media_id} chat_id={r.chat_id} user_id={r.user_id} user_name={r.user_name} type={r.type} time={r.time} data={r.data} 
					ref={isLastMedia ? lastMediaRef : null} 
				/>
			)
		})
	}

	return (
		<div className="grid padding row-gap media-list">
			{items}
		</div>
	)
}
export default MediaList
