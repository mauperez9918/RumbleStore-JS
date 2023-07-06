const productos = [
  {
    id: 1,
    nombre: "Mother Asus ROG Maximus Z690 Formula LGA1700",
    precio: 1290,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/asus-z690.jpg",
  },
  {
    id: 2,
    nombre: "AMD Ryzen 9 7950X AM5",
    precio: 1000,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/ryzen9-7950x.jpg",
  },
  {
    id: 3,
    nombre: "CPU Intel Core i9 13900K Raptor Lake 1700",
    precio: 929,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/i9-13900k.jpg",
  },
  {
    id: 4,
    nombre: "GPU Zotac GeForce RTX 4090 Trinity 24Gb",
    precio: 2700,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/zotac-geforce-4090.jpg",
  },
  {
    id: 5,
    nombre: "AORUS SSD PCIe Gen4 7000s 1TB",
    precio: 360,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/aorus-ssd-1tb.jpg",
  },
  {
    id: 6,
    nombre: "Memoria Adata XPG Lancer RGB 16Gb DDR5 6000Mhz White",
    precio: 164,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/adata-xpg-ddr5.jpg",
  },
  {
    id: 7,
    nombre: "Monitor ASUS TUF VG27VH1B Curvo 165hz",
    precio: 399,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/astuf-monitor.jpg",
  },
  {
    id: 8,
    nombre: "Notebook AERO i9-13900H / 32GB DDR5 / 1TB / 16″ 4K OLED",
    precio: 3740,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/aero16-laptop.webp",
  },
  {
    id: 9,
    nombre: "Teclado HyperX Alloy Origins 60% Aqua Tactile",
    precio: 110,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/hyperx-alloy-origins.jpg",
  },
  {
    id: 10,
    nombre: "Fuente ASUS ROG STRIX 850G Gold",
    precio: 250,
    imagen:
      "https://mauperez9918.github.io/PFMauricioPerez/images/index/fuente-asus-850watts.png",
  },
];

function listadoDeProductos() {
  let novedades = document.getElementById("novedades");
  productos.forEach((producto) => {
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

listadoDeProductos();

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
  }
}
