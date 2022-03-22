import { Todo} from '../class';
import {todoList} from '../index'
import '../css/componentes.css'
// import webpacklogo from '../assets/img/webpack-logo.png'
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltos = document.querySelector('.filters');
const anchorFiltro=  document.querySelectorAll('.filtro');
const cantidad = document.querySelector('strong');

export const crearTodoHtml = (todo) =>{
 
 
    const htmTodo = `
        <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado)?'checked':'' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
        `;
        const div = document.createElement('div');
        div.innerHTML = htmTodo;
        divTodoList.append(div.firstElementChild);
    }


txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode===13){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

})

divTodoList.addEventListener('click', (event) =>{

    const nombreElemento = event.target.localName;
    const liElement = event.target.parentElement.parentElement;
    const idElement = liElement.getAttribute('data-id');
    if(nombreElemento == 'input'){
        todoList.marcarCompletado(idElement);
        liElement.classList.toggle('completed');
        let suma = todoList.contarCompletados();
        cantidad.innerText = suma;
        console.log(cantidad);
    }else if(nombreElemento=='button'){
        todoList.eliminarTodo(idElement);
        divTodoList.removeChild(liElement);

    }else{

    }
})
btnBorrarCompletados.addEventListener('click', (event) =>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i>=0;i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
})
ulFiltos.addEventListener('click',(event)=>{
    //console.log(event.target.text);
    const filtro = event.target.text;
    if(!filtro){return;}
    anchorFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                };
                
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
        }
    }
})