import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    constructor(
        private authService: AuthService,
    ) {}

    registerForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        name: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        password_confirm: new FormControl("", [Validators.required]),
    });

    submit(): void {
        if (this.registerForm.valid) {
            const values = this.registerForm.value;
            this.authService.register(
                values.email, values.name, values.password, values.password_confirm,
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
