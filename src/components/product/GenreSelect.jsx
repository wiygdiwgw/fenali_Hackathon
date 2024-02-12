import React, { useEffect } from 'react'
import { useProducts } from '../context/ProductContextProvider'

const GenreSelect = ({ handleInput }) => {
	const { genres, getGenres } = useProducts()

	useEffect(() => {
		getGenres()
	}, [])

	return (
		<div>
			<label htmlFor='genre'>Выбрать жанр</label>
			<select id='genre' name='genre' onChange={handleInput} defaultValue=''>
				<option disabled value=''>
					Select genre
				</option>
				{genres &&
					genres.map(elem => (
						<option value={elem.name} key={elem.id}>
							{elem.name}
						</option>
					))}
			</select>
		</div>
	)
}

export default GenreSelect
