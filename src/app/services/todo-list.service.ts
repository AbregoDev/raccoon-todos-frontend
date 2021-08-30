import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from "../interfaces/to-do.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {

    private baseApi: string = 'http://localhost:3000/todos';

    list: ToDo[] = [
        {
            id: '1',
            body: 'Go out for a walk',
            completed: true,
        },
        {
            id: '2',
            body: 'Read p. 144',
            completed: true,
        },
        {
            id: '3',
            body: 'Do the laundry',
            completed: false,
        },
        {
            id: '4',
            body: 'Tidy the room',
            completed: false,
        },
        {
            id: '5',
            body: 'Study for math exam',
            completed: false,
        },
    ]

    constructor(private http: HttpClient) { }

    getTodoList(): Observable<ToDo[]> {
        return this.http.get<ToDo[]>(this.baseApi);
    }

    addTodo(task: ToDo): Observable<any> {
        return new Observable((observer) => {
            this.list.push(task);
            observer.next(task);
        });
    }
}