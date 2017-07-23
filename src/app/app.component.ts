/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from './shared/services/cookie.service';
import { GlobalService } from './shared/services/global.service';

import { MainService } from './shared/services/main.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public route: string;
  public isLoggedIn: boolean;
  constructor(
    public appState: AppState,
    private location: Location,
    private router: Router,
    private cookieService: CookieService,
    private globalService: GlobalService,
    private mainService: MainService,
  ) { }

  public ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.route = this.location.path();
      } else {
        this.route = ''
      }
    });

    this.globalService.data.subscribe((data: any) => {
      if (data.isLoggedIn) {
        this.setLogin(data.isLoggedIn);
        this.getUserInfo();
      }
    });

    this.getUserInfo();

    const token = this.cookieService.getCookie('token');
    if (token) {
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }
  }

  private getUserInfo() {
    this.mainService.getUserInfo()
      .subscribe((response: any) => {
        this.appState.set('userInfo', response);
        this.globalService.broadcast('onChangeUserInfo', response);
      })
  }

  private setLogin(condition) {
    this.isLoggedIn = condition;
    this.appState.set('isLoggedIn', condition);
  }

  logout() {
    this.setLogin(false);
    this.cookieService.deleteCookie('token');
    this.router.navigate(['/login']);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */