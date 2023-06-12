import express from 'express'
import { getDb } from '../data/database.js'


const router = express.Router()
const db = await getDb()

//hämta produkter utifrån tags eller name
router.get('/' , async (req, res) => {
	let possibleSearch = req.query.q
	let sortBy = req.query.sort 
	let orderBy = req.query.order
	
console.log('this is apossible tag:', possibleSearch);
	await db.read()
	
	if( !possibleSearch || !sortBy || !orderBy){
		console.log("Du måste använda rätt query-strings: 'q', 'sort', och 'order' ");
		res.sendStatus(400)
		return
	}

	if(sortBy !== 'price' && sortBy !== 'name') {
		console.log("Kan bara sortera på 'name' eller 'price' ");
		res.sendStatus(400)
		return
	}

	if(orderBy !== 'asc' && orderBy !== 'desc') {
		console.log("Kan bara sortera på 'asc' och 'desc' ");
		res.sendStatus(400)
		return
	}

	let possibleHats = db.data.products.filter((products) => products.name.toLowerCase().includes(possibleSearch.toLowerCase()))
	console.log('hattar som matchar  ',possibleHats);

	

		possibleHats.sort(function(a, b) {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		const priceA = a.price
		const priceB = b.price

		if(sortBy === "name" && orderBy === "asc"){
			
				return nameA > nameB ? 1 : -1
			}

		if (sortBy === "name" && orderBy === "desc") {
				
				return nameA < nameB ? 1 : -1
			}

		if(sortBy === "price" && orderBy === "asc"){
			
				return priceA > priceB ? 1 : -1
			}

		if (sortBy === "price" && orderBy === "desc") {
				
				return priceA < priceB ? 1 : -1
				
			}
			return 0

		})

	if(possibleHats.length === 0){
		res.sendStatus(404)
		console.log('Produkten hittades inte');
		return
	}
	res.send(possibleHats)
})
export default router