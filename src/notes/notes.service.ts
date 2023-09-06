import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {

    save() {

    }

    get() {

    }

    update(id: number) {
        console.log(id);
    }

    delete(id: number) {
        console.log(id);
    }
}
