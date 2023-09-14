import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(
        private authService: AuthService,
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
                },
                error: err => {
                    console.log(err.data);
                }
            });
        }
    }
}
