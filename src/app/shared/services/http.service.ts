import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppState } from './../../app.service';
import { CookieService } from './cookie.service';

@Injectable()
export class HttpService {

  constructor(private http: Http, private cookieService: CookieService, private router: Router, private appState: AppState) { }


  public get(url: string, data: object, actionName: string): Observable<object> {
    let body = JSON.stringify(data);
    let headersObj = {
      'Accept': 'application/json'
    }
    let token = this.cookieService.getCookie('token');

    if (token) {
      headersObj = Object.assign(headersObj, {
        'Authorization': 'Bearer ' + token
      });
    }

    let headers = new Headers(headersObj);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map((res: Response) => {
        if (res.json().require_login) {
          this.cookieService.deleteCookie('token');
          this.appState.set('isLoggedIn', false);
          this.router.navigate(['/login']);
        }
        return res.json();
      })
      .catch(this.handleError);
  }

  public execute(url: string, data: object, actionName: string): Observable<object> {
    let body = JSON.stringify(data);
    let headersObj = {
      'Accept': 'application/json'
    }
    let token = this.cookieService.getCookie('token');

    if (token) {
      headersObj = Object.assign(headersObj, {
        'Authorization': 'Bearer ' + token
      });
    }

    let headers = new Headers(headersObj);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map((res: Response) => {
        if (res.json().require_login) {
          this.cookieService.deleteCookie('token');
          this.appState.set('isLoggedIn', false);
          this.router.navigate(['/login']);
        }
        return res.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

