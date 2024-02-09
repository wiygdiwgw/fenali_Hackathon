import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { ACTIONS, API } from '../../helpers/const'

// Создание контекста для избранных элементов
const FavoriteContext = createContext()

// Начальное состояние и редуктор для управления состоянием избранных элементов
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

	//! ADD FAVORITE
	const addFavorite = async newFavorite => {
		try {
			const response = await axios.post(
				`${API}/favorite/favorite/`,
				newFavorite
			)
			dispatch({ type: ACTIONS.ADD_FAVORITE, payload: response.data })
		} catch (error) {
			console.error('Ошибка при добавлении в избранное:', error)
		}
	}

	//! GET FAVORITES
	const getFavorites = async () => {
		try {
			const response = await axios(`${API}/favorite/favorite/`)
			dispatch({ type: ACTIONS.GET_FAVORITES, payload: response.data })
		} catch (error) {
			console.error('Ошибка при загрузке избранных элементов:', error)
		}
	}

	//! CHECK FAVORITE
	const checkFavorite = async id => {
		try {
			const response = await axios(`${API}/favorite/favorite/${id}/`)
			// return !!response.data
			dispatch({ type: ACTIONS.CHECK_FAVORITE, payload: response.data })
		} catch (error) {
			console.error('Ошибка при проверке избранного элемента:', error)
			return false
		}
	}

	//! DELETE FAVORITE
	const deleteFavorite = async id => {
		try {
			await axios.delete(`${API}/favorite/favorite/${id}/`)
			dispatch({ type: ACTIONS.DELETE_FAVORITE, payload: id })
		} catch (error) {
			console.error('Ошибка при удалении избранного:', error)
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
