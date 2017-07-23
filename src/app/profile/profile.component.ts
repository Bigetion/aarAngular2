import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';
import { SimpleGlobal } from 'ng2-simple-global';

import { HttpService } from '../shared/services/http.service';
import { CookieService } from '../shared/services/cookie.service';
import * as _ from 'lodash';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    private sg: SimpleGlobal,
    private appState: AppState
  ) { }


  ngOnInit() {
    if(this.sg['userInfo'].username && this.sg['userInfo'].roleName){
      this.userInfo = this.sg['userInfo'];
    }
  }

}
