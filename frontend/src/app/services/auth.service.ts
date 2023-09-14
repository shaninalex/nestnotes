import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
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

    register(email: string, name: string, password: string, password_confirm: string): Observable<any> {
        return this.http.post("/api/v1/auth/register", {
            email,
            name,
            password,
            password_confirm,
        });
    }

    logout() {
        return this.http.get("/api/v1/auth/logout");
    }

    user() {
        return this.http.get("/api/v1/auth/user");
    }
}
