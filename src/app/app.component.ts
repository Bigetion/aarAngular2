/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CookieService } from './shared/services/cookie.service';
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
  constructor(
    public appState: AppState,
    private location: Location,
    private router: Router,
    private cookieService: CookieService,
    private mainService: MainService,
    private sg: SimpleGlobal
  ) { }

  public ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.sg['currentRoute'] = this.location.path();
      } else {
        this.sg['currentRoute'] = ''
      }
    });

    this.mainService.getUserInfo()
      .subscribe((response: any) => {
        if(response.id_role!=2) this.sg['isLoggedIn'] = true;
        this.sg['userInfo'] = response;
      })
  }

  logout() {
    this.cookieService.deleteCookie('token');
    this.router.navigate(['/login']);
    this.sg['isLoggedIn'] = false;
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
