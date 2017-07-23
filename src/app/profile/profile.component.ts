import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';

import { HttpService } from '../shared/services/http.service';
import { GlobalService } from '../shared/services/global.service';
import { CookieService } from '../shared/services/cookie.service';
import * as _ from 'lodash';

import { EventsService } from "../shared/services/events.service";

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
  constructor(private appState: AppState, private globalService: GlobalService, private eventsService: EventsService) {
  }


  ngOnInit() {
    // if (this.globalService.data.userInfo) {
    //   this.userInfo = this.globalService.data.userInfo;
    // } else {
    //   this.globalService.dataChange.subscribe((data: any) => {
    //     this.userInfo = data.userInfo;
    //   });
    // }
    this.userInfo = this.appState.get('userInfo');
    this.eventsService.on('onChangeUserInfo', (userInfoData) => {
      this.userInfo = userInfoData;
    });
  }

}
