



window.onload = function () {
    // ARRAY CON OBJETOS
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Cartera York',
            precio: 4500,
            imagen: '/proyectos/web/tiendaCarrito/img/01.png',
        },
        {
            id: 2,
            nombre: 'Cartera Loreal',
            precio: 6500,
            imagen: '/proyectos/web/tiendaCarrito/img/02.png',
        },
        {
            id: 3,
            nombre: 'Cartera Loreal',
            precio: 6500,
            imagen: '/proyectos/web/tiendaCarrito/img/02.png',
        },
        {
            id: 4,
            nombre: 'Cartera Loreal',
            precio: 6500,
            imagen: '/proyectos/web/tiendaCarrito/img/02.png',
        },
        {
            id: 5,
            nombre: 'Cartera Loreal',
            precio: 6500,
            imagen: '/proyectos/web/tiendaCarrito/img/02.png',
        },

        {
            id: 6,
            nombre: 'Cartera PortSaid',
            precio: 7500,
            imagen: '/proyectos/web/tiendaCarrito/img/03.png',
        }
    ]

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');
    let $botonComprar = document.querySelector('#boton-comprar');


    // funcion par renderizar todos los objetos del array
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$ ' + info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn-sm', 'btn-primary');
            miNodoBoton.textContent = '+ AGREGAR';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertar
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito() {
        // Agrego el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Render. el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vacio todo el html
        $carrito.textContent = '';
        // Quito los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Genero los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtengos el item que necesito de la variable base de datos
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creo el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-center', 'mx-1');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn-sm', 'btn-danger', 'mx-20');
            miBoton.textContent = 'Eliminar';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclo nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        console.log()
        // Obtengo el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borro todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // vuelvo a rende.
        renderizarCarrito();
        // Calculo de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpio el precio anterior
        total = 0;
        // Recorro el array del carrito
        for (let item of carrito) {
            // De cada elemento obtengo su precio
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];

        }
        // Formateo el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizo el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpio los productos guardados
        carrito = [];
        // Renderizo los cambios
        renderizarCarrito();
        calcularTotal();
    }
    function vaciarCarrito2() {
        // Limpio los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();

        var tarjeta = prompt("INGRESE SU TARJETA DE CREDITO");

        if (tarjeta != "") {
            alert("COMPRA REALIZADA CON EXITO");

        } else {
            alert("ERROR DE INGRESO");
        }

    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);
    $botonComprar.addEventListener('click', vaciarCarrito2);


    //render productos
    renderItems();
}




//...............................CARRITO 1-------------BOTONES SUMA Y RESTA DE PRODUCTOS-------------------------------


var b = document.querySelectorAll("input");

for (let index = 0; index < b.length; index++) {

    b[index].addEventListener("click", cambiar, false);
}

var contador1 = 1;
var contador2 = 1;
var contador3 = 1;

var totalidad_1 = 0;
var totalidad_2 = 0;
var totalidad_3 = 0;

var productoValor1 = 3500;
var productoValor2 = 5200;
var productoValor3 = 7800;


function cambiar(e) {

    if (e.target == suma1) {

        contador1++;

        document.getElementById("contador1").value = contador1;

        var contador = document.getElementById("contador1").value;
        totalidad_1 = productoValor1 * contador;


        document.getElementById("totalProducto1").value = `Total: $${totalidad_1}`;


    } else if (e.target == resta1) {
        if (contador1 == 1) {
            document.getElementById("contador1").value = 1;
        } else {
            contador1--;
            document.getElementById("contador1").value = contador1;

            var contador = document.getElementById("contador1").value;
            totalidad_1 = totalidad_1 - productoValor1;


            document.getElementById("totalProducto1").value = `Total: $${totalidad_1}`;
        }
    }


    if (e.target == suma2) {

        contador2++;
        document.getElementById("contador2").value = contador2;

        var contador = document.getElementById("contador2").value;
        totalidad_2 = productoValor2 * contador;


        document.getElementById("totalProducto2").value = `Total: $${totalidad_2}`;

    } else if (e.target == resta2) {
        if (contador2 == 1) {
            document.getElementById("contador2").value = 1;
        } else {
            contador2--;
            document.getElementById("contador2").value = contador2;

            var contador = document.getElementById("contador2").value;
            totalidad_2 = totalidad_2 - productoValor2;


            document.getElementById("totalProducto2").value = `Total: $${totalidad_2}`;

        }
    }



    if (e.target == suma3) {

        contador3++;
        document.getElementById("contador3").value = contador3;

        var contador = document.getElementById("contador3").value;
        totalidad_3 = productoValor3 * contador;


        document.getElementById("totalProducto3").value = `Total: $${totalidad_3}`;

    } else if (e.target == resta3) {
        if (contador3 == 1) {
            document.getElementById("contador3").value = 1;
        } else {
            contador3--;
            document.getElementById("contador3").value = contador3;


            var contador = document.getElementById("contador3").value;
            totalidad_3 = totalidad_3 - productoValor3;


            document.getElementById("totalProducto3").value = `Total: $${totalidad_3}`;

        }
    }

}

//..........................AGREGAR PRODUCTOS---------------------------

document.getElementById("agregarBoton1").addEventListener("click", agregar, false);
document.getElementById("agregarBoton2").addEventListener("click", agregar, false);
document.getElementById("agregarBoton3").addEventListener("click", agregar, false);

var totalParcial = 0;
function agregar(e) {

    if (e.target == agregarBoton1) {

        if (contador1  <1) {
            return
        }

        const productList = document.getElementById('grupoAgregados');
        const precio1 = document.getElementById('precio1').innerHTML;
        const nombre1 = document.getElementById('nombre1').innerHTML;


        const element = document.createElement('div');
        element.innerHTML = `<div class="card text-center mb-4">  
                <div class="card-body">■  
                <strong>Producto:</strong> ${nombre1}
                <strong>-</strong> ${precio1} <b>x${contador1}</b>
                
                <a href="#" onclick="this.parentElement.parentElement.style.display = 'none';" class="btn btn-danger" name="delete" style="margin-left: 10px;">Delete</a>
                </div>
                </div>
                `;
        //  mb-4  = margin-bottom: 4;
        //  text-center (centra el texto))
        //  class="card (clase de bootstrap))  

        productList.appendChild(element)
        document.getElementById('contador1').value = "1";
        document.getElementById('totalProducto1').value = "Total: $3500";

        totalParcial = (contador1 * 3500) + totalParcial;
        document.getElementById("totalCompra").innerHTML = `Total: $${totalParcial}`;
        contador1 = 1;
    }
    if (e.target == agregarBoton2) {
        if (contador2 <1) {
            return
        }

        const productList = document.getElementById('grupoAgregados');
        const precio2 = document.getElementById('precio2').innerHTML;
        const nombre2 = document.getElementById('nombre2').innerHTML;


        const element = document.createElement('div');
        element.innerHTML = `<div class="card text-center mb-4">  
                 <div class="card-body">■ 
                 <strong>Producto:</strong> ${nombre2}
                 <strong>-</strong> ${precio2} <b>x${contador2}</b>
                 
                 <a href="#" onclick="this.parentElement.parentElement.style.display = 'none';" class="btn btn-danger" name="delete" style="margin-left: 10px;">Delete</a>
                 </div>
                 </div>
                 `;
        //  mb-4  = margin-bottom: 4;
        //  text-center (centra el texto))
        //  class="card (clase de bootstrap))  

        productList.appendChild(element)
        document.getElementById('contador2').value = "1";
        document.getElementById('totalProducto2').value = "Total: $5200";

        totalParcial = (contador2 * 5200) + totalParcial;
        document.getElementById("totalCompra").innerHTML = `Total: $${totalParcial}`;
        contador2 = 1;

    }

    if (e.target == agregarBoton3) {
        if (contador3 <1) {
            return
        }
        const productList = document.getElementById('grupoAgregados');
        const precio3 = document.getElementById('precio3').innerHTML;
        const nombre3 = document.getElementById('nombre3').innerHTML;

       
       
        const element = document.createElement('div');
        element.innerHTML = `<div class="card text-center mb-4">  
                 <div class="card-body">■ 
                 <strong>Producto:</strong> ${nombre3}
                 <strong>-</strong> ${precio3} <b>x${contador3}</b>
                 
                 <a id="borrarTodo" href="#" class="btn btn-danger" onclick="parentElement.parentElement.remove()"   name="delete" style="margin-left: 10px;">Delete</a>
                 
                 </div>
                 </div>
                 `;

              
        //  mb-4  = margin-bottom: 4;
        //  text-center (centra el texto))
        //  class="card (clase de bootstrap))  

        productList.appendChild(element)
        document.getElementById('contador3').value = "1";
        document.getElementById('totalProducto3').value = "Total: $7800";

        totalParcial = (contador3 * 7800) + totalParcial;
        document.getElementById("totalCompra").innerHTML = `Total: $${totalParcial}`;
        contador3 = 1;
        
      
    }
    
 document.getElementById("cancelar").addEventListener("click",cancelar,false);
 document.getElementById("continuar").addEventListener("click",continuar,false);

 function cancelar(e) {
   var myNode =  document.getElementById("grupoAgregados");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
      document.getElementById('totalCompra').innerHTML="$0";
 }
 function continuar(e) {
   
 
   var x=document.getElementById('totalCompra').innerHTML;
   alertify.alert()
.setting({
    'label': 'CERRAR',
    'message': `Su compra ha sido realizada,  <b>${x}</b> . Gracias por comprar en la tienda.`

}).show();


 

var myNode =  document.getElementById("grupoAgregados");
while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

 

 }
 
}


