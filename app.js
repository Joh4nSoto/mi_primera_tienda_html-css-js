// app.js: validaciones sencillas para formularios y funcionalidad de carrito
(function(){
  // ===== BASE DE DATOS DE PRODUCTOS =====
  const productos = [
    {
      id: 'mouse-black-001',
      nombre: 'Mouse Wireless Black',
      precio: 179990,
      imagen: 'Imagenes/mouse-gamerBlack.jpeg',
      categoria: 'perifericos',
      descripcion: 'Mouse gamer wireless con sensor de alta precisión, 6 botones programables, iluminación RGB personalizable y diseño ergonómico para largas sesiones de juego.',
      especificaciones: [
        'DPI: 16000',
        'Polling Rate: 1000Hz',
        'Conectividad: Wireless 2.4GHz',
        'Batería: Hasta 50 horas de uso',
        'Peso: 85g'
      ]
    },
    {
      id: 'monitor-ekron-002',
      nombre: 'Monitor Plano EKRON',
      precio: 65900,
      imagen: 'Imagenes/Monitor-Ekron.jpeg',
      categoria: 'monitores',
      descripcion: 'Monitor Plano EKRON 24 Pulgadas FULLHD con tecnología IPS, tiempo de respuesta de 1ms y frecuencia de actualización de 75Hz.',
      especificaciones: [
        'Tamaño: 24"',
        'Resolución: 1920x1080 Full HD',
        'Tipo: IPS',
        'Tiempo de respuesta: 1ms',
        'Frecuencia: 75Hz'
      ]
    },
    {
      id: 'monitor-curvo-003',
      nombre: 'Monitor Curvo Gamemax',
      precio: 159900,
      imagen: 'Imagenes/Monitor-Curvo.jpeg',
      categoria: 'monitores',
      descripcion: 'Monitor curvo gamemax 23.6" con 200HZ de frecuencia de actualización, resolución 1080p y tecnología FreeSync.',
      especificaciones: [
        'Tamaño: 23.6"',
        'Resolución: 1920x1080 Full HD',
        'Curvatura: 1500R',
        'Tiempo de respuesta: 1ms',
        'Frecuencia: 200Hz'
      ]
    },
    {
      id: 'silla-whiteblue-004',
      nombre: 'Silla Gamer White/Baby Blue',
      precio: 199900,
      imagen: 'Imagenes/SillaGamer-WhiteBabyBlue.jpeg',
      categoria: 'sillas',
      descripcion: 'Silla gamer profesional white/baby blue con soporte lumbar, reposacabezas ajustable y base de metal resistente.',
      especificaciones: [
        'Material: Cuero sintético',
        'Base: Metal resistente',
        'Apoyabrazos: Ajustables',
        'Soporte lumbar: Incluido',
        'Mecanismo: Giratorio 360°'
      ]
    },
    {
      id: 'silla-red-005',
      nombre: 'Silla Gamer Vertagear Red',
      precio: 370900,
      imagen: 'Imagenes/sillagamer-red.png',
      categoria: 'sillas',
      descripcion: 'Silla gamer profesional VERTAGEAR RED con diseño ergonómico, materiales premium y ajustes múltiples.',
      especificaciones: [
        'Material: Cuero premium',
        'Base: Aluminio',
        'Apoyabrazos: 4D ajustables',
        'Soporte lumbar: Ajustable',
        'Inclinación: 90°-180°'
      ]
    },
    {
      id: 'audifono-kitty-006',
      nombre: 'Audífonos Gamer Kitty',
      precio: 83990,
      imagen: 'Imagenes/Audifono-Kitty.jpeg',
      categoria: 'audio',
      descripcion: 'Audífono gamer kitty con iluminación RGB, micrófono retráctil y sonido surround 7.1 virtual.',
      especificaciones: [
        'Conectividad: USB',
        'Micrófono: Retráctil con cancelación de ruido',
        'Iluminación: RGB personalizable',
        'Sonido: Surround 7.1 virtual',
        'Compatibilidad: PC, PS4, PS5, Xbox'
      ]
    },
    {
      id: 'audifono-blackgreen-007',
      nombre: 'Audífonos Gamer Black/Green',
      precio: 45990,
      imagen: 'Imagenes/Audifono-black-green.jpeg',
      categoria: 'audio',
      descripcion: 'Audífono gamer black/green con almohadillas memory foam, micrófono flexible y control de volumen integrado.',
      especificaciones: [
        'Conectividad: 3.5mm',
        'Micrófono: Flexible omnidireccional',
        'Almohadillas: Memory foam',
        'Control: Volumen integrado',
        'Compatibilidad: Multiplataforma'
      ]
    },
    {
      id: 'teclado-blackwidow-008',
      nombre: 'Teclado Gamer Blackwidow',
      precio: 172900,
      imagen: 'Imagenes/teclado-gamer-blackwidow.jpg',
      categoria: 'teclados',
      descripcion: 'Teclado gamer blackwidow con switches mecánicos, iluminación Chroma RGB y reposamuñecas magnético.',
      especificaciones: [
        'Tipo: Mecánico',
        'Switches: Razer Green',
        'Iluminación: Chroma RGB',
        'Teclas: Anti-ghosting',
        'Conexión: USB'
      ]
    },
    {
      id: 'mouse-white-009',
      nombre: 'Mouse Gamer White',
      precio: 145990,
      imagen: 'Imagenes/Mouse-GamerWhite.jpeg',
      categoria: 'perifericos',
      descripcion: 'Mouse gamer white con sensor óptico de 12000 DPI, diseño ambidiestro y 8 botones programables.',
      especificaciones: [
        'DPI: 12000',
        'Botones: 8 programables',
        'Diseño: Ambidiestro',
        'Sensor: Óptico de precisión',
        'Peso: 78g'
      ]
    },
    {
      id: 'teclado-royalwhite-010',
      nombre: 'Teclado Mecánico Royal White',
      precio: 59900,
      imagen: 'Imagenes/teclado-mecanico-royalwhite.jpg',
      categoria: 'teclados',
      descripcion: 'Teclado mecánico white royal con switches outemu blue, iluminación RGB y construcción de aluminio.',
      especificaciones: [
        'Tipo: Mecánico 60%',
        'Switches: Outemu Blue',
        'Iluminación: RGB direccionable',
        'Construcción: Aluminio',
        'Conexión: USB-C'
      ]
    },
    {
      id: 'control-pro2-011',
      nombre: 'Control Inalámbrico PRO2',
      precio: 54900,
      imagen: 'Imagenes/control-inalambrico.png',
      categoria: 'perifericos',
      descripcion: 'Control inalámbrico PRO2 con vibración háptica, botones traseros programables y batería de larga duración.',
      especificaciones: [
        'Conectividad: Bluetooth/USB',
        'Batería: 20 horas',
        'Botones: Traseros programables',
        'Retroalimentación: Vibración háptica',
        'Compatibilidad: PC, Switch, Android'
      ]
    },
    {
      id: 'parlante-bluetooth-012',
      nombre: 'Parlantes Bluetooth',
      precio: 79900,
      imagen: 'Imagenes/parlante-bluetooth.png',
      categoria: 'audio',
      descripcion: 'Parlantes bluetooth con sonido estéreo, batería de 12 horas y resistencia al agua IPX5.',
      especificaciones: [
        'Potencia: 20W',
        'Batería: 12 horas',
        'Resistencia: IPX5',
        'Conectividad: Bluetooth 5.0',
        'Entrada: AUX'
      ]
    },
    {
      id: 'volante-logitech-013',
      nombre: 'Volante Logitech',
      precio: 369900,
      imagen: 'Imagenes/volante-logitech.png',
      categoria: 'perifericos',
      descripcion: 'Volante Logitech con force feedback de doble motor, pedales separados y shifters detrás del volante.',
      especificaciones: [
        'Force Feedback: Doble motor',
        'Rotación: 900°',
        'Pedales: Separados con resistencia progresiva',
        'Shifters: Paletas detrás del volante',
        'Compatibilidad: PC, PS4, PS5'
      ]
    },
    {
      id: 'pc-black-1tb-014',
      nombre: 'PC Escritorio Black 1TB',
      precio: 1599900,
      imagen: 'Imagenes/pc-escritorio-black1TB.png',
      categoria: 'pc',
      descripcion: 'PC de escritorio negro con 32GB RAM, 1TB SSD, procesador Intel i7 y tarjeta gráfica RTX 4070.',
      especificaciones: [
        'Procesador: Intel i7-13700K',
        'RAM: 32GB DDR5',
        'Almacenamiento: 1TB SSD NVMe',
        'Gràfica: RTX 4070 12GB',
        'Sistema: Windows 11 Pro'
      ]
    }
  ];

  // ===== CARRITO DE COMPRAS =====
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contadorCarrito = document.getElementById('contador-carrito');
  
  // Actualizar contador de carrito
  function actualizarContadorCarrito() {
    if (contadorCarrito) {
      const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
      contadorCarrito.textContent = totalItems;
    }
  }
  
  // Guardar carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
  }
  
  // Agregar producto al carrito
  window.agregarAlCarrito = function(producto, cantidad = 1) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({...producto, cantidad});
    }
    
    guardarCarrito();
    alert(`¡${producto.nombre} agregado al carrito!`);
  };
  
  // ===== SISTEMA DE CATEGORÍAS Y FILTROS =====
  let categoriaActual = 'todos';
  let precioMaximo = 2000000;
  
  // Cargar productos en la página principal
  function cargarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    // Filtrar productos por categoría y precio
    const productosFiltrados = productos.filter(producto => {
      const cumpleCategoria = categoriaActual === 'todos' || producto.categoria === categoriaActual;
      const cumplePrecio = producto.precio <= precioMaximo;
      return cumpleCategoria && cumplePrecio;
    });
    
    // Generar HTML de los productos
    contenedor.innerHTML = productosFiltrados.map(producto => `
      <article class="producto" data-categoria="${producto.categoria}" data-precio="${producto.precio}">
        <img class="producto_img" src="${producto.imagen}" alt="${producto.nombre}" />
        <div>
          <h3>${producto.nombre}</h3>
          <p class="precio"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>
          <p class="descripcion">${producto.descripcion.substring(0, 80)}...</p>
          <a href="producto.html?id=${producto.id}" class="btn">Ver Detalles</a>
        </div>
      </article>
    `).join('');
  }
  
  // Inicializar sistema de categorías
  function inicializarCategorias() {
    const enlacesCategorias = document.querySelectorAll('.lista-categorias a');
    enlacesCategorias.forEach(enlace => {
      enlace.addEventListener('click', (e) => {
        e.preventDefault();
        categoriaActual = enlace.getAttribute('data-categoria');
        
        // Actualizar clase activa
        enlacesCategorias.forEach(a => a.classList.remove('activa'));
        enlace.classList.add('activa');
        
        // Recargar productos
        cargarProductos();
      });
    });
  }
  
  // Inicializar filtro de precios
  function inicializarFiltroPrecio() {
    const rangoPrecio = document.getElementById('rango-precio');
    const precioMaxElemento = document.getElementById('precio-maximo');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpiar = document.getElementById('btn-limpiar');
    
    if (rangoPrecio && precioMaxElemento) {
      // Actualizar visualización del precio máximo
      rangoPrecio.addEventListener('input', () => {
        precioMaxElemento.textContent = `$${parseInt(rangoPrecio.value).toLocaleString('es-CL')}`;
      });
      
      // Aplicar filtros
      if (btnFiltrar) {
        btnFiltrar.addEventListener('click', () => {
          precioMaximo = parseInt(rangoPrecio.value);
          cargarProductos();
        });
      }
      
      // Limpiar filtros
      if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
          precioMaximo = 2000000;
          rangoPrecio.value = 2000000;
          precioMaxElemento.textContent = '$2.000.000';
          categoriaActual = 'todos';
          
          // Restablecer categoría activa
          document.querySelectorAll('.lista-categorias a').forEach(a => {
            a.classList.remove('activa');
            if (a.getAttribute('data-categoria') === 'todos') {
              a.classList.add('activa');
            }
          });
          
          cargarProductos();
        });
      }
    }
  }
  
  // ===== PÁGINA DE PRODUCTO INDIVIDUAL =====
  function cargarPaginaProducto() {
    // Obtener ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      const producto = productos.find(p => p.id === productId);
      
      if (producto) {
        // Actualizar todos los elementos de la página con la información del producto
        document.title = `${producto.nombre} - Mi Primera Tienda`;
        
        const imagenPrincipal = document.getElementById('imagen-principal');
        if (imagenPrincipal) imagenPrincipal.src = producto.imagen;
        if (imagenPrincipal) imagenPrincipal.alt = producto.nombre;
        
        const nombreProducto = document.querySelector('.info-producto h1');
        if (nombreProducto) nombreProducto.textContent = producto.nombre;
        
        const precioProducto = document.querySelector('.info-producto .precio');
        if (precioProducto) precioProducto.innerHTML = `<strong>$${producto.precio.toLocaleString('es-CL')}</strong>`;
        
        const descripcionProducto = document.querySelector('.descripcion-detalle');
        if (descripcionProducto) descripcionProducto.textContent = producto.descripcion;
        
        const especificacionesLista = document.querySelector('.especificaciones ul');
        if (especificacionesLista) {
          especificacionesLista.innerHTML = producto.especificaciones.map(esp => `<li>${esp}</li>`).join('');
        }
        
        // Configurar botón de agregar al carrito
        const btnAgregarCarrito = document.getElementById('agregar-carrito');
        if (btnAgregarCarrito) {
          btnAgregarCarrito.addEventListener('click', () => {
            const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
            agregarAlCarrito(producto, cantidad);
          });
        }
        
        // Configurar botón de comprar ahora
        const btnComprarAhora = document.getElementById('comprar-ahora');
        if (btnComprarAhora) {
          btnComprarAhora.addEventListener('click', () => {
            const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
            agregarAlCarrito(producto, cantidad);
            // Redirigir al carrito (futura implementación)
            alert('Producto agregado. Serás redirigido al carrito.');
          });
        }
      }
    }
  }
  
  // ===== INICIALIZACIÓN =====
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar contador de carrito
    actualizarContadorCarrito();
    
    // Cargar productos en la página principal
    cargarProductos();
    
    // Inicializar sistema de categorías
    inicializarCategorias();
    
    // Inicializar filtro de precios
    inicializarFiltroPrecio();
    
    // Cargar página de producto individual si estamos en esa página
    if (window.location.pathname.includes('producto.html')) {
      cargarPaginaProducto();
    }
    
    // Botones de "Comprar" en modo demo
    document.querySelectorAll('[data-demo-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Demo: este botón muestra que el elemento funciona. Aún no hay lógica de compra.');
      });
    });
  });

  // Utilidad: muestra un mensaje de error en un <small> por id
  function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg || '';
  }

  // -------- Validación Registro --------
  const formRegistro = document.getElementById('formRegistro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
      e.preventDefault(); // evitamos envío por defecto para validar

      // Obtener valores
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmar = document.getElementById('confirmar').value;
      const pais = document.getElementById('pais').value.trim();
      const terminos = document.getElementById('terminos').checked;

      // Reset de mensajes
      setError('err-nombre', '');
      setError('err-email', '');
      setError('err-password', '');
      setError('err-confirmar', '');
      setError('err-pais', '');
      setError('err-terminos', '');

      let ok = true;

      if (nombre.length < 3) {
        setError('err-nombre', 'Ingresa tu nombre (mínimo 3 caracteres).');
        ok = false;
      }

      if (!email.includes('@') || !email.includes('.')) {
        setError('err-email', 'Ingresa un correo válido (ej: nombre@dominio.com).');
        ok = false;
      }

      if (password.length < 8) {
        setError('err-password', 'La contraseña debe tener al menos 8 caracteres.');
        ok = false;
      }

      if (confirmar !== password) {
        setError('err-confirmar', 'Las contraseñas no coinciden.');
        ok = false;
      }

      if (!pais) {
        setError('err-pais', 'Selecciona o escribe tu país.');
        ok = false;
      }

      if (!terminos) {
        setError('err-terminos', 'Debes aceptar los términos y condiciones.');
        ok = false;
      }

      if (ok) {
        alert('Registro exitoso. ¡Bienvenido/a!');
        formRegistro.reset();
      }
    });
  }

  // -------- Validación Login --------
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;

      setError('err-login-email', '');
      setError('err-login-password', '');

      let ok = true;
      if (!email.includes('@') || !email.includes('.')) {
        setError('err-login-email', 'Correo no válido.');
        ok = false;
      }
      if (pass.length < 8) {
        setError('err-login-password', 'La contraseña debe tener al menos 8 caracteres.');
        ok = false;
      }

      if (ok) {
        alert('Ingreso exitoso (demo).');
        formLogin.reset();
      }
    });
  }
})();