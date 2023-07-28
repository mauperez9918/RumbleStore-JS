let productos = [];
let productosPorCategoria = [];
let listaDeNovedades = [];
let productosFiltrados = [];

// Carga el JSON de Novedades //
async function cargarNovedades() {
  const response = await fetch(
    `https://mauperez9918.github.io/Proyectofinal-Perez/novedades.json`
  );
  listaDeNovedades = await response.json();
  listadoDeProductos(listaDeNovedades);
}

// Carga todos los productos //
async function cargarProductos() {
  const response = await fetch(
    `https://mauperez9918.github.io/Proyectofinal-Perez/productos.json`
  );
  productos = await response.json();
}

// Funcion que muestra los productos en el inicio //

function listadoDeProductos(array) {
  let novedades = document.getElementById("novedades");
  novedades.innerHTML = "";
  array.forEach((producto) => {
    novedades.innerHTML += `<article class='tarjeta'>
    <img src='${producto.imagen}'/>
    <h3>${producto.nombre}</h3>
    <div class="positionBtnAgregar">
    <p>US$ ${producto.precio}.00</p>
    <button class="btnAgregar" data-id="${producto.id}"><i class="bi bi-cart-plus-fill"></i></button>
    </div>
    </article>`;
  });

  // Boton con evento click que agrega productos al carrito //
  const botonesAgregar = document.getElementsByClassName("btnAgregar");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      agregarProducto(Number(boton.dataset.id));
    });
  }
}

// Funcion de agregar productos al carrito //
function agregarProducto(id) {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  let duplicado = false;
  carritoStorage.forEach((producto) => {
    if (producto.id === id) {
      duplicado = true;
    }
  });
  if (duplicado) {
    let productoEnCarrito = carritoStorage.find(
      (producto) => producto.id == id
    );
    productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  } else {
    const productoCarrito = productos.find((producto) => producto.id === id);
    carritoStorage.push({ ...productoCarrito, cantidad: 1 });
    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Tu producto ha sido agregado al carrito.",
      showConfirmButton: false,
      timer: 600,
    });
  }
}

const botonesCategorias = document.querySelectorAll(".btnCategorias");
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    productosPorCategoria = filtrarCategorias(boton.dataset.cat);
    document.getElementById("titleindex").innerText = boton.dataset.cat;
    listadoDeProductos(productosPorCategoria);
  });
});

function filtrarCategorias(categoria) {
  return productos.filter((producto) => producto.categoria == categoria);
}

function filtrarPorNombre(palabra) {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(palabra)
  );
}

const buscador = document.getElementById("buscador");
buscador.addEventListener("keyup", () => {
  if (buscador.value != "") {
    productosFiltrados = filtrarPorNombre(buscador.value.toLowerCase());
    listadoDeProductos(productosFiltrados);
  } else {
    listadoDeProductos(productosPorCategoria);
  }
});

cargarNovedades();
cargarProductos();
