export class Todo{
    static fromJSON({id, tarea, completado, creeado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado;
        return(tempTodo);
    }
    constructor(tarea){
        this.tarea  = tarea;
        this.id     = new Date().getTime();
        this.completado = false;
        this.creado = new Date(); 
    }
}