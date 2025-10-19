import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ProductCard from './ProductCard'

const ProductDetail = ({ productos, agregarAlCarrito }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const productoEncontrado = productos.find(p => p.id === id)
    setProducto(productoEncontrado)
    setImageError(false) // Resetear error al cambiar producto
  }, [id, productos])

  const aumentarCantidad = () => {
    setCantidad(prev => Math.min(prev + 1, 10))
  }

  const disminuirCantidad = () => {
    setCantidad(prev => Math.max(prev - 1, 1))
  }

  const handleAgregarCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto, cantidad)
    }
  }

  const handleComprarAhora = () => {
    if (producto) {
      agregarAlCarrito(producto, cantidad)
      navigate('/cart')
    }
  }

  const handleImageError = (e) => {
    console.error('Error cargando imagen:', e.target.src)
    setImageError(true)
    e.target.style.display = 'none'
  }

  const productosRelacionados = productos
    .filter(p => p.categoria === producto?.categoria && p.id !== producto?.id)
    .slice(0, 3)

  if (!producto) {
    return (
      <div className="producto-no-encontrado">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <>
      <div className="ruta">
        <Link to="/">Inicio</Link>
        <button 
          className="btn-link"
          onClick={() => navigate('/')}
        >
          {producto.categoria}
        </button>
        <span>{producto.nombre}</span>
      </div>

      <section className="detalle-producto">
        <div className="galeria-producto">
          <div className="imagen-principal">
            {!imageError ? (
              <img 
                className="producto_img" 
                src={producto.imagen} 
                alt={producto.nombre}
                loading="lazy"
                onError={handleImageError}
                onLoad={() => console.log('Imagen cargada:', producto.imagen)}
              />
            ) : (
              <div className="imagen-placeholder">
                <p>📷 Imagen no disponible</p>
                <p>{producto.nombre}</p>
              </div>
            )}
          </div>
        </div>

        <div className="info-producto">
          <h1>{producto.nombre}</h1>
          <div className="rating">
            <span className="estrellas">★★★★★</span>
            <span className="num-reseñas">(42 reseñas)</span>
          </div>
          <p className="precio">
            <strong>${producto.precio.toLocaleString('es-CL')}</strong>
          </p>
          <p className="descripcion-detalle">{producto.descripcion}</p>
          
          <div className="especificaciones">
            <h3>Especificaciones:</h3>
            <ul>
              {producto.especificaciones.map((esp, index) => (
                <li key={index}>{esp}</li>
              ))}
            </ul>
          </div>

          <div className="cantidad">
            <label htmlFor="cantidad">Cantidad:</label>
            <div className="selector-cantidad">
              <button 
                className="btn-cantidad" 
                onClick={disminuirCantidad}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                min="1"
                max="10"
                onChange={(e) => {
                  const value = Math.min(Math.max(1, Number(e.target.value)), 10)
                  setCantidad(value || 1)
                }}
              />
              <button 
                className="btn-cantidad" 
                onClick={aumentarCantidad}
                disabled={cantidad >= 10}
              >
                +
              </button>
            </div>
          </div>

          <div className="acciones-producto">
            <button 
              className="btn btn-primario" 
              onClick={handleAgregarCarrito}
            >
              Agregar al Carrito
            </button>
            <button 
              className="btn btn-secundario"
              onClick={handleComprarAhora}
            >
              Comprar Ahora
            </button>
          </div>

          <div className="garantia">
            <p>✅ Envío gratis en compras superiores a $100.000</p>
            <p>✅ Garantía de 12 meses</p>
            <p>✅ Devolución en 30 días</p>
          </div>
        </div>
      </section>

      {productosRelacionados.length > 0 && (
        <section className="productos-relacionados">
          <h2>Productos relacionados</h2>
          <div className="contenedor_productos mini">
            {productosRelacionados.map(productoRel => (
              <ProductCard
                key={productoRel.id}
                producto={productoRel}
                onAgregarCarrito={agregarAlCarrito}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetail