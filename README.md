# Restapi

## Introduction
Welcome to Fantastic Zebras Rest-Api project!

Fantastic Zebras is Ann-Sophie Malmqvist, Annika Nylin och Therese Sköld.

This API i created for the webbshop "Madhatter", were you can find and buy awesome hats.

It contains productsdata and userdata, and you can use the API to get the data, change it, delete and add a new product or user.
 
## The following information is a guide how to use the API with example code.

### How To use the API:

#### Endpoints
The url: 
....api/products

....api/users

To find out a specific user you can use the endpoint: 
...api/products/id

GET /api/search


The API is built to support the metods "GET", "POST, "PUT", "DELETE".

#### Code-examples!

How to get all the products:

```
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

// Här kan vi lägga till mer kodexempel om vi vill??? //

#### Responses
	The API returns in JSON format like this: 
```
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
```
	{
      "name": "Benny",
      "password": "grävmask",
      "id": 6
    }
```



#### Status Codes

	Here are the status-codes that are used:

	| Status Code | Description |
	|-------------|-------------|
	| 200         | OK          |
	| 201         | Created     |
	| 400         | Bad request |
	| 404         | Not found   |
	| 409         | Conflict    |
	| 500         | Internal Server problem|


### Maintance and support: 
	***Fantastic Zebras***
