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
import { NoteDetailComponent } from './routes/note-detail/note-detail.component';
import { NotificationsComponent } from './ui/notifications/notifications.component';
import { NotificationsService } from './services/notification.service';


const routes: Routes = [
    { 
        path: "", component: DashboardComponent, children: [
            { path: "", component: HomeComponent },
            { path: "note/:note_id", component: NoteDetailComponent },
            { path: "create", component: NoteDetailComponent },
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
        NoteDetailComponent,
        NotificationsComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NotesService,
        NotificationsService
    ]
})
export class DashboardModule { }
