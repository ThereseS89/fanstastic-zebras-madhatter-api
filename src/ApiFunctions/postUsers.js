

export async function addUser(name, password) {
	console.log('Adding user...')

	const data = {
		name: name,
		password: password,
	}

	const options = {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	}
	const response = await fetch('/api/users/', options)
	const statusObject = await response.json()
	console.log('Response from API:', statusObject)
	if(statusObject.status === 'success' ) {
		return true; 
	} else {
		return false; 
	}
}