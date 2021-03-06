import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';

import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'home',
  providers: [

  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public moduleList: any[] = [];
  constructor(
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.mainService.getModules()
      .subscribe((response: any) => {
        if (response) {
          for (let item in response) {
            let newItem = {
              'name': item,
              'controller': response[item]
            }
            this.moduleList.push(newItem);
          }
        }
      })
  }
}
