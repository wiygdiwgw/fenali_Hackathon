import React, { useEffect, useState } from 'react'
import { FaEye, FaThumbsUp } from 'react-icons/fa'
// import { useAuth } from '../context/AuthContextProvider'
import { useComment } from '../context/CommentContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'

import { IoBookmarkOutline } from 'react-icons/io5'
import { useAuth } from '../context/AuthContextProvider'
import { useViewed } from '../context/ViewedContextProvider'

const Details = ({ elem }) => {
	const { addComment, likeComment, getComments } = useComment()
	// const { currentUser } = useAuth()
	const { addViewed } = useViewed()
	const { addFavorite } = useFavorite()
	const [newCommentText, setNewCommentText] = useState('')
	const [comments, setComments] = useState([])

	const handleChange = event => {
		setNewCommentText(event.target.value)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!newCommentText.trim()) return
		// const user = currentUser
		// if (user) {
		try {
			const newComment = {
				text: newCommentText,
				likes: 0,
				// username: user.username,
			} // Используем свойство username текущего пользователя
			addComment(newComment)
			setComments(prevComments => [...prevComments, newComment])
			setNewCommentText('')
		} catch (error) {
			console.log('Ошибка при добавлении комментария:', error.message)
		}
		// } else {
		// 	console.log('Пользователь не авторизован') // Обработка случая, когда пользователь не авторизован
		// }
	}

	const handleLike = async index => {
		const updatedComments = [...comments]
		updatedComments[index].likes = 1
		setComments(updatedComments)
		await likeComment(updatedComments[index].id)
	}

	const handleAddToFavorites = () => {
		// Проверяем, что elem не является undefined
		if (elem) {
			addFavorite(elem) // Передаем только id в функцию addFavorite
		} else {
			console.error('elem is undefined or does not have id property')
		}
	}

	const handleAddToViewed = () => {
		if (addViewed) {
			addViewed(elem.id)
		} else {
			console.error('addViewed is not available')
		}
	}

	useEffect(() => {
		getComments()
	}, [comments])

	// Сохраняем комментарии в localStorage при изменении
	// useEffect(() => {
	// 	localStorage.setItem('comments', JSON.stringify(comments))
	// }, [comments])

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
					<button type='submit'>Отправить комментарий</button>
				</form>
			</div>
			<div>
				<h2>Комментарии</h2>
				<ul>
					{comments.map((comment, index) => (
						<li key={index}>
							<div>{comment.text}</div>
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

// import React from 'react'
// import { useViewed } from '../context/ViewedContextProvider'

// const Details = ({ elem }) => {
// 	const { addViewedItem, checkViewed } = useViewed()

// 	return (
// 		<div>
// 			<div>
// 				<img src={elem.image} alt={elem.title} />
// 				<div>
// 					<h1>{elem.title}</h1>
// 					<p>{elem.content}</p>
// 					<p>{elem.genre}</p>
// 					<p>{elem.director}</p>
// 					<div>
// 						<video controls muted>
// 							<source src={elem && elem.video} type='video/mp4' />
// 						</video>
// 					</div>
// 				</div>
// 			</div>
// 			<div>
// 				{checkViewed(elem.id) ? (
// 					<button>Already in cart</button>
// 				) : (
// 					<button onClick={() => addViewedItem(elem)}>
// 						Buy now ${elem.price}
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default Details
