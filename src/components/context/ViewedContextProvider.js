import React, { createContext, useContext, useState } from 'react'

const ViewedContext = createContext()

export const useViewed = () => useContext(ViewedContext)

const ViewedContextProvider = ({ children }) => {
	const [viewed, setViewed] = useState([])

	const addViewedItem = item => {
		setViewed(prevViewed => [...prevViewed, item])
	}

	return (
		<ViewedContext.Provider value={{ viewed, addViewedItem }}>
			{children}
		</ViewedContext.Provider>
	)
}

export default ViewedContextProvider
