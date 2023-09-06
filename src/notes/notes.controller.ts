import { Controller, Get, Render } from '@nestjs/common';

@Controller('notes')
export class NotesController {
    @Get()
    @Render("notes")
    notesRoot() {
        return {}
    }
}
