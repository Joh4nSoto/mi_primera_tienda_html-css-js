import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

const AdminDashboard = ({ user }) => {
  const location = useLocation()
  const [products, setProducts] = useState([])

  const menuItems = [
    { path: '/admin', label: 'Dashboard', component: DashboardHome },
    { path: '/admin/products', label: 'Productos', component: ProductManagement },
    { path: '/admin/orders', label: 'Pedidos', component: OrdersManagement },
    { path: '/admin/users', label: 'Usuarios', component: UsersManagement }
  ]

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Panel de Administración</h2>
          <p>Bienvenido, {user?.name}</p>
        </div>
        <nav className="admin-nav">
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
      
      <div className="admin-content">
        <Routes>
          {menuItems.map(item => (
            <Route 
              key={item.path} 
              path={item.path.replace('/admin', '')} 
              element={<item.component products={products} setProducts={setProducts} />} 
            />
          ))}
          <Route path="/" element={<DashboardHome />} />
        </Routes>
      </div>
    </div>
  )
}

// Componente Dashboard Home
const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h1>Dashboard Administrativo</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Ventas Totales</h3>
          <p className="stat-number">$12,450</p>
        </div>
        <div className="stat-card">
          <h3>Productos</h3>
          <p className="stat-number">45</p>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p className="stat-number">128</p>
        </div>
        <div className="stat-card">
          <h3>Pedidos Pendientes</h3>
          <p className="stat-number">8</p>
        </div>
      </div>
    </div>
  )
}

// Componente Gestión de Productos
const ProductManagement = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleDelete = (productId) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const handleSave = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ))
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id), 0) + 1
      }
      setProducts([...products, newProduct])
    }
    setShowModal(false)
    setEditingProduct(null)
  }

  return (
    <div className="product-management">
      <div className="page-header">
        <h1>Gestión de Productos</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Agregar Producto
        </button>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => {
                      setEditingProduct(product)
                      setShowModal(true)
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductForm 
          product={editingProduct}
          onClose={() => {
            setShowModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

// Componente Formulario de Producto
const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    description: product?.description || '',
    image: product?.image || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>URL de la imagen:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Componente Gestión de Pedidos
const OrdersManagement = () => {
  const [orders] = useState([
    { id: 1, customer: 'Juan Pérez', total: 150.00, status: 'Pendiente', date: '2024-01-15' },
    { id: 2, customer: 'María García', total: 89.99, status: 'Completado', date: '2024-01-14' }
  ])

  return (
    <div className="orders-management">
      <h1>Gestión de Pedidos</h1>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td className="actions">
                  <button className="btn-edit">Ver Detalles</button>
                  <button className="btn-edit">Cambiar Estado</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Componente Gestión de Usuarios
const UsersManagement = () => {
  const [users] = useState([
    { id: 1, name: 'Ana López', email: 'ana@email.com', type: 'Cliente', joinDate: '2024-01-10' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@email.com', type: 'Cliente', joinDate: '2024-01-12' }
  ])

  return (
    <div className="users-management">
      <h1>Gestión de Usuarios</h1>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>{user.joinDate}</td>
                <td className="actions">
                  <button className="btn-edit">Editar</button>
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard