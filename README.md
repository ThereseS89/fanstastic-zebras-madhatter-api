# Restapi

## Introduction
Welcome to Fantastic Zebras Rest-Api project!

Fantastic Zebras is Ann-Sophie Malmqvist, Annika Nylin och Therese Sköld.

This API i created for the webbshop "Madhatter", were you can find and buy awesome hats.

It contains productsdata and userdata, and you can use the API to get the data, change it, delete and add a new product or user.

#
 
## The following information is a guide how to use the API with example code.
#

### How To use the API:
#

#### Endpoints
The url: 
```js
....api/products

....api/users
```

To find out a specific user you can use the endpoint: 
```js
...api/products/id

GET /api/search
```

The API is built to support the methods "GET", "POST, "PUT", "DELETE". Wich you can se in the following code examples.

### Code-examples!
#
#### How to get all the products:

```js
const urlProducts = "...api/products"

	async functions getHats(){
	try {
		const response = await fetch(url)
		const data = await response.json()
		return data
	} catch(error) {
		console.log('you can use console.log to find out what the error is')
	}
	return null
}
```
### How to make the searchfunction work
```js
async function getSearchProducts(searchWord) {
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
```
### How to add a new product
```js
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
```


### How to delete a product

```js
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
```
### How to edit products:

```js
async function editProduct(name, price, image, tags, productId) {
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
```
#

#### Responses
	The API returns in JSON format like this: 
```json
	{
      "id": 1,
      "name": "Klassisk Svart Hatt",
      "price": 149,
      "image": "https://img.freepik.com/free-vector/black-top-hat-isolated_1284-43034.jpg?size=626&ext=jpg&ga=GA1.2.1027157510.1664794963&semt=ais",
      "tags": [
        "hatt",
        "svart",
        "klassisk"
      ]
    }
```
	Or like this for users:
```json
	{
      "name": "Benny",
      "password": "grävmask",
      "id": 6
    }
```

#

#### Status Codes

	Here are the status-codes that are used:

| Status Code | Description |
| ----------- | ----------- |
| 200 		  | OK          |
| 201 		  | Created     |
| 400 		  | Bad request |
| 404         | Not found   |
| 409         | Conflict    |
| 500         | Internal Server Error|


### Maintance and support: 
	***Fantastic Zebras***
