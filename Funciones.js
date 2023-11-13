var fechaActual = new Date();

// Formatear la fecha en el formato YYYY-MM-DD
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; 
var anio = fechaActual.getFullYear();

// Asegurarse de tener dos dígitos para el día y el mes
dia = (dia < 10) ? '0' + dia : dia;
mes = (mes < 10) ? '0' + mes : mes;

// Crear la cadena con el formato YYYY-MM-DD
var fechaFormateada = anio + '-' + mes + '-' + dia;

// Establecer el valor del input date con la fecha actual formateada
document.getElementById('fechaHoraSelector').value = fechaFormateada;




// Función para agregar un producto al formulario
function agregarProducto() {
    var producto = document.getElementById("productoSelector").value;
    var cantidad = document.getElementById("cantidadProducto").value;

    // Validar que se haya seleccionado un producto y la cantidad sea válida
    if (producto && cantidad > 0 ) {
        // Crear un nuevo elemento div para mostrar el producto agregado
        var nuevoProducto = document.createElement("div");
        nuevoProducto.innerHTML = `<div>${producto}</div><div>${cantidad}</div><button onclick="eliminarProducto(this)">Eliminar</button>`;

        // Agregar el nuevo producto al contenedor
        document.getElementById("productosAgregados").appendChild(nuevoProducto);

        // Calcular y actualizar los totales
        calcularTotales();
    } else {
        alert("Selecciona un producto y especifica una cantidad válida.");
    }
}

// Función para eliminar un producto del formulario
function eliminarProducto(elemento) {
    // Eliminar el elemento del DOM
    elemento.parentNode.remove();

    // Calcular y actualizar los totales
    calcularTotales();
}

// Función para calcular y actualizar los totales
function calcularTotales() {
    var subtotal = 0;
    var elementos = document.getElementById("productosAgregados").children;

    for (var i = 0; i < elementos.length; i++) {
        var cantidad = parseInt(elementos[i].children[1].innerText);
        subtotal += cantidad;
    }

    // Actualizar los totales en el formulario
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("total").innerText = subtotal;
}


// Función para enviar el pedido (validaciones adicionales pueden ser agregadas)
function enviarPedido() {
    var cliente = document.getElementById("clienteSelector").value;
    var fechaHora = document.getElementById("fechaHoraSelector").value;

    // Validar que se haya seleccionado un cliente, un producto y una fecha mayor a la actual
    if (cliente && fechaHora && fechaHora > fechaFormateada) {
       
        // Mostrar mensaje de confirmación
        alert("Pedido guardado exitosamente. ¡Gracias!");

        // Limpiar los campos del formulario
        limpiarFormulario();
    } else {
        alert("Debe agregar por lo menos un producto y seleccionar a partir de un dia despues de la fecha actual");
    }
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById("clienteSelector").value = "Cliente 1";
    document.getElementById("fechaHoraSelector").value = fechaFormateada;
    document.getElementById("productoSelector").value = "Producto 1";
    document.getElementById("cantidadProducto").value = "";
    
    // Limpiar productos agregados
    document.getElementById("productosAgregados").innerHTML = "";

    // Limpiar totales
    document.getElementById("subtotal").innerText = "0";
    document.getElementById("total").innerText = "0";
}



/*
CREATE DATABASE IF NOT EXISTS TuBaseDeDatos;
USE TuBaseDeDatos;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCliente VARCHAR(100) NOT NULL,
    DireccionCliente VARCHAR(255),
    -- Otros campos que puedan ser necesarios
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS Productos (
    ProductoID INT AUTO_INCREMENT PRIMARY KEY,
    NombreProducto VARCHAR(100) NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    -- Otros campos que puedan ser necesarios
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS Pedidos (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    FechaHoraPedido DATETIME,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    -- Otros campos que puedan ser necesarios
);

-- Tabla de detalles de pedido
CREATE TABLE IF NOT EXISTS DetallesPedido (
    DetalleID INT AUTO_INCREMENT PRIMARY KEY,
    PedidoID INT,
    ProductoID INT,
    Cantidad INT,
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID),
    -- Otros campos que puedan ser necesarios
);

*/

