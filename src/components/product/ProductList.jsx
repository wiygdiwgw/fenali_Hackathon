import React, { useEffect, useState } from 'react'
import { useProducts } from '../context/ProductContextProvider'
import { useSearchParams } from 'react-router-dom'
import ProductCard from './ProductCard'

const ProductList = () => {
	const { getProducts, products, pages } = useProducts()
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState(1)

	const getPagesCount = () => {
		const pageCountArr = []
		for (let i = 1; i <= pages; i++) {
			pageCountArr.push(i)
		}
		return pageCountArr
	}

	useEffect(() => {
		getProducts()
	}, [])

	useEffect(() => {
		getProducts()
	}, [currentPage, searchParams])

	useEffect(() => {
		setSearchParams({ page: currentPage })
	}, [currentPage])

	const chunkArray = (arr, chunkSize) => {
		const chunkedArr = []
		for (let i = 0; i < arr.length; i += chunkSize) {
			chunkedArr.push(arr.slice(i, i + chunkSize))
		}
		return chunkedArr
	}

	const handlePrevClick = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
	}

	const handleNextClick = () => {
		setCurrentPage(prevPage => Math.min(prevPage + 1, pages))
	}

	const chunkedProducts = chunkArray(products, 3)
	return (
		<div>
			<div>
				<h1>Cinema Online</h1>
				{chunkedProducts.map((row, rowIndex) => (
					<div key={rowIndex}>
						{row.map(elem => (
							<div key={elem.id}>
								<ProductCard elem={elem} />
							</div>
						))}
					</div>
				))}
				<div>
					<button onClick={handlePrevClick}>prev</button>
					{getPagesCount().map(item => (
						<button onClick={() => setCurrentPage(item)} key={item}>
							{item}
						</button>
					))}
					<button onClick={handleNextClick}>next</button>
				</div>
			</div>
		</div>
	)
}

export default ProductList
