import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
    pais: '',
    terminos: false
  })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (formData.nombre.length < 3) {
      nuevosErrores.nombre = 'Ingresa tu nombre (mínimo 3 caracteres).'
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      nuevosErrores.email = 'Ingresa un correo válido (ej: nombre@dominio.com).'
    }

    if (formData.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres.'
    }

    if (formData.confirmar !== formData.password) {
      nuevosErrores.confirmar = 'Las contraseñas no coinciden.'
    }

    if (!formData.pais) {
      nuevosErrores.pais = 'Selecciona o escribe tu país.'
    }

    if (!formData.terminos) {
      nuevosErrores.terminos = 'Debes aceptar los términos y condiciones.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      alert('Registro exitoso. ¡Bienvenido/a!')
      // Aquí iría la lógica de registro real
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
        pais: '',
        terminos: false
      })
    }
  }

  return (
    <section aria-labelledby="registro-titulo">
      <h2 id="registro-titulo">Crear cuenta</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Ana Pérez"
            autoComplete="name"
            required
            minLength="3"
            value={formData.nombre}
            onChange={handleChange}
          />
          <small className="error" aria-live="polite">
            {errores.nombre}
          </small>
        </div>

        <div className="campo">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
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
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            required
            minLength="8"
            value={formData.password}
            onChange={handleChange}
          />
          <small className="error" aria-live="polite">
            {errores.password}
          </small>
        </div>

        <div className="campo">
          <label htmlFor="confirmar">Confirmar contraseña</label>
          <input
            id="confirmar"
            name="confirmar"
            type="password"
            required
            minLength="8"
            value={formData.confirmar}
            onChange={handleChange}
          />
          <small className="error" aria-live="polite">
            {errores.confirmar}
          </small>
        </div>

        <div className="campo">
          <label htmlFor="pais">País</label>
          <input
            id="pais"
            name="pais"
            list="paises"
            placeholder="Escribe o elige..."
            autoComplete="country-name"
            required
            value={formData.pais}
            onChange={handleChange}
          />
          <datalist id="paises">
            <option value="Chile" />
            <option value="Argentina" />
            <option value="Perú" />
            <option value="México" />
            <option value="España" />
          </datalist>
          <small className="error" aria-live="polite">
            {errores.pais}
          </small>
        </div>

        <div className="campo check">
          <input
            id="terminos"
            name="terminos"
            type="checkbox"
            required
            checked={formData.terminos}
            onChange={handleChange}
          />
          <label htmlFor="terminos">Acepto los términos y condiciones</label>
          <small className="error" aria-live="polite">
            {errores.terminos}
          </small>
        </div>

        <button className="btn" type="submit">Registrarme</button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
      </p>
    </section>
  )
}

export default Register