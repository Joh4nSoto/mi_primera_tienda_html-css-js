const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que el usuario no tiene productos en el carrito', async function () {
  this.carrito = [];
});

Given('que el usuario tiene productos en el carrito', async function () {
  this.carrito = [
    {
      id: 1,
      nombre: 'Producto de prueba',
      precio: 10000,
      cantidad: 1,
      imagen: 'imagen.jpg'
    }
  ];
});

Given('que el usuario tiene un producto en el carrito con cantidad {int}', async function (cantidad) {
  this.carrito = [
    {
      id: 1,
      nombre: 'Producto de prueba',
      precio: 10000,
      cantidad: cantidad,
      imagen: 'imagen.jpg'
    }
  ];
});

When('el usuario accede a la página del carrito', async function () {
  // Navegar a la página del carrito
  await this.page.goto('/cart');
});

When('el usuario hace clic en el botón "+"', async function () {
  const plusButton = this.page.locator('button:has-text("+")').first();
  await plusButton.click();
});

When('el usuario hace clic en "Vaciar Carrito"', async function () {
  const vaciarButton = this.page.locator('button:has-text("Vaciar Carrito")');
  await vaciarButton.click();
});

Then('debería ver el mensaje {string}', async function (mensaje) {
  const mensajeElement = this.page.locator(`text=${mensaje}`);
  await expect(mensajeElement).toBeVisible();
});

Then('debería ver un botón para {string}', async function (textoBoton) {
  const boton = this.page.locator(`button:has-text("${textoBoton}")`);
  await expect(boton).toBeVisible();
});

Then('debería ver la lista de productos agregados', async function () {
  const productos = this.page.locator('.carrito-item');
  await expect(productos).toHaveCount(this.carrito.length);
});

Then('debería poder ver el total de la compra', async function () {
  const total = this.page.locator('.carrito-total-linea.total');
  await expect(total).toBeVisible();
});

Then('debería poder eliminar un producto del carrito', async function () {
  const eliminarButton = this.page.locator('.carrito-item-eliminar').first();
  await expect(eliminarButton).toBeVisible();
});

Then('la cantidad del producto debería aumentar a {int}', async function (cantidadEsperada) {
  const cantidadElement = this.page.locator('.carrito-item-cantidad span').first();
  await expect(cantidadElement).toHaveText(cantidadEsperada.toString());
});

Then('el subtotal debería actualizarse correctamente', async function () {
  const subtotalElement = this.page.locator('.carrito-item-subtotal').first();
  const precio = this.carrito[0].precio;
  const cantidad = this.carrito[0].cantidad + 1; // Porque hicimos click en +
  const subtotalEsperado = `$${(precio * cantidad).toLocaleString('es-CL')}`;
  
  await expect(subtotalElement).toHaveText(subtotalEsperado);
});

Then('todos los productos deberían eliminarse del carrito', async function () {
  const productos = this.page.locator('.carrito-item');
  await expect(productos).toHaveCount(0);
});

Then('debería mostrarse el carrito vacío', async function () {
  const carritoVacio = this.page.locator('.carrito-vacio');
  await expect(carritoVacio).toBeVisible();
});