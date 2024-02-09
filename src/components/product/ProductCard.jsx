import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADMIN } from '../../helpers/const'
import { useProducts } from '../context/ProductContextProvider'
import Details from './Details'

const ProductCard = ({ elem }) => {
	const { getProducts, getOneProduct, deleteProducts } = useProducts()
	const [showModal, setShowModal] = useState(false)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const navigate = useNavigate()

	const handleWatchFilm = () => {
		getOneProduct(elem.id)
		setShowModal(true)
	}

	useEffect(() => {
		getProducts()
	}, [])

	return (
		<div>
			<div onClick={handleOpen}>
				<img src={elem && elem.image} alt='SWAG' />
			</div>
			<div>
				<div>{elem && elem.title}</div>
				<div>{elem && elem.content}</div>
				<div>{elem && elem.genre.title}</div>
				<div>{elem && elem.director}</div>
				<button onClick={handleWatchFilm}>Смотреть фильм</button>
				{ADMIN ? (
					<div>
						<button onClick={() => deleteProducts(elem.id)}>Удалить</button>
						<button onClick={() => navigate(`/edit/${elem.id}`)}>
							Изменить
						</button>
					</div>
				) : null}
			</div>
			<Details elem={elem} open={open} handleClose={handleClose} />
			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={() => setShowModal(false)}>
							&times;
						</span>
						<div>
							<video controls muted>
								<source src={elem && elem.video} type='video/mp4' />
							</video>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductCard
