import { Link, useLocation } from 'react-router-dom'

const Header = ({ totalItems, user, onLogout }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
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
        <img 
          src="Imagenes/IconTienda.png" 
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
        
        {/* Mostrar diferentes opciones según si el usuario está logueado o no */}
        {user ? (
          <>
            {/* Opciones para usuario logueado */}
            <Link 
              to={user.type === 'admin' ? '/admin' : '/client'} 
              className={isActive('/admin') || isActive('/client') ? 'active' : ''}
            >
              {user.type === 'admin' ? 'Panel Admin' : 'Mi Cuenta'}
            </Link>
            
            {/* El carrito solo para clientes */}
            {user.type === 'client' && (
              <Link to="/cart" id="carrito-link" className={isActive('/cart') ? 'active' : ''}>
                Carrito ({totalItems || 0})
              </Link>
            )}
            
            <button 
              onClick={handleLogout} 
              style={{
                background: '#ff4444',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                textDecoration: 'none',
                font: 'inherit'
              }}
            >
              Cerrar Sesión
            </button>
            
            <span style={{ 
              marginLeft: '10px', 
              color: '#666',
              fontSize: '14px'
            }}>
              Hola, {user.name}
            </span>
          </>
        ) : (
          <>
            {/* Opciones para usuario no logueado */}
            <Link to="/register" className={isActive('/register') ? 'active' : ''}>Registrarse</Link>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>Ingresar</Link>
            <Link to="/cart" id="carrito-link" className={isActive('/cart') ? 'active' : ''}>
              Carrito ({totalItems || 0})
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header