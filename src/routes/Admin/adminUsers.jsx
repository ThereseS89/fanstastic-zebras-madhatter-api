import { getUsers } from '../../ApiFunctions/getUsers.js'
import { useEffect, useState } from "react"
import './adminUsers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const AdminUsers = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		//uploadUsers()
		async function fetchData() {
			const usersData = await getUsers(); 
			setUsers(usersData)
		}
		fetchData()
	}, []);

	console.log(users)

	return (
		<section className="admin-container">
			<h3 className='user-head'>Listan över alla användare:</h3>
			<ul className='users-list'>
				{users.map((user) => (

					<div className="user-container" key={user.id}>
						<p className='user-info'>Namn: {user.name}</p>
						<p className='user-password'>Password: {user.password}</p>
						<div className='button-container'>
							<button className='remove-button'>Ta bort</button>
							<button className='change-button'>Ändra</button>
						</div>
						<hr/>
					</div>
				))}

				<button className='new-user-button'>Lägga till ny användare</button>	
				
			</ul>
		</section>
	)
}

export default AdminUsers