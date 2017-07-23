import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SimpleGlobal } from 'ng2-simple-global';

import { MainService } from '../shared/services/main.service';
import { CookieService } from '../shared/services/cookie.service';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ILogin } from './login.interface';

@Component({
  selector: 'login',
  providers: [
    MainService,
    CookieService
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
    private sg: SimpleGlobal,
    private route: ActivatedRoute,
    private router: Router,
    public mainService: MainService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(this.sg['isLoggedIn']){
      this.router.navigate(['']);
    }
  }

  onSubmit(model: ILogin, isValid: boolean) {
    if (isValid) {
      this.mainService.login(model.username, model.password)
        .subscribe((response: any) => {
          this.response = response;
          if (response.success_message) {
            this.cookieService.setCookie({
              name: 'token',
              value: response.jwt,
              session: true
            });

            this.sg['isLoggedIn'] = true;
            this.router.navigate(['']);
          }
        });
    }
  }

}
