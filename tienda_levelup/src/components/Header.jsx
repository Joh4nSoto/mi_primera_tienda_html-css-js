import { Link, useLocation } from 'react-router-dom'

const Header = ({ totalItems }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="contenedor">
      <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      marginBottom: '15px'
    }}>
      <h1 style={{ margin: 0 }}>Tienda de accesorios gamer LEVEL-UP</h1>
      {/* Icono movido después del titulo*/}
      <img 
        src="imagenes\IconTienda.png" 
        alt="Icono Level Up" 
        style={{
          width: '110px',
          height: '110px',
          objectFit: 'contain'
        }}
      />
    </div>

      <nav>
        <Link to="/" className={isActive('/') ? 'active' : ''}>Inicio</Link>
        <Link to="/register" className={isActive('/register') ? 'active' : ''}>Registrarse</Link>
        <Link to="/login" className={isActive('/login') ? 'active' : ''}>Ingresar</Link>
        <Link to="/cart" id="carrito-link" className={isActive('/cart') ? 'active' : ''}>
          Carrito ({totalItems})
        </Link>
      </nav>
    </header>
  )
}

export default Header