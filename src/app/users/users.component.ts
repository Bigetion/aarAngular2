import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from '../app.service';

import { UsersService } from '../shared/services/users.service';
import { RolesService } from '../shared/services/roles.service';
import { ConfirmationService } from 'primeng/primeng';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { IUser } from './user.interface';

import * as _ from 'lodash';

@Component({
  selector: 'users',
  providers: [
    UsersService,
    RolesService
  ],
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  @ViewChild('actionTmpl') public actionTmpl: TemplateRef<any>;

  public userList: Array<object> = [];
  public roleList: Array<object> = [];
  public userColumns: Array<object> = [];
  public state: any = {
    isAdd: false,
    isEdit: false
  };

  public myForm: FormGroup;

  private selectedRow: any = null;

  constructor(
    private usersService: UsersService, 
    private rolesService: RolesService, 
    private fb: FormBuilder, 
    private confirmationService: ConfirmationService
  ) { }

  newFbGroupUserAdd() {
    return this.fb.group({
      userName: ['', Validators.required],
      idRole: ['', Validators.required]
    });
  }

  newFbGroupUserEdit(row: any) {
    return this.fb.group({
      userName: [row.username, Validators.required],
      idRole: [row.id_role, Validators.required]
    });
  }

  ngOnInit() {
    this.getData();
    this.userColumns = [{
      prop: 'username',
      name: 'User Name'
    }, {
      prop: 'role_name',
      name: 'Role Type'
    }, {
      prop: 'action',
      name: 'Action',
      cellTemplate: this.actionTmpl,
      maxWidth: 80
    }];

    this.myForm = this.newFbGroupUserAdd();
  }

  getData() {
    this.usersService.getData()
      .subscribe((response: any) => {
        if (response.data) {
          this.userList = response.data;
        };
      });

    let normalizeKey = function (arrayObj: any, keyObj: any) {
      let i;
      for (i = 0; i < arrayObj.length; i++) {
        for (let key in keyObj) {
          arrayObj[i][keyObj[key]] = arrayObj[i][key];
          delete arrayObj[i][key];
        }
      }
      return arrayObj;
    }

    this.rolesService.getData()
      .subscribe((response: any) => {
        if (response.data) {
          this.roleList = normalizeKey(response.data, {
            'id_role': 'value',
            'role_name': 'label'
          });
        };
      })
  }

  onClickIsAdd(condition: boolean) {
    this.state.isAdd = condition;
    if (condition) {
      this.myForm = this.newFbGroupUserAdd();
    }
  }

  onClickIsEdit(condition: boolean, row: any) {
    this.state.isEdit = condition;
    if (condition) {
      this.selectedRow = row;
      this.myForm = this.newFbGroupUserEdit(row);
    }
  }

  onClickDelete(row: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.usersService.submitDelete(row.id_user)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.userList.splice(row.$$index, 1);
            };
          })
      }
    });
  }
  
  onSubmitMyForm(model: IUser, isValid: boolean) {
    if (isValid) {
      let roleSelected: any = _.find(this.roleList, {value:model.idRole});
      if (this.state.isAdd) {
        this.usersService.submitAdd(model)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.state.isAdd = false;
              this.userList.push({
                id_user: response.id,
                username: model.userName,
                id_role: model.idRole,
                role_name: roleSelected.label
              })
            };
          })
      }

      if (this.state.isEdit) {
        this.usersService.submitEdit(this.selectedRow.id_user, model)
          .subscribe((response: any) => {
            if (response.success_message) {
              let roleSelected: any = _.find(this.roleList, {value:model.idRole});
              this.state.isEdit = false;
              this.selectedRow.username = model.userName;
              this.selectedRow.id_role = model.idRole;
              this.selectedRow.role_name = roleSelected.label;
            };
          })
      }
    }
  }

  onChange() {
    
  }
}
