import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from './css/Register.module.css'
import { useAuth } from '../context/AuthContextProvider'

const Register = () => {
	const { handleRegister, error } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
	const navigate = useNavigate()

	const handleSave = () => {
		if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
			alert('Заполните все поля!')
		} else {
			let formData = new FormData()
			formData.append('email', email)
			formData.append('password', password)
			formData.append('password_confirm', passwordConfirm)
			handleRegister(formData)
			navigate('/login')
		}
	}

	return (
		<div className={styles.container}>
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.inputContainer}>
				<input
					onChange={e => setEmail(e.target.value)}
					className={styles.input}
					placeholder='Email'
					type='text'
				/>
			</div>
			<div className={styles.inputContainer}>
				<input
					onChange={e => setPassword(e.target.value)}
					className={styles.input}
					placeholder='Password'
					type={showPassword ? 'text' : 'password'}
				/>
				{showPassword ? (
					<FaEyeSlash
						className={styles.icon}
						onClick={() => setShowPassword(false)}
					/>
				) : (
					<FaEye
						className={styles.icon}
						onClick={() => setShowPassword(true)}
					/>
				)}
			</div>
			<div className={styles.inputContainer}>
				<input
					onChange={e => setPasswordConfirm(e.target.value)}
					className={styles.input}
					placeholder='Confirm Password'
					type={showPasswordConfirm ? 'text' : 'password'}
				/>
				{showPasswordConfirm ? (
					<FaEyeSlash
						className={styles.icon}
						onClick={() => setShowPasswordConfirm(false)}
					/>
				) : (
					<FaEye
						className={styles.icon}
						onClick={() => setShowPasswordConfirm(true)}
					/>
				)}
			</div>
			<button className={styles.button} onClick={handleSave}>
				Создать аккаунт
			</button>
		</div>
	)
}

export default Register
