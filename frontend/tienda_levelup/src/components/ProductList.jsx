// components/ProductList.jsx
import Product from './Product';

const ProductList = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="contenedor_productos" id="contenedor-productos">
      {productos.map(producto => (
        <Product key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
      ))}
    </div>
  );
};

export default ProductList;