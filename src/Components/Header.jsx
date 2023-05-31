import { NavLink } from "react-router-dom"

const Header = () => {
	return (
		<>

		<h1>MADHATTER</h1>
		<nav>
			<NavLink to="products">Hattar</NavLink>
			<NavLink to="admin">Admin</NavLink>
			
		</nav>
		</>
	)
}

export default Header