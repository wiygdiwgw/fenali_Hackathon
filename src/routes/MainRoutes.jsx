import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import AddProduct from '../components/product/AddProduct'
import AddGenre from '../components/product/AddGenre'
import ProductPage from '../pages/ProductPage'
import EditPage from './../pages/EditPage'
import Login from '../components/Malik/Login'
import Register from '../components/Malik/Register'
import Favorite from '../components/Malik/Favorite'
import Details from '../components/product/Details'
import ViewedPage from '../pages/ViewedPage'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/products' element={<ProductPage />} />
			<Route path='/fav' element={<Favorite />} />
			<Route path='/viewed' element={<ViewedPage />} />
			<Route path='/det/:id' element={<Details />} />
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
