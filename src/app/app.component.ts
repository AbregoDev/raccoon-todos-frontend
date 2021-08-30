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

    constructor(private todoListService: TodoListService) { }

    ngOnInit(): void {
        this.todoListService.getTodoList()
            .subscribe((resp: ToDo[]) => {
                this.completedTasks = resp.filter((todo) => todo.completed);
                this.todoTasks = resp.filter((todo) => !todo.completed);

                console.log(this.completedTasks);
                console.log(this.todoTasks);
            });
    }
}