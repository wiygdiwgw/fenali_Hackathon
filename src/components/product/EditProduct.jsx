import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContextProvider'

const EditProduct = () => {
	const { genres, getGenres, getOneProduct, oneProduct, editItem } =
		useProducts()

	const { id } = useParams()

	const navigate = useNavigate()

	const [genre, setGenre] = useState(oneProduct.genre)
	const [title, setTitle] = useState(oneProduct.title)
	const [image, setImage] = useState('')
	const [video, setVideo] = useState(oneProduct.video)
	const [content, setContent] = useState(oneProduct.content)
	const [director, setDirector] = useState(oneProduct.price)

	const handleClick = () => {
		const newProduct = new FormData()
		newProduct.append('genre', genre)
		newProduct.append('title', title)
		if (image) {
			newProduct.append('image', image)
		}
		newProduct.append('video', video)
		newProduct.append('content', content)
		newProduct.append('director', director)
		editItem(id, newProduct)
		navigate('/products')
	}

	useEffect(() => {
		getGenres()
		getOneProduct(id)
	}, [])

	useEffect(() => {
		if (oneProduct) {
			setGenre(oneProduct.genre)
			setTitle(oneProduct.title)
			setImage(oneProduct.image)
			setVideo(oneProduct.video)
			setContent(oneProduct.content)
			setDirector(oneProduct.director)
		}
	}, [oneProduct])

	return (
		<div>
			<h2>Изменить фильм</h2>
			<div>
				<input
					onChange={e => setTitle(e.target.value)}
					placeholder='Название'
					type='text'
					value={title}
				/>
				<input
					onChange={e => setDirector(e.target.value)}
					placeholder='Режиссёр'
					type='text'
					value={director}
				/>
				<input
					onChange={e => setContent(e.target.value)}
					placeholder='Описание'
					type='text'
					value={content}
				/>
				<input
					onChange={e => setImage(e.target.files[0])}
					placeholder='Изображение'
					type='file'
				/>
				<input
					onChange={e => setVideo(e.target.files[0])}
					placeholder='Видео'
					type='file'
				/>
				<select onChange={e => setGenre(e.target.value)}>
					<option>Выбрать категорию</option>
					{genres &&
						genres.map(elem => (
							<option value={elem.id} key={elem.id}>
								{elem.title}
							</option>
						))}
				</select>
				<button onClick={handleClick}>Подтвердить</button>
			</div>
		</div>
	)
}

export default EditProduct
