import { getUsers } from '../../ApiFunctions/getUsers.js'
import { useEffect, useState } from "react"
import './adminUsers.css'
import { addUser } from '../../ApiFunctions/postUsers.js'


const AdminUsers = () => {
	const [users, setUsers] = useState([]);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		//uploadUsers()
		async function fetchData() {
			const usersData = await getUsers(); 
			setUsers(usersData)
		}
		fetchData()
	}, []);
	console.log(users)

	async function checkUserExists(name, password) {
		const usersData = await getUsers();
		return usersData.some(user => user.name === name || user.password === password);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (userName && password) {
			try {
				if (await checkUserExists(userName, password)) {
					console.log("Användaren finns redan, Välj ett nytt namn eller lösenord.");
				} else {
					await addUser(userName, password);
					if (addUser) {
						// Uppdatera användarlistan efter att en ny användare har lagts till
						const usersData = await getUsers();
						setUsers(usersData);
						console.log("Nu är användaren tillagd!");
					}
				}
			} catch (error) {
				console.log("Något gick fel, försök igen senare.");
			}
		} else {
			console.log("Kontrollera att alla fält är ifyllda.");
		}
	};


	const handleUserName = (event) => {
		setUserName(event.target.value)
	};

	const handleUserPassword = (event) => {
		setPassword(event.target.value)
	}

	return (
		<section className="admin-container">
			<div className='form-container'>
				<form className='admin-new-user'> 
				<p className='new-user-head'>Lägga till en ny användare</p>
				<label className='input-users'>Användarnamn: </label>
				<input
					type="text"
					value={userName}
					onChange={handleUserName}
					placeholder='ex. Hanna'
					className='input-box'
				/>
				<label className='input-users'>Lösenord:</label>
				<input
					type="text"
					onChange={handleUserPassword}
					placeholder='ex. madhat33'
					className='input-box'
				/>
				</form>
				<button className='new-user-button' onClick={handleSubmit}>Lägga till ny användare</button>	
				
			</div>
		
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

			</ul>
		</section>
	)
}

export default AdminUsers