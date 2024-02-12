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
			<ul>
				{favorites &&
					favorites.map(favorite => <li key={favorite.id}>{elem.title}</li>)}
			</ul>
		</div>
	)
}

export default Favorite
