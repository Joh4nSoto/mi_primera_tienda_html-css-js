import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import { productosService } from './services/productosService'
import './App.css'

function App() {
  const [carrito, setCarrito] = useState([])
  const [productosData, setProductosData] = useState([])
  const [cargando, setCargando] = useState(true)

  // Cargar productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        console.log('📦 Iniciando carga de productos...');
        const productos = await productosService.obtenerProductos();
        setProductosData(productos);
        console.log('🎯 Productos establecidos:', productos.length);
      } catch (error) {
        console.error('💥 Error en App:', error);
        // En caso de error, establecer array vacío
        setProductosData([]);
      } finally {
        setCargando(false);
        console.log('🏁 Carga completada');
      }
    }

    cargarProductos();
  }, [])

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado))
    }
  }, [])

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id)
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      } else {
        return [...prevCarrito, { ...producto, cantidad }]
      }
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id))
  }

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return
    
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const getTotalCarrito = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  }

  const getTotalItems = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0)
  }

  // Estado de carga - mostrar solo brevemente
  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando tienda...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Header totalItems={getTotalItems()} />
        <main className="contenedor">
          <Routes>
            <Route path="/" element={
              <Home 
                productos={productosData}
                agregarAlCarrito={agregarAlCarrito}
              />
            } />
            <Route path="/producto/:id" element={
              <ProductDetail 
                productos={productosData}
                agregarAlCarrito={agregarAlCarrito}
              />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={
              <Cart 
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                actualizarCantidad={actualizarCantidad}
                vaciarCarrito={vaciarCarrito}
                getTotalCarrito={getTotalCarrito}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className="contenedor">
        <p>&copy; 2025 Tienda de accesorios gamer LEVEL-UP</p>
        <p>Contacto: <a href="mailto:contacto@mitienda.test">contacto@mitienda.test</a></p>
      </div>
    </footer>
  )
}

export default App