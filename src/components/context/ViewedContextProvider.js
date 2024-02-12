import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ACTIONS, API } from '../../helpers/const'
import axios from 'axios'

const ViewedContext = createContext()

const INIT_STATE = {
	viewed: [],
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_VIEWED:
			return { ...state, viewed: action.payload }
		case ACTIONS.ADD_VIEWED:
			return { ...state, viewed: [...state.viewed, action.payload] }
		case ACTIONS.CHECK_VIEWED:
			return { ...state, viewed: [...state.viewed, action.payload] }
		case ACTIONS.DELETE_VIEWED:
			return {
				...state,
				viewed: state.viewed.filter(viewed => viewed.id !== action.payload),
			}
		default:
			return state
	}
}

export const useViewed = () => useContext(ViewedContext)

const ViewedContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	//! Config
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

	const addViewed = async newViewed => {
		try {
			const response = await axios.post(
				`${API}/viewed/view/`,
				newViewed,
				getConfig()
			)
			dispatch({ type: ACTIONS.ADD_VIEWED, payload: response.data })
		} catch (error) {
			console.log('Ошибка при добавлении в просмотренное:', error)
		}
	}

	const getViewed = async () => {
		try {
			const response = await axios(`${API}/viewed/view/`, getConfig())
			dispatch({ type: ACTIONS.GET_VIEWED, payload: response.data })
		} catch (error) {
			console.log('Ошибка при загрузке просмотренных элементов:', error)
		}
	}

	const checkViewed = async id => {
		try {
			const response = await axios(`${API}/viewed/view/${id}/`, getConfig())
			dispatch({ type: ACTIONS.CHECK_VIEWED, payload: response.data })
		} catch (error) {
			console.log('Ошибка при проверке просмотренного элемента:', error)
			return false
		}
	}

	const deleteViewed = async id => {
		try {
			await axios.delete(`${API}/viewed/view/${id}/`, getConfig())
			dispatch({ type: ACTIONS.DELETE_VIEWED, payload: id })
		} catch (error) {
			console.log('Ошибка при удалении просмотренного:', error)
		}
	}

	useEffect(() => {
		getViewed()
	}, [])

	const values = {
		viewed: state.viewed,
		addViewed,
		getViewed,
		deleteViewed,
		checkViewed,
	}

	return (
		<ViewedContext.Provider value={{ values }}>
			{children}
		</ViewedContext.Provider>
	)
}

export default ViewedContextProvider
