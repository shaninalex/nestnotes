import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
    ) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post("/api/v1/auth/login", {
            email: email,
            password: password,
        });
    }
}
