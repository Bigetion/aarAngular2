import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class MainService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getUserInfo(): Observable<object> {
    let data = {

    }
    return this.httpService.get(this.API_BASE_URL + 'app/getUserInfo', data, "Get User Info");
  }

  getModules(): Observable<object> {
    let data = {

    }
    return this.httpService.get(this.API_BASE_URL + 'app/getModules', data, "Get Modules");
  }

  login(username: string, password: string): Observable<object> {
    let data = {
      username: username,
      password: password
    }
    return this.httpService.get(this.API_BASE_URL + 'login', data, "Get Modules");
  }

  changePassword(userInfo: any, passwordOld: string, passwordNew: string): Observable<object> {
    let data = {
      idUser: userInfo.idUser,
      passwordOld: passwordOld,
      passwordNew: passwordNew
    }
    return this.httpService.get(this.API_BASE_URL + 'app/changePassword', data, "Change Password");
  }
}

