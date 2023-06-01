
// Fungerar ej, får bad request vid varje anrop

async function deleteProduct (productId) {

	const  data = {
		id: productId
	}
console.log(data);
	const options = {
		method: 'delete',
		body: JSON.stringify(data)
	}
	console.log(data);

	const response = await fetch('/api/products/:id', options)
	const statusObject = await response.json()
		if (statusObject.status === 'success') {
			console.log('success');
			return true
		}
		console.log('Delete status failed: ', statusObject)
		return false
}


export default deleteProduct