import React, { createContext, useContext, useEffect, useReducer } from 'react'

import { ACTIONS, API } from '../../helpers/const'
import axios from 'axios'

const FavoriteContext = createContext()

const INIT_STATE = {
	favorites: [],
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_FAVORITES:
			return { ...state, favorites: action.payload }
		case ACTIONS.ADD_FAVORITE:
			return { ...state, favorites: [...state.favorites, action.payload] }
		case ACTIONS.CHECK_FAVORITE:
			return { ...state, favorites: [...state.favorites, action.payload] }
		case ACTIONS.DELETE_FAVORITE:
			return {
				...state,
				favorites: state.favorites.filter(
					favorite => favorite.id !== action.payload
				),
			}
		default:
			return state
	}
}

export const useFavorite = () => useContext(FavoriteContext)

const FavoriteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	// //! Config
	const getConfig = () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'))
		if (!tokens || !tokens.access) {
			return null
		}
		const Authorization = `Bearer ${tokens.access}`
		const config = {
			headers: { Authorization },
		}
		return config
	}

	//! ADD FAVORITE
	const addFavorite = async newFavorite => {
		try {
			const response = await axios.post(
				`${API}/favorite/favorite/`,
				newFavorite,
				getConfig()
			)
			dispatch({ type: ACTIONS.ADD_FAVORITE, payload: response.data })
		} catch (error) {
			console.log('Ошибка при добавлении в избранное:', error)
		}
	}

	//! GET FAVORITES
	const getFavorites = async () => {
		try {
			const response = await axios(`${API}/favorite/favorite/`, getConfig())
			dispatch({ type: ACTIONS.GET_FAVORITES, payload: response.data })
		} catch (error) {
			console.log('Ошибка при загрузке избранных элементов:', error)
		}
	}

	//! CHECK FAVORITE
	const checkFavorite = async id => {
		try {
			const response = await axios(
				`${API}/favorite/favorite/${id}/`,
				getConfig()
			)
			dispatch({ type: ACTIONS.CHECK_FAVORITE, payload: response.data })
		} catch (error) {
			console.log('Ошибка при проверке избранного элемента:', error)
			return false
		}
	}

	//! DELETE FAVORITE
	const deleteFavorite = async id => {
		try {
			await axios.delete(`${API}/favorite/favorite/${id}/`, getConfig())
			dispatch({ type: ACTIONS.DELETE_FAVORITE, payload: id })
		} catch (error) {
			console.log('Ошибка при удалении избранного:', error)
		}
	}

	useEffect(() => {
		getFavorites()
	}, [])

	return (
		<FavoriteContext.Provider
			value={{
				getFavorites,
				favorites: state.favorites,
				addFavorite,
				checkFavorite,
				deleteFavorite,
			}}
		>
			{children}
		</FavoriteContext.Provider>
	)
}

export default FavoriteContextProvider
