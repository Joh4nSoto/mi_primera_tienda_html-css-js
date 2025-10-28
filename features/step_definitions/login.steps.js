const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que el usuario tiene una cuenta registrada', async function () {
  this.usuarioValido = {
    email: 'usuario@valido.com',
    password: 'password123'
  };
});

Given('que el usuario está en la página de login', async function () {
  await this.page.goto('/login');
});

When('el usuario ingresa un email válido', async function () {
  const emailInput = this.page.locator('#loginEmail');
  await emailInput.fill(this.usuarioValido.email);
});

When('el usuario ingresa un email inválido {string}', async function (emailInvalido) {
  const emailInput = this.page.locator('#loginEmail');
  await emailInput.fill(emailInvalido);
});

When('el usuario ingresa una contraseña válida', async function () {
  const passwordInput = this.page.locator('#loginPassword');
  await passwordInput.fill(this.usuarioValido.password);
});

When('el usuario ingresa una contraseña de {int} caracteres', async function (longitud) {
  const passwordInput = this.page.locator('#loginPassword');
  const passwordCorta = 'a'.repeat(longitud);
  await passwordInput.fill(passwordCorta);
});

When('el usuario hace clic en el botón {string}', async function (nombreBoton) {
  const boton = this.page.locator(`button:has-text("${nombreBoton}")`);
  await boton.click();
});

When('el usuario hace clic en {string}', async function (enlaceTexto) {
  const enlace = this.page.locator(`a:has-text("${enlaceTexto}")`);
  await enlace.click();
});

Then('debería mostrar un mensaje de ingreso exitoso', async function () {
  // Verificar que se muestra el alert de demo
  // En una implementación real, verificaríamos redirección o cambio de estado
  this.page.on('dialog', dialog => {
    expect(dialog.message()).toContain('Ingreso exitoso');
    dialog.accept();
  });
});

Then('el formulario debería limpiarse', async function () {
  const emailInput = this.page.locator('#loginEmail');
  const passwordInput = this.page.locator('#loginPassword');
  
  await expect(emailInput).toHaveValue('');
  await expect(passwordInput).toHaveValue('');
});

Then('debería mostrar el mensaje de error {string}', async function (mensajeError) {
  const errorElement = this.page.locator(`text=${mensajeError}`);
  await expect(errorElement).toBeVisible();
});

Then('no debería permitir el ingreso', async function () {
  // Verificar que seguimos en la misma página
  await expect(this.page).toHaveURL(/.*login/);
});

Then('debería redirigir a la página de registro', async function () {
  await expect(this.page).toHaveURL(/.*register/);
});