import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { API } from '../../helpers/const'

const authContext = createContext()
export const useAuth = () => useContext(authContext)

const AuthContextProvider = ({ children }) => {
	const [error, setError] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)

	//! REGISTER
	const handleRegister = async formData => {
		try {
			await axios.post(`${API}/account/register/`, formData)
		} catch (error) {
			setError(Object.values(error.response))
		}
	}

	//! LOGIN
	const handleLogin = async (formData, email) => {
		try {
			const res = await axios.post(`${API}/account/login/`, formData)
			localStorage.setItem('tokens', JSON.stringify(res.data))
			localStorage.setItem('email', email)
			setCurrentUser(email)
		} catch (error) {
			setError(Object.values(error.response.data))
		}
	}

	//! LOGOUT
	const handleLogout = () => {
		localStorage.removeItem('tokens')
		localStorage.removeItem('email')
		setCurrentUser(null)
	}

	//! checkAuth
	const checkAuth = async () => {
		try {
			const tokens = JSON.parse(localStorage.getItem('tokens'))
			const res = await axios.post(`${API}/account/refresh/`, {
				refresh: tokens.refresh,
			})
			localStorage.setItem(
				'tokens',
				JSON.stringify({ access: res.data.access, refresh: tokens.refresh })
			)
			const email = localStorage.getItem('email')
			setCurrentUser(email)
		} catch (error) {
			console.log(error)
			// setError(Object.values(error.response.data))
		}
	}

	const values = {
		handleRegister,
		handleLogin,
		currentUser,
		handleLogout,
		checkAuth,
		error,
	}
	return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export default AuthContextProvider
