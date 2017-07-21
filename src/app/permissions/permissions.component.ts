import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';

import { HttpService } from '../shared/services/http.service';
import { CookieService } from '../shared/services/cookie.service';

import { PermissionsService } from '../shared/services/permissions.service';

import * as _ from 'lodash';

@Component({
  selector: 'permissions',
  providers: [
    PermissionsService
  ],
  styleUrls: ['./permissions.component.css'],
  templateUrl: './permissions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PermissionsComponent implements OnInit {
  public permissionList: Array<object> = [];
  constructor(private permissionsService: PermissionsService) { }

  roleList: any[] = [];
  moduleList: any[] = [];
  functionModel: any = {};

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    this.permissionsService.getPermissions()
      .subscribe((response: any) => {
        let moduleList: any[] = [];
        response.project.forEach((module) => {
          response.controller[module].forEach((controller) => {
            let newModule = {
              moduleName: module,
              controllerName: controller,
              functionList: response.function[controller]
            }
            moduleList.push(newModule);
          });
        });
        this.moduleList = moduleList;

        let roleList = [];
        response.data.forEach((item) => {
          if (item.permission != null) item.permission = item.permission.split('---');
          else item.permission = [];

          let roleItem = {
            id_role: item.id_role,
            role_name: item.role_name
          }
          roleList.push(roleItem);

          this.functionModel[item.id_role] = {};

          this.moduleList.forEach((moduleListItem) => {
            moduleListItem.functionList.forEach((functionListItem) => {
              this.functionModel[item.id_role][moduleListItem.moduleName + '.' + moduleListItem.controllerName + '.' + functionListItem] = item.id_role == '1' || _.findIndex(item.permission, function (o) {
                return o == (moduleListItem.moduleName + '.' + moduleListItem.controllerName + '.' + functionListItem)
              }) > -1;
            });
          });
        });
        this.roleList = roleList;
      })
  }

  onChangeCheckBox(cKey, cKey2) {
    let permissions: object = {};

    for (let key in this.functionModel) {
      let item = this.functionModel[key];
      permissions[key] = [];
      for (let key2 in this.functionModel[key]) {
        let item2 = this.functionModel[key][key2];
        if (item2) {
          permissions[key].push(key2);
        }
      }
      permissions[key] = permissions[key].join('---');
    }
    this.permissionsService.updatePermissions(permissions)
      .subscribe((response) => {

      });
  }
}
