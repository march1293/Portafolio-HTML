// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; //arreglo vacio para agregar artiulos 

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     //muestra los cursos en local storage
     document.addEventListener('DOMContentLoaded', ()=>{
          articulosCarrito = JSON.parse(localStorage.getItem('carrito'))|| [];
          carritoHTML();
     })

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', ()=>{
          articulosCarrito=[];// resetea arreglo
          vaciarCarrito();
     })

}

//funciones

// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();

     
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          leerDatosCurso(curso);
     }
}

// Lee los datos del html en donde damos click y extrae informacion 

function leerDatosCurso(curso) {
     console.log(curso);
     // crear un objeto con el contenido del curso actual 
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }

// para ir agregando elementos al arreglo del carrito 
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
//verificamos si ya existe en el carrito
     if( existe ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso; //retorna objeto actualizado
                } else {
                     return curso; // retorna los objetos que no son duplicados 
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito
function eliminarCurso(e) {
     console.log(e.target)
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML(); // iterar sobre el carrito y mostrar su html 
     }
}


// Muestra lo que añadimos al carrito de compras
function carritoHTML() {

     vaciarCarrito();

          //recorre carrito y genera htlm
     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          // agrega el html del carrito en el tbody
          contenedorCarrito.appendChild(row);
     });

     //agregar carrito de compras al storege

     sincronizarStorage();

     function sincronizarStorage(){
          localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
     }

}

// Elimina los cursos del tbody
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada) para eliminar los cursos del tbody
     //mientras haya un hijo el elemento padre va a eliminar un hijo por el primero 
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
