
export async function editUsers(name, password, userId) {
	console.log('editUser called with:', name, password, userId);
	const changedUserData = {
		id: userId,
		name: name,
		password: password
	}

	const options = {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changedUserData)
	}
	console.log('Ändrad data: ', changedUserData)
	console.log('Options: ', options)
	
	try {
		const response = await fetch(`/api/users/${userId}`, options)
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