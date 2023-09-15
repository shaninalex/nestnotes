import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';


@Injectable()
export class NotesService {
    constructor(
        private http: HttpClient
    ) {}

    get(): Observable<Note[]> {
        return this.http.get<Note[]>("/api/v1/notes");
    }
}
