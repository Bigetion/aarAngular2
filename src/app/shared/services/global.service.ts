import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalService {
    data: any;
    dataChange = new EventEmitter();
    constructor() {
        this.data = {};
    }
    set(newObj: any) {
        this.data = Object.assign(this.data, newObj);
        this.dataChange.emit(this.data);
    }
}