import React, { useState, useEffect } from 'react'
import styles from './css/Navbar.module.css'
import { IoBookmarkOutline } from 'react-icons/io5'
import { RiUser3Fill } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()

	const handleLogin = () => {
		setIsLoggedIn(true)
		localStorage.setItem('isLoggedIn', 'true')
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
		localStorage.removeItem('isLoggedIn')
	}

	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn')
		if (loggedIn === 'true') {
			setIsLoggedIn(true)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<Link className={styles.logoLink} to='/products'>
						CINEMA ONLINE
					</Link>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.accBlock}>
					<div className={styles.searchBlock}>
						<input
							className={styles.searchInput}
							type='text'
							placeholder='Search...'
						/>
					</div>
					<div className={styles.iconBlock}>
						<button onClick={() => navigate('/fav')}>
							<IoBookmarkOutline className={styles.icon} />
						</button>
					</div>
					<div className={styles.iconBlock}>
						<button onClick={() => navigate('/viewed')}>
							<FaEye className={styles.icon} />
						</button>
					</div>
					{isLoggedIn ? (
						<div className={styles.login}>
							<Link
								to='/logout'
								className={styles.loginLink}
								onClick={handleLogout}
							>
								<RiUser3Fill
									className={`${styles.avatarIcon} ${styles.rounded}`}
								/>
								Выйти
							</Link>
						</div>
					) : (
						<div className={styles.login}>
							<Link
								to='/auth'
								className={styles.loginLink}
								onClick={handleLogin}
							>
								<RiUser3Fill className={styles.avatarIcon} />
								Войти
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
