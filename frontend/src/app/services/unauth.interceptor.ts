import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class UnAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(data => {
                console.log(data)
            }),
            catchError(err => {
                if (err.status === 401) {
                    this.router.navigate(['/auth/login']);
                }
                return of('error', err);
            })
        )
    }
}