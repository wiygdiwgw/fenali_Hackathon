import React, { useEffect } from 'react'

import { useFavorite } from '../context/FavoriteContextProvider'

const Favorite = ({ elem, id }) => {
	const { favorites, getFavorites } = useFavorite()

	useEffect(() => {
		getFavorites()
	}, [])

	return (
		<div>
			<h2>Избранное</h2>
			{favorites.map((product, index) => (
				<div key={index}>
					<li>{product.title}</li>
				</div>
			))}
		</div>
	)
}

export default Favorite
