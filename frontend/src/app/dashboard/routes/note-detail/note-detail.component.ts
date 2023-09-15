import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../services/notification.service';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent {
    paramsSubscription$: Subscription;
    note_id: number;
    create: boolean = true;
    note: Note;

    noteForm: FormGroup = new FormGroup({
        title: new FormControl("", [Validators.required]),
        content: new FormControl("", [Validators.required])
    });

    constructor(
        private route: ActivatedRoute, 
        private notificationsService: NotificationsService,
        private router: Router,
        private notesService: NotesService) { }

    ngOnInit() {
        this.paramsSubscription$ = this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                if (params.get("note_id")) {
                    this.note_id = parseInt(params.get("note_id") as string);
                    this.notesService.getOne(this.note_id).subscribe({
                        next: note => {
                            this.note = note;
                            this.noteForm.patchValue(note);
                        }
                    });
                    this.create = false;
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.paramsSubscription$) this.paramsSubscription$.unsubscribe();
    }

    save(): void {
        if (this.noteForm.valid && !this.create) {
            this.notesService.patch(this.note_id, this.noteForm.value).subscribe({
                next: () => {
                    this.notificationsService.add("Saved", "success");
                },
                error: () => { 
                    this.notificationsService.add("Can not save note", "error");
                }
            });
        }

        if (this.noteForm.valid && this.create) {
            this.notesService.create(this.noteForm.value).subscribe({
                next: () => {
                    this.notificationsService.add("Saved", "success");
                },
                error: () => { 
                    this.notificationsService.add("Can not save note", "error");
                }
            });
        }
    }

    delete(): void {
        if (this.note_id) {
            if (confirm("Are you sure want to delete this?")) {
                this.notesService.delete(this.note_id).subscribe({
                    next: () => {
                        this.notificationsService.add("Deleted", "success");
                        this.router.navigate(["/"]);
                    },
                    error: () => { 
                        this.notificationsService.add("Can not delete note", "error");
                    }
                });
            }
        }
    }
}
