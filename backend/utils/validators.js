import { log } from "console"

function isValidHat (h) {
	if ((typeof h) !== 'object' || h === null){
		return false
	}

let nameIsValid = (typeof h.name) === 'string'
nameIsValid = nameIsValid && h.name !== ''

let priceIsvalid = (typeof h.price) === 'number'
priceIsvalid = priceIsvalid && h.price  >0

let imageIsValid = (typeof h.image) === 'string'
imageIsValid = imageIsValid && h.image !== ''

let tagsIsValid = Array.isArray(h.tags)
tagsIsValid = tagsIsValid && h.tags.length !== 0

if(!nameIsValid  || !priceIsvalid || !imageIsValid ||!tagsIsValid ) {
	return false
}
return true

}

function isValidUser(u) {
	if ((typeof u) !== 'object' || u === null) {
		return false
	}
	
	let nameIsValid = (typeof u.name) === 'string'
	nameIsValid = nameIsValid && u.name !== ''

	let passwordIsValid = (typeof u.password) === 'string'
	passwordIsValid = passwordIsValid && u.password !== ''

	if(!nameIsValid || !passwordIsValid ) {
		return false
	}
	return true
}

function isValidId(user) {
	let maybeId = Number(user) 
	if(isNaN(maybeId) ) {
		return false 
	}
	return maybeId >= 0  
} 

async function userExists(users, name, password) {
	for (let i = 0; i < users.length; i++) {
		if(users[i].name === name || users[i].password === password) {
			return true;
		}
	}
	return false

}

function hasId(object) {
	let idIsValid = (typeof object.id) === 'number'
	idIsValid = idIsValid && object.id >= 0
	return idIsValid
}



export {isValidHat, isValidUser, isValidId, hasId , userExists}