import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

const ClientDashboard = ({ user }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/client', label: 'Mi Perfil', component: Profile },
    { path: '/client/orders', label: 'Mis Pedidos', component: Orders },
    { path: '/client/addresses', label: 'Direcciones', component: Addresses },
    { path: '/client/settings', label: 'Configuración', component: Settings }
  ]

  return (
    <div className="client-dashboard">
      <div className="client-sidebar">
        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h3>{user?.name || 'Usuario'}</h3>
          <p>{user?.email || 'usuario@email.com'}</p>
        </div>
        <nav className="client-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="client-content">
        <Routes>
          {menuItems.map(item => (
            <Route 
              key={item.path} 
              path={item.path.replace('/client', '')} 
              element={<item.component user={user} />} 
            />
          ))}
          <Route path="/" element={<Profile user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

// Componente Perfil del Cliente
const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Perfil actualizado correctamente')
  }

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="profile-section">
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <textarea
            name="address"
            value={profileData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Ingresa tu dirección completa"
          />
        </div>
        <button type="submit" className="btn-primary">Actualizar Perfil</button>
      </form>
    </div>
  )
}

// Componente Pedidos del Cliente
const Orders = () => {
  const [orders] = useState([
    { id: 1, date: '2024-01-15', total: 150.00, status: 'Entregado', items: 3 },
    { id: 2, date: '2024-01-10', total: 89.99, status: 'En camino', items: 2 },
    { id: 3, date: '2024-01-05', total: 45.50, status: 'Procesando', items: 1 }
  ])

  return (
    <div className="orders-section">
      <h1>Mis Pedidos</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <strong>Pedido #{order.id}</strong>
                <span className="order-date">{order.date}</span>
              </div>
              <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </span>
            </div>
            <div className="order-details">
              <span>{order.items} producto(s)</span>
              <strong>Total: ${order.total}</strong>
            </div>
            <div className="order-actions">
              <button className="btn-secondary">Ver Detalles</button>
              <button className="btn-primary">Seguir Pedido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente Direcciones
const Addresses = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Casa', address: 'Calle Principal 123, Ciudad, Estado 12345', isDefault: true },
    { id: 2, name: 'Trabajo', address: 'Avenida Central 456, Ciudad, Estado 12345', isDefault: false }
  ])

  const addAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      name: 'Nueva Dirección',
      address: '',
      isDefault: false
    }
    setAddresses([...addresses, newAddress])
  }

  return (
    <div className="addresses-section">
      <h1>Mis Direcciones</h1>
      <button className="btn-primary" onClick={addAddress}>
        Agregar Dirección
      </button>
      <div className="addresses-grid">
        {addresses.map(address => (
          <div key={address.id} className="address-card">
            <div className="address-header">
              <h3>{address.name}</h3>
              {address.isDefault && <span className="default-badge">Principal</span>}
            </div>
            <p>{address.address}</p>
            <div className="address-actions">
              <button className="btn-secondary">Editar</button>
              {!address.isDefault && (
                <button className="btn-danger">Eliminar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente Configuración
const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: true,
    twoFactor: false
  })

  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    })
  }

  return (
    <div className="settings-section">
      <h1>Configuración</h1>
      <div className="settings-list">
        <div className="setting-item">
          <div>
            <h3>Notificaciones por Email</h3>
            <p>Recibir notificaciones sobre tus pedidos y ofertas</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleSettingChange('notifications')}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div>
            <h3>Boletín Informativo</h3>
            <p>Recibir ofertas especiales y novedades</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={() => handleSettingChange('newsletter')}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div>
            <h3>Autenticación de Dos Factores</h3>
            <p>Mayor seguridad para tu cuenta</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={() => handleSettingChange('twoFactor')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard