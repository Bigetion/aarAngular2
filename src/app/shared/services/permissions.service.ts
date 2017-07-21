import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class PermissionsService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getPermissions(): Observable<object> {
    return this.httpService.get(this.API_BASE_URL + 'app/getPermissions', {}, "Get Permissions");
  }

  updatePermissions(permissions): Observable<object> {
    let data = {
      permissions: permissions
    }
    return this.httpService.execute(this.API_BASE_URL + 'app/updatePermissions', data, "Update Permissions");
  }
}

