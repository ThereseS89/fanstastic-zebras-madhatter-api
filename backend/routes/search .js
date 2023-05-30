import express from 'express'
import { getDb } from '../data/database.js'


const router = express.Router()
const db = getDb()

//hämta produkter utifrån tags 
router.get('/' , async (req, res) => {
	let possibleSearch = req.query.q
	
console.log('this is apossible tag:', possibleSearch);
	await db.read()


	let possibleHats = db.data.products.filter(products => products.tags.some( tag => tag === possibleSearch)) 
	//console.log('hattar som matchar: ',possibleHats);

	possibleHats.sort(function(a, b) {
		const nameA = a.name.toUpperCase()
		const nameB = b.name.toUpperCase()

		if (nameA > nameB){
			return 1
		}

		if (nameA < nameB) {
			return -1
		}
		return 0
	})
	if(possibleHats.length === 0){
		res.sendStatus(404)
	}
res.send(possibleHats)
})
export default router