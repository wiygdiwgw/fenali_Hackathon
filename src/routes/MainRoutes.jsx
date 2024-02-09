import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import AddProduct from '../components/product/AddProduct'
import AddGenre from '../components/product/AddGenre'
import ProductPage from '../pages/ProductPage'
import EditPage from './../pages/EditPage'
import Favorite from '../components/contextPage/Favorite'
import Viewed from '../components/contextPage/Viewed'
import Login from '../components/Malik/Login'
import Register from '../components/Malik/Register'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/products' element={<ProductPage />} />
			<Route path='/fav' element={<Favorite />} />
			<Route path='/viewed' element={<Viewed />} />
			<Route path='/edit/:id' element={<EditPage />} />
			<Route path='/addProduct' element={<AddProduct />} />
			<Route path='/addCategory' element={<AddGenre />} />
			<Route path='/auth' element={<AuthPage />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	)
}

export default MainRoutes
