import { Link } from 'react-router-dom'

const Cart = ({ 
  carrito, 
  eliminarDelCarrito, 
  actualizarCantidad, 
  vaciarCarrito,
  getTotalCarrito 
}) => {
  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>¡Descubre nuestros productos y encuentra algo especial!</p>
        <Link to="/" className="btn btn-primario">
          Continuar comprando
        </Link>
      </div>
    )
  }

  return (
    <section className="carrito">
      <div className="carrito-header">
        <h2>Tu Carrito de Compras</h2>
        <button 
          className="btn btn-secundario"
          onClick={vaciarCarrito}
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="carrito-items">
        {carrito.map(item => (
          <div key={item.id} className="carrito-item">
            <img 
              src={item.imagen} 
              alt={item.nombre}
              className="carrito-item-imagen"
            />
            <div className="carrito-item-info">
              <h3>{item.nombre}</h3>
              <p className="carrito-item-precio">
                ${item.precio.toLocaleString('es-CL')}
              </p>
            </div>
            <div className="carrito-item-cantidad">
              <button
                onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                disabled={item.cantidad <= 1}
              >
                -
              </button>
              <span>{item.cantidad}</span>
              <button
                onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                disabled={item.cantidad >= 10}
              >
                +
              </button>
            </div>
            <div className="carrito-item-subtotal">
              ${(item.precio * item.cantidad).toLocaleString('es-CL')}
            </div>
            <button
              className="carrito-item-eliminar"
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-total">
        <div className="carrito-resumen">
          <h3>Resumen de compra</h3>
          <div className="carrito-total-linea">
            <span>Subtotal:</span>
            <span>${getTotalCarrito().toLocaleString('es-CL')}</span>
          </div>
          <div className="carrito-total-linea">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="carrito-total-linea total">
            <span>Total:</span>
            <span>${getTotalCarrito().toLocaleString('es-CL')}</span>
          </div>
          <button className="btn btn-primario btn-comprar">
            Proceder al pago
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart