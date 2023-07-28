const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

// Function para mostrar los productos dentro de el carrito //
function mostrarProductos() {
  const subtotalhtml = document.getElementById("subtotal");
  subtotalhtml.innerText = 0;
  let productosCarrito = document.getElementById("productosCarrito");
  productosCarrito.innerHTML = "";
  carritoStorage.forEach((producto) => {
    productosCarrito.innerHTML += `<article class="producto-carrito">
    <img src='${producto.imagen}'>
    <h3>${producto.nombre}</h3>
    <p>US$ ${producto.precio}.00</p>
    <p>Cantidad: ${producto.cantidad}</p>
    <button class="btnSumarCantidad" data-sumar="${producto.id}"><i class="bi bi-plus-circle-fill"></i></button>
    <button class="btnQuitar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    </article>`;
  });

  // Botones de sumar cantidad de el carrito //
  const btnSumarCantidad = document.getElementsByClassName("btnSumarCantidad");
  for (boton of btnSumarCantidad) {
    boton.addEventListener("click", () => {
      console.log(boton.dataset.sumar);
      sumarCantidad(boton.dataset.sumar);
    });
  }

  // Botones de quitar producto del carrito //
  const botonesQuitar = document.getElementsByClassName("btnQuitar");
  for (boton of botonesQuitar) {
    boton.addEventListener("click", () => {
      quitarProducto(Number(boton.dataset.id));
    });
  }
  subtotalPrecio();
  totalPrecio();
}

// Function de quitar producto //
function quitarProducto(id) {
  let indice = carritoStorage.findIndex((producto) => producto.id === id);
  carritoStorage.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carritoStorage));
  mostrarProductos();
}

// Function para calcular el subtotal del precio //
function subtotalPrecio() {
  let subtotal = 0;
  carritoStorage.forEach((producto) => {
    subtotal = subtotal + producto.precio;
    const subtotalhtml = document.getElementById("subtotal");
    subtotalhtml.innerText = `${subtotal}`;
  });
}

// Function para calcular el Total del precio //
function totalPrecio() {
  const costeDeEnvio = 15;
  let subtotal = Number(document.getElementById("subtotal").innerText);
  let total = carritoStorage.length > 0 ? subtotal + costeDeEnvio : 0;
  const totalhtml = document.getElementById("total");
  totalhtml.innerHTML = `${total}`;
}

// Function para sumar 1 producto estando en el carrito //
function sumarCantidad(id) {
  let productoEnCarrito = carritoStorage.find((producto) => producto.id == id);
  productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  mostrarProductos();
}

mostrarProductos();
