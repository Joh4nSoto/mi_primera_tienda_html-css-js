# Mi Primera Tienda (HTML + CSS + JS)

Proyecto muy simple para la evaluación formativa. Incluye:
- **index.html** con estructura semántica (`header`, `nav`, `main`, `section`, `article`, `footer`), imágenes, video embebido y botones.
- **registro.html** con formulario y validación con **JavaScript**.
- **login.html** con formulario y validación con **JavaScript**.
- **styles.css** (hoja de estilos externa, aplicada en todas las páginas).
- **app.js** (validaciones y acciones de demo).

## Cómo usar
1. Descarga y descomprime el proyecto.
2. Abre `index.html` en tu navegador.
3. Navega con el menú: **Inicio**, **Registrarse**, **Ingresar**.
4. Prueba los formularios. Si un dato no cumple lo solicitado, verás un mensaje de error claro.
5. Los botones de "Comprar" muestran una alerta de **demo** para evidenciar funcionamiento.

## Sugerencias de commit (Git)
```bash
git init
git add .
git commit -m "Estructura base: index, registro, login, CSS y JS"
git branch -M main
# Crea un repo vacío en GitHub y luego:
git remote add origin https://github.com/USUARIO/mi-primera-tienda.git
git push -u origin main
```

> Consejo: haz commits pequeños y con mensajes claros (ej.: `feat: validación de registro`, `style: mejorar botones`).

## Nota
Este proyecto es educativo y de demostración. No contiene lógica real de compra ni almacenamiento de datos.
