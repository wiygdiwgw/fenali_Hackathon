import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { ACTIONS, API } from '../../helpers/const'

const CommentContext = createContext()

const INIT_STATE = {
	comment: [],
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_COMMENTS:
			return { ...state, comment: action.payload }
		case ACTIONS.ADD_COMMENT:
			return { ...state, comment: [...state.comment, action.payload] }
		case ACTIONS.CHECK_COMMENT:
			return { ...state, comment: [...state.comment, action.payload] }
		case ACTIONS.LIKE_COMMENT:
			return { ...state, comment: [...state.comment, action.payload] }
		case ACTIONS.DELETE_COMMENT:
			return {
				...state,
				comment: state.comment.filter(comment => comment.id !== action.payload),
			}
		default:
			return state
	}
}

export const useComment = () => useContext(CommentContext)

const CommentContextProvider = ({ children }) => {
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

	//! ADD COMMENTS
	const addComment = async newComment => {
		try {
			const response = await axios.post(
				`${API}/comment/`,
				newComment,
				getConfig()
			)
			dispatch({ type: ACTIONS.ADD_COMMENT, payload: response.data })
		} catch (error) {
			console.log('Ошибка при добавлении комментария:', error.message)
		}
	}

	//! GET COMMENTS
	const getComments = async () => {
		try {
			const response = await axios(`${API}/comment/`, getConfig())
			dispatch({ type: ACTIONS.GET_COMMENTS, payload: response.data })
		} catch (error) {
			console.log('Ошибка при загрузке комментариев:', error.message)
		}
	}

	//! EDIT
	const editComment = async (id, newComment) => {
		try {
			await axios.patch(`${API}/comment/${id}/`, newComment, getConfig())
		} catch (error) {
			console.log(error)
		}
	}

	//! CHECK COMMENT
	const checkComment = async id => {
		try {
			const response = await axios(`${API}/comment/${id}/`, getConfig())
			dispatch({
				type: ACTIONS.CHECK_COMMENT,
				payload: response.data,
			})
		} catch (error) {
			console.log('Ошибка при проверке комментария:', error.message)
			return false
		}
	}

	//! DELETE COMMENTS
	const deleteComment = async id => {
		try {
			await axios.delete(`${API}/comment/${id}/`, getConfig())
			dispatch({ type: ACTIONS.DELETE_COMMENT, payload: id })
		} catch (error) {
			console.log('Ошибка при удалении комментария:', error.message)
		}
	}

	//! LIKE COMMENT
	const likeComment = async id => {
		try {
			await axios.post(`${API}/comment/${id}/like/`, getConfig())
			dispatch({ type: ACTIONS.LIKE_COMMENT, payload: id })
		} catch (error) {
			console.log('Ошибка при лайке комментария: ' + error.message)
		}
	}

	useEffect(() => {
		getComments()
	}, [])

	if (!children) return null

	return (
		<CommentContext.Provider
			value={{
				getComments,
				comment: state.comment,
				addComment,
				editComment,
				checkComment,
				deleteComment,
				likeComment,
			}}
		>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider
