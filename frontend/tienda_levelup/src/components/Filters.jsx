const categorias = [
  { id: 'todos', nombre: 'Todos los productos' },
  { id: 'perifericos', nombre: 'Periféricos' },
  { id: 'sillas', nombre: 'Sillas Gamer' },
  { id: 'monitores', nombre: 'Monitores' },
  { id: 'audio', nombre: 'Audio' },
  { id: 'teclados', nombre: 'Teclados' },
  { id: 'pc', nombre: 'PC Escritorio' },
]

const Filters = ({ 
  categoriaActual, 
  setCategoriaActual, 
  precioMaximo, 
  setPrecioMaximo,
  onLimpiarFiltros 
}) => {
  return (
    <div className="filtros-categorias">
      <div className="categorias">
        <h3>Categorías</h3>
        <ul className="lista-categorias">
          {categorias.map(cat => (
            <li key={cat.id}>
              <button
                className={`categoria-btn ${categoriaActual === cat.id ? 'activa' : ''}`}
                onClick={() => setCategoriaActual(cat.id)}
              >
                {cat.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="filtros">
        <h3>Filtros</h3>
        <div className="filtro-precio">
          <label htmlFor="rango-precio">
            Precio máximo: ${precioMaximo.toLocaleString('es-CL')}
          </label>
          <input
            type="range"
            id="rango-precio"
            className="rango-precio"
            min="0"
            max="2000000"
            step="10000"
            value={precioMaximo}
            onChange={(e) => setPrecioMaximo(Number(e.target.value))}
          />
          <div className="precio-minmax">
            <span>$0</span>
            <span>$2.000.000</span>
          </div>
        </div>
        
        <div className="filtros-acciones">
          <button 
            className="btn-limpiar" 
            onClick={onLimpiarFiltros}
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters