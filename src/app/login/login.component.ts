import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MainService } from '../shared/services/main.service';
import { GlobalService } from '../shared/services/global.service';
import { CookieService } from '../shared/services/cookie.service';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ILogin } from './login.interface';

@Component({
  selector: 'login',
  providers: [
    
  ],
  styles: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup;
  public response: object = {
    error_message: false
  };

  constructor(
    private appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    public mainService: MainService,
    private globalService: GlobalService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.appState.get('isLoggedIn')) {
      this.router.navigate(['']);
    }

    this.globalService.broadcast('loggedIn', true);
  }

  onSubmit(model: ILogin, isValid: boolean) {
    if (isValid) {
      this.mainService.login(model.username, model.password)
        .subscribe((response: any) => {
          this.response['error_message'] = false;
          if (response.success_message) {
            this.cookieService.setCookie({
              name: 'token',
              value: response.jwt,
              session: true
            });

            this.globalService.set({ isLoggedIn: true });
            this.router.navigate(['']);
          }else{
            this.response['error_message'] = 'The username or password you entered is incorrect.';
          }
        });
    }
  }

}