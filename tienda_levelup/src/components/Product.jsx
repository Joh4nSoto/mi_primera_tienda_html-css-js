// components/Product.jsx
import { Link } from 'react-router-dom';

const Product = ({ producto, agregarAlCarrito }) => {
  return (
    <article className="producto" data-categoria={producto.categoria} data-precio={producto.precio}>
      <img className="producto_img" src={producto.imagen} alt={producto.nombre} />
      <div>
        <h3>{producto.nombre}</h3>
        <p className="precio"><strong>${producto.precio.toLocaleString('es-CL')}</strong></p>
        <p className="descripcion">{producto.descripcion.substring(0, 80)}...</p>
        <Link to={`/producto/${producto.id}`} className="btn">Ver Detalles</Link>
        <button 
          className="btn" 
          onClick={() => agregarAlCarrito(producto, 1)}
          style={{ marginLeft: '10px' }}
        >
          Agregar al Carrito
        </button>
      </div>
    </article>
  );
};

export default Product;