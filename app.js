// app.js: validaciones sencillas para formularios
(function(){
  // Botones de "Comprar" en modo demo
  document.querySelectorAll('[data-demo-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Demo: este botón muestra que el elemento funciona. Aún no hay lógica de compra.');
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