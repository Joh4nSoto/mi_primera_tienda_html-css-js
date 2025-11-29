# 🎮 Tienda LEVEL-UP - E-commerce Gamer

Una moderna tienda online especializada en accesorios y equipos gaming
desarrollada con **React + Spring Boot**.

## 🚀 Características

-   **Frontend:** React + Vite + CSS moderno\
-   **Backend:** Spring Boot + REST API\
-   **Base de datos:** MySQL\
-   Carrito de compras con persistencia en `localStorage`\
-   Filtros por categoría y precio\
-   Diseño responsive y accesible\
-   Gestión de productos desde base de datos

## 📋 Prerrequisitos

-   Node.js (v16 o superior)\
-   Java JDK (v11 o superior)\
-   XAMPP o Laragon\
-   MySQL (incluido en XAMPP/Laragon)

## 🛠️ Instalación y Configuración

### 1. Configuración de la Base de Datos

``` bash
# 1. Iniciar XAMPP/Laragon
# 2. Activar MySQL (puerto 3306)

# 3. Crear la base de datos
mysql -u root -p
CREATE DATABASE db_levelup;
USE db_levelup;

# 4. Importar el esquema (producto.sql)
SOURCE ruta/al/archivo/producto.sql;
```

### 2. Configuración del Backend (Spring Boot)

``` bash
cd levelup-backend

# Verificar application.properties
src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/db_levelup
spring.datasource.username=root
spring.datasource.password=

# Ejecutar el backend
./mvnw spring-boot:run
# o
mvn spring-boot:run
```

### 3. Configuración del Frontend (React)

``` bash
cd levelup-frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

    levelup-tienda/
    ├── backend/
    │   ├── src/
    │   ├── pom.xml
    │   └── application.properties
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── data/
    │   ├── package.json
    │   └── vite.config.js
    └── database/
        └── producto.sql

## 🗃️ Esquema de Base de Datos

``` sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(500),
    categoria VARCHAR(100),
    descripcion TEXT,
    especificaciones JSON
);
```

## 🚀 Ejecución en Orden

### Paso 1: Base de Datos

``` bash
# Iniciar XAMPP/Laragon
# Activar MySQL
# Verificar que db_levelup esté creada y poblada
```

### Paso 2: Backend

``` bash
cd backend
mvn spring-boot:run
# Backend en http://localhost:8080
```

### Paso 3: Frontend

``` bash
cd frontend
npm run dev
# Frontend en http://localhost:5173
```

## ✅ Verificación

-   Base de datos: http://localhost/phpmyadmin → db_levelup → productos\
-   Backend: http://localhost:8080/api/v1/productos\
-   Frontend: http://localhost:5173

## 🎯 Endpoints de la API

  Método   Endpoint                 Descripción
  -------- ------------------------ -----------------------------
  GET      /api/v1/productos        Obtener todos los productos
  GET      /api/v1/productos/{id}   Obtener producto por ID
  POST     /api/v1/productos        Crear nuevo producto
  PUT      /api/v1/productos/{id}   Actualizar producto
  DELETE   /api/v1/productos/{id}   Eliminar producto

## 🎨 Frontend

-   Página principal con grid de productos\
-   Filtros por categoría y precio\
-   Carrito persistente\
-   Diseño responsive\
-   React Router (SPA)\
-   Páginas: Home, Detalle, Carrito, Login, Registro

## 🐛 Solución de Problemas

### Error de CORS

``` java
@CrossOrigin(origins = "http://localhost:5173")
```

### MySQL no inicia

-   Verificar puerto 3306\
-   Revisar logs de XAMPP\
-   Reiniciar servicios

### Productos no cargan

-   Revisar conexión BD\
-   Revisar consola del navegador\
-   Probar endpoint en backend

### Frontend no carga

``` bash
rm -rf node_modules
npm install
npm run dev
```

## 👥 Desarrollo

**Tecnologías:** React, Vite, Spring Boot, JPA, MySQL, Maven, Node.js

------------------------------------------------------------------------

¡LEVEL-UP está lista para usar! 🎮✨


Desarrolladores:
**Johan Soto**
**Marjorie Hernandez**
**Lisett Granadillo**
