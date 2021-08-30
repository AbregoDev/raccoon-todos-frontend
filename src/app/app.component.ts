import { Component, OnInit } from '@angular/core';
import { ToDo } from './interfaces/to-do.interface';
import { TodoListService } from './services/todo-list.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    completedTasks: ToDo[] = [];
    todoTasks: ToDo[] = [];

    newTodoBody: string = '';
    newTodoId: string = '';

    editedTask: ToDo = { id: '', body: '', completed: false };

    constructor(private todoListService: TodoListService) { }

    ngOnInit(): void {
        // Fetch todo list
        this.todoListService.getTodoList()
            .subscribe((resp: ToDo[]) => {
                // Divide between completed and uncompleted tasks
                this.completedTasks = resp.filter((todo) => todo.completed);
                this.todoTasks = resp.filter((todo) => !todo.completed);

                // Get last id
                const ids = resp.map((task) => parseInt(task.id));
                if (ids.length === 0) {
                    // Empty list
                    this.newTodoId = '1';
                } else {
                    this.newTodoId = (Math.max(...ids) + 1).toString();
                }
            });
    }

    deleteTodo(task: ToDo): void {
        console.log(`I'm removing task with id: ${task.id}`)

        // Update DOM
        if (task.completed) {
            this.completedTasks = this.completedTasks.filter((todo) => todo.id !== task.id);
            console.log(this.completedTasks);
        } else {
            this.todoTasks = this.todoTasks.filter((todo) => todo.id !== task.id);
            console.log(this.todoTasks);
        }

        // Remove at DB

    }

    addTodo(): void {
        if (this.newTodoBody.trim().length === 0) return;

        // Todo to add
        const newTodo: ToDo = {
            id: this.newTodoId,
            body: this.newTodoBody,
            completed: false
        };
        // Update the DOM
        this.todoTasks.push(newTodo);
        // Add in database
        this.todoListService.addTodo(newTodo)
            .subscribe((resp) => console.log(resp));
        // Clean input
        this.newTodoBody = '';
    }

    toggleCompletness(task: ToDo): void {
        // update the DOM
        if (task.completed) {
            // Remove from completed tasks
            this.completedTasks = this.completedTasks.filter((todo) => todo.id !== task.id);
            // Add to uncompleted tasks
            this.todoTasks.push(task);
        } else {
            // Remove from uncompleted tasks
            this.todoTasks = this.todoTasks.filter((todo) => todo.id !== task.id);
            // Add to completed tasks
            this.completedTasks.push(task);
        }

        // Toggle 'completed' property
        task.completed = !task.completed;

        // Update at DB
        this.todoListService.updateTodo(task.id, task)
            .subscribe();
    }

    openModalUpdateTask(task: ToDo) {
        this.editedTask = {...task};
    }

    updateTask() {
        // Update DOM
        let task;
        if(this.editedTask.completed) {
            task = this.completedTasks.find((todo) => todo.id === this.editedTask.id);
        } else {
            task = this.todoTasks.find((todo) => todo.id === this.editedTask.id);
        }
        task!.body = this.editedTask.body;

        // Update at DB
        this.todoListService.updateTodo(this.editedTask.id, this.editedTask)
            .subscribe();
    }
}