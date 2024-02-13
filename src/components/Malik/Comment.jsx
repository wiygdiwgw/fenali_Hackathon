import React, { useEffect, useState } from 'react'
import { useComment } from '../context/CommentContextProvider'
import ErrorDisplay from './ErrorDisplay'
import axios from 'axios'
import { API } from '../../helpers/const'

const Comment = props => {
	const { comments, addComment, getComments } = useComment()
	const [newCommentText, setNewCommentText] = useState('')
	const [error, setError] = useState(null)
	const [commentText, setCommentText] = useState('')
	const [id, setId] = useState(props.id)

	const handleChange = event => {
		setNewCommentText(event.target.value)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!newCommentText.trim()) return
		try {
			await addComment({ text: newCommentText })
			setNewCommentText('')
			setError(null)
		} catch (error) {
			setError('Ошибка при добавлении комментария: ' + error.message)
		}
	}

	const handleComment = e => {
		e.preventDefault()
		if (!commentText.trim()) {
			return false
		}
		const newComment = {
			id,
			text: commentText,
		}
		axios
			.post(`${API}/comment/`, newComment)
			.then(data => {
				addComment(data)
				setCommentText('')
				getComments(id)
			})
			.catch(error => {
				console.error(error)
			})
	}

	const handleClearError = () => {
		setError(null)
	}

	useEffect(() => {
		getComments()
	}, [])

	useEffect(() => {
		localStorage.setItem('comments', JSON.stringify(comments))
	}, [comments])

	return (
		<div>
			<h2>Комментарии</h2>
			{error && (
				<ErrorDisplay errorMessage={error} onClose={handleClearError} />
			)}
			<ul>
				{comments.map(comment => (
					<li key={comment.id}>{comment.text}</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<textarea
					value={newCommentText}
					onChange={handleChange}
					placeholder='Введите ваш комментарий'
				/>
				<button type='submit' onClick={() => handleComment()}>
					Добавить комментарий
				</button>
			</form>
		</div>
	)
}

export default Comment
