import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    logout(): void {

        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(["auth/login"])
            }
        })
    }
}
