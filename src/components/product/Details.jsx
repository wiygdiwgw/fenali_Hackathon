import React, { useEffect, useState } from 'react'
import { FaEye, FaThumbsUp } from 'react-icons/fa'
import { useComment } from '../context/CommentContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'
import { IoBookmarkOutline } from 'react-icons/io5'
import { useViewed } from '../context/ViewedContextProvider'

const Details = ({ elem }) => {
	const { comment, addComment, likeComment, getComments } = useComment()
	const { addViewed } = useViewed()
	const { addFavorite } = useFavorite()
	const [newCommentText, setNewCommentText] = useState('')
	const [comments, setComments] = useState([])
	const [commentText, setCommentText] = useState('')

	const handleChange = event => {
		setNewCommentText(event.target.value)
	}

	const handleAddToComment = () => {
		if (commentText.trim() !== '') {
			addComment({ objectId: elem.id, text: commentText })
			setCommentText('')
		} else {
			console.log('Текст отзыва пуст.')
		}
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!newCommentText.trim()) return
		try {
			const newComment = {
				text: newCommentText,
				likes: 0,
			}
			addComment(newComment)
			setComments(prevComments => [...prevComments, newComment])
			setNewCommentText('')
		} catch (error) {
			console.log('Ошибка при добавлении комментария:', error.message)
		}
	}

	const handleLike = async index => {
		const updatedComments = [...comments]
		updatedComments[index].likes = 1
		setComments(updatedComments)
		await likeComment(updatedComments[index].id)
	}

	const handleAddToFavorites = () => {
		if (elem) {
			addFavorite(elem)
		} else {
			console.error('elem is undefined or does not have id property')
		}
	}

	const handleAddToViewed = () => {
		if (!addViewed) {
			addViewed(elem.id)
		} else {
			console.error('addViewed is not available')
		}
	}

	useEffect(() => {
		getComments()
	}, [])

	return (
		<div>
			<div>
				<img src={elem && elem.image} alt={elem && elem.title} />
				<div>
					<h1>{elem && elem.title}</h1>
					<p>{elem && elem.content}</p>
					<p>{elem && elem.genre}</p>
					<p>{elem && elem.director}</p>
					<div>
						<video controls muted>
							<source src={elem && elem.video} type='video/mp4' />
						</video>
					</div>
				</div>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<textarea
						value={newCommentText}
						onChange={handleChange}
						placeholder='Оставьте ваш комментарий'
					/>
					<button
						type='submit'
						onClick={e => handleAddToComment(e.target.value)}
					>
						Отправить комментарий
					</button>
				</form>
			</div>
			<div>
				<h2>Комментарии</h2>
				<ul>
					{comments &&
						comments.map((comment, index) => (
							<li key={index}>
								<div key={elem}>{comment.text}</div>
								<div>Likes: {comment.likes}</div>
								<button onClick={() => handleLike(index)}>
									<FaThumbsUp />
								</button>
							</li>
						))}
				</ul>
			</div>
			<div>
				<button onClick={handleAddToFavorites}>
					<IoBookmarkOutline />
				</button>
				<button onClick={handleAddToViewed}>
					<FaEye />
				</button>
			</div>
		</div>
	)
}

export default Details
