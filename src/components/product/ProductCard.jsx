import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'
import { useViewed } from '../context/ViewedContextProvider'
import { FaEye } from 'react-icons/fa'
import { IoBookmarkOutline } from 'react-icons/io5'
import styles from './css/ProductCard.module.css'

const ProductCard = ({ elem }) => {
	const { addFavorite, checkViewed } = useFavorite()
	const { addViewed } = useViewed()
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	const handleAddToFavorites = () => {
		// Проверяем, что elem не является undefined
		if (elem) {
			addFavorite(elem) // Передаем только id в функцию addFavorite
		} else {
			console.error('elem is undefined or does not have id property')
		}
	}

	const handleAddToViewed = () => {
		if (addViewed) {
			addViewed(elem)
		} else {
			console.error('addViewed is not available')
		}
	}

	return (
		<div className={styles.productCard}>
			<Link to={`/det/${elem.id}`} className={styles.productLink}>
				<img src={elem && elem.image} alt='SWAG' />
			</Link>
			<div>
				<div>{elem && elem.title}</div>
				<div>{elem && elem.content}</div>
				<div>{elem && elem.genre.title}</div>
				<div>{elem && elem.director}</div>

				<div>
					<button onClick={handleAddToFavorites}>
						<IoBookmarkOutline />
					</button>
					<button onClick={handleAddToViewed}>
						<FaEye />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard

// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ADMIN } from '../../helpers/const'
// import { useProducts } from '../context/ProductContextProvider'
// import Details from './Details'
// import styles from './css/ProductCard.module.css'

// const ProductCard = ({ elem }) => {
// 	const { getProducts, getOneProduct, deleteProducts } = useProducts()
// 	const [showModal, setShowModal] = useState(false)
// 	const [open, setOpen] = useState(false)
// 	const navigate = useNavigate()

// 	// const handleWatchFilm = () => {
// 	// 	getOneProduct(elem.id)
// 	// 	setShowModal(true)
// 	// }

// 	useEffect(() => {
// 		getProducts()
// 	}, [])

// 	return (
// 		<div className={styles.productCard}>
// 			<div onClick={() => setOpen(true)}>
// 				<img src={elem && elem.image} alt='SWAG' />
// 			</div>
// 			<div>
// 				<div>{elem && elem.title}</div>
// 				<div>{elem && elem.content}</div>
// 				<div>{elem && elem.genre.title}</div>
// 				<div>{elem && elem.director}</div>
// 				{/* <button onClick={handleWatchFilm}>Смотреть фильм</button> */}
// 				{ADMIN ? (
// 					<div>
// 						<button onClick={() => deleteProducts(elem.id)}>Удалить</button>
// 						<button onClick={() => navigate(`/edit/${elem.id}`)}>
// 							Изменить
// 						</button>
// 					</div>
// 				) : null}
// 			</div>
// 			<Details elem={elem} open={open} handleClose={() => setOpen(false)} />
// 			{/* {showModal && (
// 				<div className={styles.modal}>
// 					<div className={styles.modalContent}>
// 						<span className={styles.close} onClick={() => setShowModal(false)}>
// 							&times;
// 						</span>
// 						<div>
// 							<video controls muted>
// 								<source src={elem && elem.video} type='video/mp4' />
// 							</video>
// 						</div>
// 					</div>
// 				</div>
// 			)} */}
// 		</div>
// 	)
// }

// export default ProductCard
