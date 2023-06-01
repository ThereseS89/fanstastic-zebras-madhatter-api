import { getUsers } from '../../ApiFunctions/getUsers.js'
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

const AdminUsers = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		//uploadUsers()
		async function fetchData() {
			const usersData = await getUsers(); 
			setUsers(usersData)
		}
		fetchData()
	})
	console.log(users)

	return (
		<section className="admin-container">
		<h3>Listan över alla användare:</h3>
		<ul className='users-list'>
			
		</ul>
		
		</section>
	)
}

export default AdminUsers