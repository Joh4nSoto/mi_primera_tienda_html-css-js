import { Link } from 'react-router-dom'

const ProductCard = ({ producto, onAgregarCarrito }) => {
  const handleAgregarCarrito = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAgregarCarrito(producto)
    console.log(producto.imagen)
  }

  return (
    <article className="producto" data-categoria={producto.categoria}>
      <div className="producto-imagen-container">
        <img
          className="producto_img"
          src={producto.imagen.startsWith('/') ? producto.imagen : '/' + producto.imagen}
          alt={producto.nombre}
          loading="lazy"
        />
        <button 
          className="btn-agregar-rapido"
          onClick={handleAgregarCarrito}
          title="Agregar al carrito"
        >
          +
        </button>
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="precio">
          <strong>${producto.precio.toLocaleString('es-CL')}</strong>
        </p>
        <p className="descripcion">
          {producto.descripcion.substring(0, 80)}...
        </p>
        <div className="producto-acciones">
          <Link to={`/producto/${producto.id}`} className="btn btn-detalles">
            Ver Detalles
          </Link>
          <button 
            className="btn btn-carrito"
            onClick={handleAgregarCarrito}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard