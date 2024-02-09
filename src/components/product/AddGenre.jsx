import React, { useState } from 'react'
import { useProducts } from '../context/ProductContextProvider'

const AddCategory = () => {
	const { AddGenre } = useProducts()
	const [genre, setGenre] = useState('')

	const handleClick = () => {
		if (!genre) {
			alert('Заполните поле!')
		}
		let formData = new FormData()
		formData.append('title', genre)
		AddGenre()
	}
	return (
		<div>
			<h2>Добавить жанр</h2>
			<input onChange={e => setGenre(e.target.value)} />
			<button onClick={handleClick}>Добавить</button>
		</div>
	)
}

export default AddCategory
