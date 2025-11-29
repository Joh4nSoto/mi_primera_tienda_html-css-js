// src/services/productosService.js
const API_BASE_URL = 'http://localhost:8080/api/v1/productos';

export const productosService = {
  async obtenerProductos() {
    try {
      console.log('🔄 Conectando a la API:', API_BASE_URL);
      
      const response = await fetch(API_BASE_URL, {
        // Agregar timeout para que no se quede colgado
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const productos = await response.json();
      console.log('✅ Productos cargados:', productos.length);
      
      // Mapear los productos correctamente
      return productos.map(producto => ({
        id: producto.id?.toString(),
        nombre: producto.nombre || 'Producto sin nombre',
        precio: producto.precio || 0,
        imagen: producto.imagen || 'Imagenes/placeholder.jpg',
        categoria: producto.categoria || 'sin-categoria',
        descripcion: producto.descripcion || 'Sin descripción disponible',
        especificaciones: producto.especificaciones || []
      }));
      
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      console.log('🔄 Continuando con array vacío...');
      // Siempre retornar array vacío en caso de error
      return [];
    }
  }
};