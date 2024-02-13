import React, { useState } from 'react'
import { useProducts } from '../context/ProductContextProvider'

const AddGenre = () => {
	const { AddGenres } = useProducts()
	const [genre, setGenre] = useState('')

	const handleClick = () => {
		if (!genre) {
			alert('Заполните поле!')
		}
		let formData = new FormData()
		formData.append('title', genre)
		AddGenres()
	}
	return (
		<div>
			<h2>Добавить жанр</h2>
			<input onChange={e => setGenre(e.target.value)} />
			<button onClick={handleClick}>Добавить</button>
		</div>
	)
}

export default AddGenre
