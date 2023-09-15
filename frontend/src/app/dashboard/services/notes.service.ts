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

    getOne(note_id: number): Observable<Note> {
        return this.http.get<Note>(`/api/v1/notes/${note_id}`);
    }

    patch(note_id: number, payload: Note): Observable<any> {
        return this.http.patch<any>(`/api/v1/notes/${note_id}`, payload);
    }

    delete(note_id: number): Observable<any> {
        return this.http.delete<any>(`/api/v1/notes/${note_id}`);
    }

    create(payload: Note): Observable<Note> {
        return this.http.post<Note>(`/api/v1/notes/`, payload);
    }
}
