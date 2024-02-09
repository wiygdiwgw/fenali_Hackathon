import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { ACTIONS, API } from '../../helpers/const'

const CommentContext = createContext()

const INIT_STATE = {
	comments: [],
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_COMMENTS:
			return { ...state, comments: action.payload }
		case ACTIONS.ADD_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] }
		case ACTIONS.CHECK_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] }
		case ACTIONS.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					comment => comment.id !== action.payload
				),
			}
		default:
			return state
	}
}

export const useComment = () => useContext(CommentContext)

const CommentContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	//! ADD COMMENTS
	const addComment = async newComment => {
		try {
			const response = await axios.post(`${API}/comment/`, newComment)
			dispatch({ type: ACTIONS.ADD_COMMENT, payload: response.data })
		} catch (error) {
			console.error('Ошибка при добавлении комментария:', error)
		}
	}

	//! GET COMMENTS
	const getComments = async () => {
		try {
			const response = await axios(`${API}/comment/`)
			dispatch({ type: ACTIONS.GET_COMMENTS, payload: response.data })
		} catch (error) {
			console.error('Ошибка при загрузке комментариев:', error)
		}
	}

	//! EDIT
	const editComment = async (id, newComment) => {
		try {
			await axios.patch(`${API}/comment/${id}/`, newComment)
		} catch (error) {
			console.log(error)
		}
	}

	//! CHECK COMMENT
	const checkComment = async id => {
		try {
			const response = await axios(`${API}/comment/${id}/`)
			// return !!response.data
			dispatch({
				type: ACTIONS.CHECK_COMMENT,
				payload: response.data,
			})
		} catch (error) {
			console.error('Ошибка при проверке комментария:', error)
			return false
		}
	}

	//! DELETE COMMENTS
	const deleteComment = async id => {
		try {
			await axios.delete(`${API}/comment/${id}/`)
			dispatch({ type: ACTIONS.DELETE_COMMENT, payload: id })
		} catch (error) {
			console.error('Ошибка при удалении комментария:', error)
		}
	}

	useEffect(() => {
		getComments()
	}, [])

	return (
		<CommentContext.Provider
			value={{
				getComments,
				comments: state.comments,
				addComment,
				editComment,
				checkComment,
				deleteComment,
			}}
		>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider
