import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from "../interfaces/to-do.interface";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {

    constructor() { }

    getTodoList(): Observable<ToDo[]> {
        return new Observable((observer) => observer.next([
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
        ]));
    }
}