import React from 'react'
import Footer from './components/homepage/Footer'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/homepage/Navbar'

const App = () => {
	return (
		<div>
			<Navbar />
			<MainRoutes />
			<Footer />
		</div>
	)
}

export default App
