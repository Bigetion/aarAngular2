import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

@Injectable()
export class Notification {
  msgs: Message[] = [];

  success(message:string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: message });
    return this.msgs;
  }

  info(message:string) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', detail: message });
    return this.msgs;
  }

  warning(message:string) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', detail: message });
    return this.msgs;
  }

  error(message:string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', detail: message });
    return this.msgs;
  }

  clear(){
    return [];
  }
}