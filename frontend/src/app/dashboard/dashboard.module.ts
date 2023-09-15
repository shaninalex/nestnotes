import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HomeComponent } from './routes/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesService } from './services/notes.service';
import { SettingsComponent } from './routes/settings/settings.component';
import { NoteitemComponent } from './routes/home/noteitem/noteitem.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';


const routes: Routes = [
    { 
        path: "", component: DashboardComponent, children: [
            { path: "", component: HomeComponent },
            { path: "settings", component: SettingsComponent },
            { path: "**", component: NotFoundComponent },
        ]
    }
];


@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        SidebarComponent,
        HomeComponent,
        SettingsComponent,
        NoteitemComponent,
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NotesService
    ]
})
export class DashboardModule { }
