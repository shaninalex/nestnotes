import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    loginForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        password: new FormControl("", [Validators.required])
    });

    submit() {
        if (this.loginForm.valid) {
            this.authService.login(
                this.loginForm.value.email,
                this.loginForm.value.password,
            ).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigate([""])
                },
                error: err => {
                    console.log(err.data);
                }
            });
        }
    }
}
