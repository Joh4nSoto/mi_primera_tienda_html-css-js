# language: es
Característica: Gestión del Carrito de Compras
  Como usuario
  Quiero poder gestionar los productos en mi carrito
  Para realizar compras de manera eficiente

  Escenario: Ver carrito vacío
    Dado que el usuario no tiene productos en el carrito
    Cuando el usuario accede a la página del carrito
    Entonces debería ver el mensaje "Tu carrito está vacío"
    Y debería ver un botón para "Continuar comprando"

  Escenario: Agregar y eliminar productos del carrito
    Dado que el usuario tiene productos en el carrito
    Cuando el usuario accede a la página del carrito
    Entonces debería ver la lista de productos agregados
    Y debería poder ver el total de la compra
    Y debería poder eliminar un producto del carrito

  Escenario: Actualizar cantidades de productos
    Dado que el usuario tiene un producto en el carrito con cantidad 1
    Cuando el usuario hace clic en el botón "+"
    Entonces la cantidad del producto debería aumentar a 2
    Y el subtotal debería actualizarse correctamente

  Escenario: Vaciar carrito completo
    Dado que el usuario tiene productos en el carrito
    Cuando el usuario hace clic en "Vaciar Carrito"
    Entonces todos los productos deberían eliminarse del carrito
    Y debería mostrarse el carrito vacío