import express from 'express'
import { getDb } from '../data/database.js'
import {generateUserId} from '../utils/generateId.js'
import { hasId, isValidId, isValidUser, userExists } from '../utils/validators.js'

const router = express.Router()
const db = getDb()


//hämta alla användare 
router.get('/', async (req, res) => {
	console.log('GET /users: ')
	await db.read()
	res.send(db.data.users)
})

//hämta en användare utifrån id
router.get('/:id', async (req, res) => {
	console.log('GET /users/:id')
	if(!isValidId(req.params.id) ) {
		res.sendStatus(400) //Bad request
		console.log('Incorrent value, must be a number for Id..')
		return
	} 
	let id = Number(req.params.id)

	await db.read()
	let mayBeUsers = db.data.users.find(user => user.id === id)
	if(!mayBeUsers) {
		res.sendStatus(404) //not found
		console.log('Could not found the correct id in the list.. ')
		return
	}
	res.status(200).send(mayBeUsers)
	console.log('Found the correct user..')

})

//lägg till en ny användare
router.post('/', async (req, res) => {

	let mayBeUsers = req.body
	console.log('Incoming user: ' , mayBeUsers)
	// const users = db.data.users
	
	if (isValidUser(mayBeUsers)) {
		await db.read()
		if ( await userExists(db.data.users,mayBeUsers.name, mayBeUsers.password)) {
			res.sendStatus(409) 
			console.log('Användaren finns redan')
		}else{

			mayBeUsers.id = await generateUserId();
			db.data.users.push(mayBeUsers);
			await db.write();
			res.send(mayBeUsers);
			console.log('post valid')
			//id: mayBeUsers.id 
		}
	}
	else {
		res.sendStatus(400); // Bad request
		console.log('felsöker, post invalid')
	}

})
//kunna ändra i användare
router.put('/:id', async (req, res) => {
	if(!isValidId(req.params.id)) {
		res.sendStatus(400) 
		console.log('Incorrect value, had to be a number for id..')
		return
	}
	let id = Number(req.params.id)

	if(!isValidUser(req.body) || !hasId) {
		res.sendStatus(400)
		console.log('Incorrect value..')
		return
	}
	let editUser = req.body 
	await db.read()
	let oldUserIndex = db.data.users.findIndex(user => user.id === id)
	if(oldUserIndex === -1) {
		res.sendStatus(404)
		console.log('Could not found the id to change users..')
		return
	}
	editUser.id = id
	db.data.users[oldUserIndex] = editUser
	await db.write()
	res.sendStatus(200)
	console.log('Now you have change the user..')
})

//kunna ta bort en användare 
router.delete('/:id', async(req, res) => {
	if( !isValidId(req.params.id)) {
		res.sendStatus(400) //Bad Request
		console.log('Delete One/user, incorrect value..')
		return
	}
	let id = Number(req.params.id)

	await db.read()

	let mayBeUsers = db.data.users.find(user => user.id === id)
	if(!mayBeUsers) {
		res.sendStatus(404) //Not found
		console.log('Delete One/user, Could not found id in the list ')
		return
	}
	db.data.users = db.data.users.filter(user => user.id !== id)
	await db.write()
	res.sendStatus(200) //Det är ok!
	console.log('Now is the user deleted.')

})


// function generateUserId() {
// 	const highestId = Number(db.data.users.reduce((maxId, currentUser) => {
// 		return Math.max(maxId, currentUser.id) 
// 	}, 0))
// 	console.log('Generate: ', highestId)
// 	return highestId + 1 
	
// }





export default router