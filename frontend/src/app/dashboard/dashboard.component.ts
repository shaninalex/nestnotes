import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.user().subscribe({
            next: data => {
                console.log(data);
            }
        });
    }
}
