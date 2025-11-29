import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errores, setErrores] = useState({})

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
      alert('Ingreso exitoso (demo).')
      // Aquí iría la lógica de autenticación real
      setFormData({ email: '', password: '' })
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

        <button className="btn" type="submit">Ingresar</button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </section>
  )
}

export default Login