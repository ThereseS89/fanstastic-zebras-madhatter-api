
async function deleteUsers (userId) {

	const data = {
		id: userId,
	}
console.log(data);
	const options = {
		method: 'delete',
	}
	console.log(data);

	const response = await fetch(`/api/users/${userId}`, options)
	const statusObject = await response.json()
		if (statusObject.status === 'success') {
			console.log('success');
			return true
		}
		console.log('Delete status failed: ', statusObject)
		return false
}


export default deleteUsers