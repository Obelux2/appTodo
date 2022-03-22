import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        this.cargarLocalStorage()
    }
    
    nuevoTodo(todo){
        this.todos.push(todo); 
        this.guardarLocalStorage(); 
    }
    eliminarTodo(id){
        this.todos = this.todos.filter( item => item.id != id)

    }
    marcarCompletado(id){   
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }
    eliminarTodos(){

    }
    eliminarCompletados(){
        this.todos = this.todos.filter( item => item.completado != true)
        this.guardarLocalStorage();
    }
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    };
    cargarLocalStorage(){
        if(localStorage.getItem('todo')){
            this.todos = JSON.parse(localStorage.getItem('todo'));
        }else{
            this.todos=[];
        }
        this.todos = this.todos.map(obj=>Todo.fromJSON(obj));
        
    }
    contarCompletados(){
        let suma = 0;
        for(const completado of this.todos){
            if(!completado.completado){
                suma++
            }
        }
        return suma;
    }
}