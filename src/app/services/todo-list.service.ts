import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from "../interfaces/to-do.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {

    private baseApi: string = 'https://raccoon-todos.herokuapp.com/todos';

    constructor(private http: HttpClient) { }

    getTodoList(): Observable<ToDo[]> {
        return this.http.get<ToDo[]>(this.baseApi);
    }

    addTodo(task: ToDo): Observable<ToDo> {
        return this.http.post<ToDo>(this.baseApi, task);
    }

    updateTodo(id: string, task: any): Observable<ToDo> {
        return this.http.put<ToDo>(`${this.baseApi}/${id}`, task);
    }

    deleteTodo(id: string): Observable<ToDo> {
        return this.http.delete<ToDo>(`${this.baseApi}/${id}`);
    }
}