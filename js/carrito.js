let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const botonComprar = document.querySelector("#carrito-acciones-comprar")
const contenedorTotal = document.querySelector("#total")
let botonEliminarCantidad = document.querySelector(".carrito-producto-cantidad-eliminar")
let botonAgregarCantidad = document.querySelector(".carrito-producto-cantidad-agregar")


function cargarProductosCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.img}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-detalles">
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <div class="carrito-producto-cantidad-numero">
                            <button class="carrito-producto-cantidad-eliminar" id="${producto.id}"><i class="bi bi-dash"></i></button>
                            <p>${producto.cantidad}</p>
                            <button class="carrito-producto-cantidad-agregar" id="${producto.id}"><i class="bi bi-plus"></i></button>
                        </div>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    
            `
    
            contenedorCarritoProductos.append(div);
        })
       
    } else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }
    
    actualizarBotonEliminarCantidad();
    actualizarBotonAgregarCantidad();
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Eliminaste el producto",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #b30808, #5a1818)",
          borderRadius: "2rem",
          fontSize: ".85rem", 
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem",
        },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarBotonEliminarCantidad() {
    botonEliminarCantidad = document.querySelectorAll(".carrito-producto-cantidad-eliminar");

    botonEliminarCantidad.forEach(boton => {
        boton.addEventListener("click", quitarCantidad);
    })
}

function quitarCantidad(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if(productosEnCarrito[index].cantidad > 1){
        productosEnCarrito[index].cantidad--;
        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}

function actualizarBotonAgregarCantidad() {
    botonAgregarCantidad = document.querySelectorAll(".carrito-producto-cantidad-agregar");

    botonAgregarCantidad.forEach(boton => {
        boton.addEventListener("click", agregarCantidad);
    })
}

function agregarCantidad(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito[index].cantidad++;
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: 'Se borraran todos tus productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Sí',
        cancelButtonText:'No',
        confirmButtonColor: '#b30808',
        iconColor: '#000000',
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();        
        }
      })
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}




