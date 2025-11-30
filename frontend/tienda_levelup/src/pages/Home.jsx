import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'

const Home = ({ productos, agregarAlCarrito }) => {
  const [categoriaActual, setCategoriaActual] = useState('todos')
  const [precioMaximo, setPrecioMaximo] = useState(2000000)
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      const cumpleCategoria = categoriaActual === 'todos' || producto.categoria === categoriaActual
      const cumplePrecio = producto.precio <= precioMaximo
      const cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      
      return cumpleCategoria && cumplePrecio && cumpleBusqueda
    })
  }, [productos, categoriaActual, precioMaximo, busqueda])

  const handleLimpiarFiltros = () => {
    setCategoriaActual('todos')
    setPrecioMaximo(2000000)
    setBusqueda('')
  }

  return (
    <>
      {/* Buscador */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>

      <section aria-labelledby="filtros-titulo">
        <h2 id="filtros-titulo" className="sr-only">Filtros y categorías</h2>
        <Filters 
          categoriaActual={categoriaActual}
          setCategoriaActual={setCategoriaActual}
          precioMaximo={precioMaximo}
          setPrecioMaximo={setPrecioMaximo}
          onLimpiarFiltros={handleLimpiarFiltros}
        />
      </section>

      <section aria-labelledby="productos-titulo">
        <div className="productos-header">
          <h2 id="productos-titulo">
            Productos {categoriaActual !== 'todos' ? `- ${categoriaActual}` : 'destacados'}
          </h2>
          <span className="contador-productos">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {productosFiltrados.length === 0 ? (
          <div className="sin-resultados">
            <p>No se encontraron productos con los filtros aplicados.</p>
            <button onClick={handleLimpiarFiltros} className="btn">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="contenedor_productos" id="contenedor-productos">
            {productosFiltrados.map(producto => (
              <ProductCard 
                key={producto.id}
                producto={producto}
                onAgregarCarrito={agregarAlCarrito}
              />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="video-titulo">
        <h2 id="video-titulo">Video: Notebook Gamer Asus A15!!</h2>
        <div className="video-responsivo">
          <iframe
            src="https://www.youtube.com/embed/5Cx2UdL0LT0"
            title="Asus A15"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
          </iframe>
        </div>
      </section>
    </>
  )
}

export default Home