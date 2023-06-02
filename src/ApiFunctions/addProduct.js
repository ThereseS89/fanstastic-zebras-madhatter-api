

async function addProduct(name, priceAsNumber, image, tagsArray){
console.log('tags array:', tagsArray);
console.log(typeof priceAsNumber);
const data = {
	name: name,
	price: priceAsNumber,
	image: image,
	tags:tagsArray
}
console.log('Data som skickas', data);


const options = {
	method: 'post',
	headers: {
		'content-Type': 'application/json',
	},
	body: JSON.stringify(data)
}

const response = await fetch('/api/products/', options)
const statusObject = await response.json()
	console.log('response fromAPI:', statusObject);
	if( statusObject.stats === 'success' ) {
		return true
	}
	return false
}

export default addProduct