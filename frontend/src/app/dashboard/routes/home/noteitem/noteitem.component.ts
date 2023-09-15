import { Component, Input } from '@angular/core';
import { Note } from 'src/app/dashboard/models/note';

@Component({
    selector: 'app-noteitem',
    templateUrl: './noteitem.component.html'
})
export class NoteitemComponent {
    @Input('note') note: Note = <Note>{title:'', content:''};
}
