import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class RolesService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getData(): Observable<object> {
    return this.httpService.get(this.API_BASE_URL + 'app/getRoleList', {}, "Get Data");
  }

  submitAdd(inputData: any): Observable<object> {
    var data = {
      roleName: inputData.roleName,
      description: inputData.description
    }
    return this.httpService.execute(this.API_BASE_URL + 'app/submitAddRole', data, "Add Data");
  }

  submitEdit(idRole: string, inputData: any): Observable<object> {
    var data = {
      idRole: idRole,
      roleName: inputData.roleName,
      description: inputData.description
    }
    return this.httpService.execute(this.API_BASE_URL + 'app/submitEditRole', data, "Update Data");
  }

  submitDelete(idRole: string): Observable<object> {
    var data = {
      idRole: idRole,
    }
    return this.httpService.execute(this.API_BASE_URL + 'app/submitDeleteRole', data, "Delete Data");
  }
}

