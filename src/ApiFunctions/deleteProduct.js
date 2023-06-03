
async function deleteProduct (productId) {

	const  data = {
		id: productId
	}
console.log(data);
	const options = {
		method: 'delete',
	}
	console.log(data);

	const response = await fetch(`/api/products/${productId}`, options)
	const statusObject = await response.json()
		if (statusObject.status === 'success') {
			console.log('success');
			return true
		}
		console.log('Delete status failed: ', statusObject)
		return false
}


export default deleteProduct