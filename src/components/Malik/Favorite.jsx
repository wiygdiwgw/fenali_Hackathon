import React, { useEffect } from 'react'

import ProductCard from '../product/ProductCard'
import { useFavorite } from '../context/FavoriteContextProvider'

const Favorite = () => {
	const { favorites, getFavorites } = useFavorite()

	useEffect(() => {
		getFavorites()
	}, [])

	return (
		<div>
			<h2>Избранное</h2>
			<ul>
				{favorites.map(favorite => (
					<li key={favorite.id}>
						<ProductCard />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Favorite
