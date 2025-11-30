import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'client' // Campo nuevo para tipo de usuario
  })
  const [errores, setErrores] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      nuevosErrores.email = 'Correo no válido.'
    }

    if (formData.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      // Simulación de datos de usuario
      const userData = {
        id: Date.now(), // ID temporal
        name: formData.email.split('@')[0], // Nombre del email
        email: formData.email,
        type: formData.userType
      }
      
      // Llamar a la función onLogin pasada desde App.jsx
      if (onLogin) {
        onLogin(userData)
      }
      
      // Redirigir según el tipo de usuario
      if (formData.userType === 'admin') {
        navigate('/admin')
      } else {
        navigate('/client')
      }
      
      // Limpiar formulario
      setFormData({ email: '', password: '', userType: 'client' })
    }
  }

  return (
    <section aria-labelledby="login-titulo">
      <h2 id="login-titulo">Ingresar al sitio</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="loginEmail">Correo electrónico</label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            placeholder="Ej: ana@mail.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <small className="error" aria-live="polite">
            {errores.email}
          </small>
        </div>

        <div className="campo">
          <label htmlFor="loginPassword">Contraseña</label>
          <input
            id="loginPassword"
            name="password"
            type="password"
            required
            minLength="8"
            value={formData.password}
            onChange={handleChange}
          />
          <small className="error" aria-live="polite">
            {errores.password}
          </small>
        </div>

        {/* NUEVO CAMPO: Tipo de usuario */}
        <div className="campo">
          <label htmlFor="loginUserType">Tipo de usuario</label>
          <select
            id="loginUserType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="select-input"
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <small style={{ color: '#666', fontSize: '0.8rem' }}>
            Selecciona el tipo de cuenta que tienes
          </small>
        </div>

        <button className="btn" type="submit">Ingresar</button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </section>
  )
}
const handleSubmit = (e) => {
  e.preventDefault()
  if (validarFormulario()) {
    // Credenciales fijas para administrador
    const adminCredentials = {
      email: 'admin@levelup.com',
      password: 'admin1234'
    }

    let userData

    // Verificar si es el administrador
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      userData = {
        id: 1,
        name: 'Administrador',
        email: formData.email,
        type: 'admin'
      }
    } else {
      // Usuario normal
      userData = {
        id: Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        type: formData.userType
      }
    }
    
    if (onLogin) {
      onLogin(userData)
    }
    
    if (userData.type === 'admin') {
      navigate('/admin')
    } else {
      navigate('/client')
    }
    
    setFormData({ email: '', password: '', userType: 'client' })
  }
  const handleSubmit = (e) => {
  e.preventDefault()
  if (validarFormulario()) {
    // Credenciales fijas para administrador
    const adminCredentials = {
      email: 'admin@levelup.com',
      password: 'admin1234'
    }

    let userData

    // Verificar si es el administrador
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      userData = {
        id: 1,
        name: 'Administrador',
        email: formData.email,
        type: 'admin'
      }
    } else {
      // Usuario normal
      userData = {
        id: Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        type: formData.userType
      }
    }
    
    if (onLogin) {
      onLogin(userData)
    }
    
    if (userData.type === 'admin') {
      navigate('/admin')
    } else {
      navigate('/client')
    }
    
    setFormData({ email: '', password: '', userType: 'client' })
  }
}
}

export default Login