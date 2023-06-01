
export async function getUsers() {
	console.log('getting users...')
	try {
			const response = await fetch('/api/users')
			const usersData = await response.json()
			
	console.log ('Response from API:' , )
	return usersData
} catch (error){
	console.error("error fetching data: ", error )
	return []
}

}