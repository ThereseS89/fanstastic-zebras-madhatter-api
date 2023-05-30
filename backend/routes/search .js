import express from 'express'
import { getDb } from '../data/database.js'


const router = express.Router()
const db = getDb()
console.log(db.data);
//hämta produkter utifrån tags eller name


//TODO: *ändra params till query
// 		*kunna söka på name också?
router.get('/:tags' , async (req, res) => {
	let possibleSearch = req.params.tags
console.log('this is apossible tag:', possibleSearch);
	await db.read()


	let possibleHats = db.data.products.filter(products => products.tags.some( tag => tag === possibleSearch)) 
	if(!possibleHats){
		sendStatus(404)
	}
console.log('possible Hats ',possibleHats);
	res.send(possibleHats)
	
})

export default router