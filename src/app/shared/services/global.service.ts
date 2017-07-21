import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalService {
    data: object;
    dataChange = new EventEmitter();
    constructor() {
        this.data = {};
    }
    set(newObj: object) {
        this.data = Object.assign(this.data, newObj);
        this.dataChange.emit(this.data);
    }
}