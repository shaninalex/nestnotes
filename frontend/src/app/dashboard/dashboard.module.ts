import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    }
];


@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        SidebarComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }
