# language: es
Característica: Autenticación de Usuario
  Como usuario registrado
  Quiero poder iniciar sesión en el sitio
  Para acceder a mis beneficios y realizar compras

  Escenario: Login exitoso con credenciales válidas
    Dado que el usuario tiene una cuenta registrada
    Cuando el usuario ingresa un email válido
    Y el usuario ingresa una contraseña válida
    Y el usuario hace clic en el botón "Ingresar"
    Entonces debería mostrar un mensaje de ingreso exitoso
    Y el formulario debería limpiarse

  Escenario: Login fallido con email inválido
    Dado que el usuario está en la página de login
    Cuando el usuario ingresa un email inválido "usuarioinvalido"
    Y el usuario ingresa una contraseña válida
    Y el usuario hace clic en el botón "Ingresar"
    Entonces debería mostrar el mensaje de error "Correo no válido."
    Y no debería permitir el ingreso

  Escenario: Login fallido con contraseña corta
    Dado que el usuario está en la página de login
    Cuando el usuario ingresa un email válido
    Y el usuario ingresa una contraseña de 7 caracteres
    Y el usuario hace clic en el botón "Ingresar"
    Entonces debería mostrar el mensaje de error "La contraseña debe tener al menos 8 caracteres."
    Y no debería permitir el ingreso

  Escenario: Navegación a registro desde login
    Dado que el usuario está en la página de login
    Cuando el usuario hace clic en "Regístrate aquí"
    Entonces debería redirigir a la página de registro