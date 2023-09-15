import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Observable } from 'rxjs';
import { Note } from '../../models/note';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    $notes: Observable<Note[]>;

    constructor(private notesService: NotesService) {}

    ngOnInit(): void {
        this.$notes = this.notesService.get();
    }
}
