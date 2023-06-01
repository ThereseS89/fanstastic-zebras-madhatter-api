

export async function editProduct(name, price, image, tags, id) {

	const changedData = {
		id: id,
		name: name,
		price: price,
		image: image,
		tags: tags
	}

	const options = {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changedData)
	}

	const response = await fetch('/api/products/id', options)
	const statusObject = await response.json()
	console.log('Response from API:', statusObject)
	if(statusObject.status === 'success' ) {
		return true; 
	} else {
		return false; 
	}
}