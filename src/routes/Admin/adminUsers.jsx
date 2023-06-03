import { getUsers } from '../../ApiFunctions/getUsers.js'
import { useEffect, useState } from "react"
import './adminUsers.css'
import { addUser } from '../../ApiFunctions/postUsers.js'
import deleteUsers from '../../ApiFunctions/deleteUsers.js'
import { editUsers } from '../../ApiFunctions/putUsers.js'



const AdminUsers = () => {
	const [users, setUsers] = useState([]);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [editUserId, setEditUserId] = useState(null)
	const [editedUserPassword, setEditedUserPassword] = useState('')
	const [editedUserName, setEditedUserName] = useState('')

	useEffect(() => {
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
	 const handleDeleteUser = async (userId) => {
		await deleteUsers(userId)
		
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

	//funktioner för att redigera
	
	

	const handleUserEdit = (userId) => {
		setEditUserId(userId)
		const selectedUser = users.find((user) => user.id === userId)
		setEditedUserName(selectedUser.name);
		setEditedUserPassword(selectedUser.password);

	
	}
	
	const handleCancelUserEdit = () => {
		setEditUserId(null)
		setEditedUserName('')
		setEditedUserPassword('')
	}
	
	const handleSubmitUserEdit = async (userId, event) => {
		event.preventDefault();
		await editUsers(editedUserName, editedUserPassword, userId)
		console.log('handleSubmit: Koden körs 1')
	
		const userData = await getUsers()
		setUsers(await userData)
	
		setEditUserId(null)
	
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
						{editUserId === user.id ? (
						<div>
							<input
								type="text"
								value={editedUserName}
								onChange={(e) => setEditedUserName(e.target.value)}/>
							<input
								type="text"
								value={editedUserPassword}
								onChange={(e) => setEditedUserPassword(e.target.value)}
							/>
							<button type="button" onClick={(event) => handleSubmitUserEdit(user.id, event)}>Spara</button>
							<button type="button" onClick={handleCancelUserEdit}>Avbryt</button>
						</div>
						) : ( 
							<div>
						<p className='user-info'>Namn: {user.name}</p>
						<p className='user-password'>Password: {user.password}</p>
						<div className='button-container'>
							<button className='remove-button'onClick={() => handleDeleteUser(user.id)}>Ta bort</button>
							<button type="submit"
						onClick={() => handleUserEdit(user.id)} 
						className='change-button'>Ändra</button>
						</div>
						<hr/>
					</div> 

				)} 
				</div>
			))}
				
				

			</ul>
		</section>
	)
}

export default AdminUsers