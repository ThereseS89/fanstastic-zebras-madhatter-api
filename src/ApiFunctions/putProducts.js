

export async function editProduct(name, price, image, tags, productId) {
	console.log('editProduct called with:', name, price, image, tags, productId);
	const changedData = {
		id: productId,
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
	console.log('Ändrad data: ', changedData)
	console.log('Options: ', options)
	
	try {
		const response = await fetch(`/api/products/${productId}`, options)
		const statusObject = await response.json()
		console.log('Response from API:', statusObject)
		console.log('Response: ', response)
		if(statusObject.status === 'success' ) {
			return true; 
		} else {
			return false; 
		}
	} catch(error) {
		console.error("Fetch error:", error)
	}
	
}