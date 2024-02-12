import React, { useEffect, useState } from 'react'
import { useComment } from '../context/CommentContextProvider'
import ErrorDisplay from './ErrorDisplay'

const Comment = () => {
	const { comments, addComment, getComments } = useComment()
	const [newCommentText, setNewCommentText] = useState('')
	const [error, setError] = useState(null)

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
				<button type='submit'>Добавить комментарий</button>
			</form>
		</div>
	)
}

export default Comment
