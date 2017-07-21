import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class MainService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getModules(): Observable<object> {
    let data = {

    }
    return this.httpService.get(this.API_BASE_URL + 'app/getModules', data, "Get Modules");
  }

  login(username: string, password: string): Observable<object> {
    let data = {
      username : username,
      password : password
    }
    return this.httpService.get(this.API_BASE_URL + 'login', data, "Get Modules");
  }
}

