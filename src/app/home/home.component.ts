import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';
import { SimpleGlobal } from 'ng2-simple-global';

import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'home',
  providers: [
    MainService
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public moduleList: any[] = [];
  constructor(
    private sg: SimpleGlobal,
    private mainService: MainService, 
  ) { }

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.mainService.getModules()
      .subscribe((response: any) => {
        if (response.project) {
          response.project.forEach((item: string) => {
            let newItem = {
              'name': item,
              'controller': response[item]
            }
            this.moduleList.push(newItem);
          })
        }
      })
  }
}
