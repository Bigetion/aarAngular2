import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';

import { MainService } from '../shared/services/main.service';
import { GlobalService } from "../shared/services/global.service";
import { CookieService } from '../shared/services/cookie.service';
import * as _ from 'lodash';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { IChangePassword } from './changepassword.interface';

@Component({
  selector: 'profile',
  providers: [

  ],
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public userInfo: any = {
    username: '',
    roleName: ''
  };
  public response: object = {
    error_message: false
  };
  public myForm: FormGroup;
  constructor(
    private appState: AppState,
    private mainService: MainService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) { }

  newFbGroupChangePassword(){
    this.myForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.userInfo = this.appState.get('userInfo');
    this.globalService.on('onChangeUserInfo', (userInfoData) => {
      this.userInfo = userInfoData;
    });

    this.newFbGroupChangePassword();
  }

  onSubmitChangePassword(model: IChangePassword, isValid: boolean){
    if(isValid) {
      this.response['error_message'] = false;
      this.mainService.changePassword(this.userInfo, model.password, model.newPassword)
        .subscribe((response: any) => {
          if (response.success_message) {
            this.globalService.set({notificationMessages:{
              severity: 'success', 
              summary: 'Success Message',
              detail: 'Password changed successfully'
            }})
            this.newFbGroupChangePassword();
          }else{
            this.response['error_message'] = 'The current password you entered is incorrect.';
          }
        });
    }
  }

}
