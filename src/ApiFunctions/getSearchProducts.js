

export async function getSearchProducts(searchWord) {
	console.log('Getting search result...');

	try {
		const response = await fetch('/api/search?q=' + searchWord)
		const searchData = await response.json()

		console.log(await searchData);
		return await searchData;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}