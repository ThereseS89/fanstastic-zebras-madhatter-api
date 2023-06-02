

export async function getProducts() {
	console.log('getting products...')
	try {
		const response = await fetch('/api/products')
		const hatsData = await response.json()

		console.log('Response from API:', hatsData)
		return await hatsData
	} catch (error) {
		console.error("error fetching data: ", error)
		return []
	}

}

