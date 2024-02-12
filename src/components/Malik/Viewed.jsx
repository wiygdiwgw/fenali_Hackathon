import React from 'react'
import { useViewed } from '../context/ViewedContextProvider'

const Viewed = () => {
	const { viewed } = useViewed()

	return (
		<div>
			<h2>Просмотренные фильмы:</h2>
			<ul>
				{viewed && viewed.map(elem => <li key={elem.id}>{elem.title}</li>)}
			</ul>
		</div>
	)
}

export default Viewed
