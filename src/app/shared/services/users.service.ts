import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class UsersService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getData(): Observable<object> {
    return this.httpService.get(this.API_BASE_URL + 'users/getData', {}, "Get Data");
  }

  submitAdd(inputData): Observable<object> {
    let data = {
      userName: inputData.userName,
      idRole: inputData.idRole
    }
    return this.httpService.execute(this.API_BASE_URL + 'users/submitAdd', data, "Add Data");
  }
  submitEdit(idUser, inputData): Observable<object> {
    let data = {
      idUser: idUser,
      userName: inputData.userName,
      idRole: inputData.idRole
    }
    return this.httpService.execute(this.API_BASE_URL + 'users/submitEdit', data, "Update Data");
  }
  submitDelete(idUser): Observable<object> {
    let data = {
      idUser: idUser,
    }
    return this.httpService.execute(this.API_BASE_URL + 'users/submitDelete', data, "Delete Data");
  }
}

