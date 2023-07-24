let productos = [];
let productosPorCategoria = [];
let listaDeNovedades = [];
let productosFiltrados = [];

async function cargarNovedades() {
  const response = await fetch(`../novedades.json`);
  listaDeNovedades = await response.json();
  listadoDeProductos(listaDeNovedades);
}

async function cargarProductos() {
  const response = await fetch(`../productos.json`);
  productos = await response.json();
}

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

  const botonesAgregar = document.getElementsByClassName("btnAgregar");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      agregarProducto(Number(boton.dataset.id));
    });
  }
}

cargarNovedades();
cargarProductos();

function agregarProducto(id) {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  let duplicado = false;
  carritoStorage.forEach((producto) => {
    if (producto.id === id) {
      duplicado = true;
    }
  });
  if (duplicado) {
    alert("Tu producto ya esta en el carrito");
  } else {
    const productoCarrito = productos.find((producto) => producto.id === id);
    carritoStorage.push({ ...productoCarrito, cantidad: 1 });
    localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Tu producto ha sido agregado al carrito.",
      showConfirmButton: false,
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

const buscador = document.getElementById("buscador");
buscador.addEventListener("keydown", (event) => {
  event.preventDefault();
  productosFiltrados = filtrarPorNombre(buscador.value);
  listadoDeProductos(productosFiltrados);
});

function filtrarPorNombre(palabra) {
  return productos.filter((producto) =>
    producto.nombre.toLowercase().includes(palabra)
  );
}
