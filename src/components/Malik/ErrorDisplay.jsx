import React, { useEffect } from 'react'

const ErrorDisplay = ({ errorMessage, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose()
		}, 5000)

		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div style={{ color: 'red' }}>
			<p>{errorMessage}</p>
		</div>
	)
}

export default ErrorDisplay
