const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

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
    <button class="btnQuitar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    </article>`;
  });

  const botonesQuitar = document.getElementsByClassName("btnQuitar");
  for (const boton of botonesQuitar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      quitarProducto(Number(boton.dataset.id));
    });
  }
  subtotalPrecio();
  totalPrecio();
}

mostrarProductos();

function quitarProducto(id) {
  let indice = carritoStorage.findIndex((producto) => producto.id === id);
  carritoStorage.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carritoStorage));
  mostrarProductos();
}

function subtotalPrecio() {
  let subtotal = 0;
  carritoStorage.forEach((producto) => {
    subtotal = subtotal + producto.precio;
    const subtotalhtml = document.getElementById("subtotal");
    subtotalhtml.innerText = `${subtotal}`;
  });
}

function totalPrecio() {
  const costeDeEnvio = 15;
  let subtotal = Number(document.getElementById("subtotal").innerText);
  let total = carritoStorage.length > 0 ? subtotal + costeDeEnvio : 0;
  const totalhtml = document.getElementById("total");
  totalhtml.innerHTML = `${total}`;
}
