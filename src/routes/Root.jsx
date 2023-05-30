import { Outlet } from 'react-router-dom'
import Header from '../Components/Header.jsx'
// import Footer from '../Components/Footer.jsx'


const Root = () => {
	return (
	<>
		<Header />
		<main>
			<Outlet />
		</main>
		{/* <Footer /> */}
	</>
	)
}

export default Root