import { Injectable, EventEmitter } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class GlobalService {
  private globalData: object;
  private listeners: object;
  private eventsSubject: Rx.Subject<any>;
  private events: Rx.Observable<any>;

  data = new EventEmitter();
  constructor() {
    this.globalData = {};

    this.listeners = {};
    this.eventsSubject = new Rx.Subject();

    this.events = Rx.Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({ name, args }) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  set(newObj: object) {
    this.globalData = Object.assign(this.globalData, newObj);
    this.data.emit(newObj);
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}