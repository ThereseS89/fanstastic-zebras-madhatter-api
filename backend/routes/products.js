import express from 'express'
import { getDb } from '../data/database.js'
import { isValidHat, isValidId, hasId } from '../utils/validators.js'
import { generateProductId } from '../utils/generateId.js'

const router = express.Router()
const db = getDb()

//hämta alla producter
router.get('/', async (req, res) => {
	await db.read()
	let products = db.data.products

	res.send(products)
})

//hämta en produkt utifrån ID
router.get('/:id', async (req, res) => {
	let possiblyId = Number(req.params.id)
	
		if(isNaN(possiblyId) || possiblyId < 0){
			res.sendStatus(400)
			return
		}

		await db.read()

		let possibleProduct = db.data.products.find(product => product.id === possiblyId)

		if(!possibleProduct){
			res.sendStatus(404)
			return
		}

		res.send(possibleProduct)
})
 

//lägga till nya produkter 
router.post('/', async (req, res) =>{

let possibleNewHat = req.body 
console.log('post possibleNewHat:', possibleNewHat);

if(isValidHat(possibleNewHat)) {
	await db.read()
	if( await isHat(possibleNewHat)){
		res.sendStatus(409)
		console.log('Produkten finns redan');

	}else{
	
	possibleNewHat.id = await generateProductId()
	db.data.products.push(possibleNewHat)
	await db.write()
	res.send(possibleNewHat)
	console.log('post valid');
	}
}

else {
	res.sendStatus(400)
	console.log('felsöker, post invalid');
}
})


// function generateProductId() {
// 	const highestId = Number(db.data.products.reduce((maxId, currentProduct) => { return Math.max(maxId,  currentProduct.id)
// 	}, 0))
// 	return highestId + 1
// }

	async function isHat(h) {
	console.log('db.data:', db.data);
	let existingHat = db.data.products.some(product => product.name === h.name && product.image === h.image)
	
	if (existingHat) {
		return true	
	}
	return false
}

// Kunna ändra i produkterna
router.put('/:id', async (req,res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	if( !isValidHat(req.body) || !hasId ) {
		res.sendStatus(400)
		return
	}

	let editedHat = req.body
	await db.read()
	let oldHatIndex = db.data.products.findIndex(hat => hat.id === id)
	if( oldHatIndex === -1 ) {
		res.sendStatus(404)
		return
	}
	db.data.products[oldHatIndex] = editedHat
	await db.write()
	res.sendStatus(200)
})

// Kunna ta bort en produkt
router.delete('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)
	await db.read()
	let maybeHat = db.data.products.find(hat => hat.id === id)
	if (!maybeHat) {
		res.sendStatus(404)
		return
	}
	db.data.products = db.data.products.filter(hat => hat.id !== id)
	await db.write()
	res.sendStatus(200)
} )



export default router
