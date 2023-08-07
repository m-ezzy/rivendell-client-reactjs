
socket.on('new-chat', (data) => {
	console.log(data)
	this.previous[data.group_id] = data.value
	this.add_item_previous(data.group_id, data.value)
	this.add_item_conv(data.group_id)
})
