import React, { useEffect } from 'react'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContextProvider'

const AddProduct = () => {
	const { genres, getGenres, createProduct } = useProducts()

	const [genre, setGenre] = useState('')
	const [title, setTitle] = useState('')
	const [image, setImage] = useState('')
	const [video, setVideo] = useState('')
	const [content, setContent] = useState('')
	const [director, setDirector] = useState('')

	const navigate = useNavigate()

	const handleClick = () => {
		const newProduct = new FormData()
		newProduct.append('genre', genre)
		newProduct.append('title', title)
		newProduct.append('image', image)
		newProduct.append('video', video)
		newProduct.append('content', content)
		newProduct.append('director', director)
		createProduct(newProduct)
		navigate('/products')
	}

	useEffect(() => {
		getGenres()
	}, [])

	return (
		<div>
			<h1>Добавление фильма/сериала</h1>
			<select onChange={e => setGenre(e.target.value)}>
				<option>Выбрать категорию</option>
				{genres &&
					genres.map(elem => (
						<option value={elem.id} key={elem.id}>
							{elem.title}
						</option>
					))}
			</select>
			<input
				onChange={e => setTitle(e.target.value)}
				name='title'
				label='Title'
				placeholder='Название'
			/>
			<input
				onChange={e => setImage(e.target.value)}
				name='image'
				label='Image'
				placeholder='Изображение'
				type='file'
			/>
			<input
				onChange={e => setVideo(e.target.value)}
				name='video'
				label='Video'
				placeholder='Фильм'
				type='file'
			/>
			<input
				onChange={e => setContent(e.target.value)}
				name='content'
				label='Content'
				placeholder='Описание'
			/>
			<input
				onChange={e => setDirector(e.target.value)}
				name='director'
				label='Director'
				placeholder='Режиссёр'
			/>
			<button onClick={handleClick}>Добавить</button>
		</div>
	)
}

export default AddProduct
