let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

// Function para mostrar los productos dentro de el carrito //
function mostrarProductos() {
  const subtotalhtml = document.getElementById("subtotal");
  subtotalhtml.innerText = 0;
  let productosCarrito = document.getElementById("productosCarrito");
  productosCarrito.innerHTML = "";
  if (carritoStorage.length == 0) {
    console.log(carritoStorage);
    productosCarrito.innerHTML = `<h5 class="carrito-vacio" >Agrega un producto a tu carrito</h5>`;
  } else {
    carritoStorage.forEach((producto) => {
      productosCarrito.innerHTML += `<article class="producto-carrito">
    <img src='${producto.imagen}'>
    <h3>${producto.nombre}</h3>
    <p>US$ ${producto.precio}.00</p>
    <p>Cantidad: ${producto.cantidad}</p>
    <button class="btnRestarCantidad" data-restar="${producto.id}"><i class="bi bi-dash-circle-fill"></i></button>
    <button class="btnQuitar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    <button class="btnSumarCantidad" data-sumar="${producto.id}"><i class="bi bi-plus-circle-fill"></i></button>
    </article>`;
    });
  }

  // Botones de sumar cantidad de un producto de el carrito //
  const btnSumarCantidad = document.getElementsByClassName("btnSumarCantidad");
  for (let boton of btnSumarCantidad) {
    boton.addEventListener("click", () => {
      sumarCantidad(boton.dataset.sumar);
    });
  }

  // Botones de quitar producto del carrito //
  const botonesQuitar = document.getElementsByClassName("btnQuitar");
  for (let boton of botonesQuitar) {
    boton.addEventListener("click", () => {
      quitarProducto(Number(boton.dataset.id));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        heightAuto: false,
      });
      Toast.fire({
        icon: "error",
        title: "Producto eliminado.",
      });
    });
  }

  // Botones de restar cantidad de un producto de el carrito //
  const btnRestarCantidad =
    document.getElementsByClassName("btnRestarCantidad");
  for (let boton of btnRestarCantidad) {
    boton.addEventListener("click", () => {
      restarCantidad(boton.dataset.restar);
    });
  }
  subtotalPrecio();
  totalPrecio();
}

// Boton de Realizar Compra //
const btnRealizar = document.getElementsByClassName("btnRealizarCompra");
for (let boton of btnRealizar) {
  boton.addEventListener("click", () => {
    carritoStorage = [];
    mostrarProductos();
    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    Swal.fire({
      position: "middle",
      icon: "success",
      text: "Tu compra ha sido realizada",
      showConfirmButton: false,
      timer: 900,
    });
  });
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
    subtotal = subtotal + producto.precio * producto.cantidad;
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

// Function para sumar 1 producto que esta en el carrito //
function sumarCantidad(id) {
  let productoEnCarrito = carritoStorage.find((producto) => producto.id == id);
  productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  localStorage.setItem("carrito", JSON.stringify(carritoStorage));
  mostrarProductos();
}

// Function para restar 1 producto que esta en el carrito //
function restarCantidad(id) {
  let productoEnCarrito = carritoStorage.find((producto) => producto.id == id);
  if (productoEnCarrito.cantidad > 1) {
    productoEnCarrito.cantidad = productoEnCarrito.cantidad - 1;
  }
  localStorage.setItem("carrito", JSON.stringify(carritoStorage));
  mostrarProductos();
}
mostrarProductos();
