import React from 'react'
import Footer from './components/homepage/Footer'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/homepage/Navbar'

const App = () => {
	return (
		<>
			<Navbar />
			<MainRoutes />
			<Footer />
		</>
	)
}

export default App
