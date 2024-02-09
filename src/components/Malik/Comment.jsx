import React, { useState } from 'react'
import { useComment } from './CommentContextProvider'

const Comment = () => {
	const { comments, addComment } = useComment()
	const [newCommentText, setNewCommentText] = useState('')

	const handleChange = event => {
		setNewCommentText(event.target.value)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!newCommentText.trim()) return
		try {
			await addComment({ text: newCommentText })
			setNewCommentText('')
		} catch (error) {
			console.error('Ошибка при добавлении комментария:', error)
		}
	}

	return (
		<div>
			<h2>Комментарии</h2>
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
