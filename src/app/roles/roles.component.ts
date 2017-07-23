import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from '../app.service';

import { RolesService } from '../shared/services/roles.service';
import { ConfirmationService } from 'primeng/primeng';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { IRoles } from './roles.interface';



@Component({
  selector: 'roles',
  providers: [
    RolesService
  ],
  styleUrls: ['./roles.component.css'],
  templateUrl: './roles.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RolesComponent implements OnInit {

  @ViewChild('actionTmpl') public actionTmpl: TemplateRef<any>;

  public roleList: Array<object> = [];
  public roleColumns: Array<object> = [];
  public state: any = {
    isAdd: false,
    isEdit: false
  };
  public myForm: FormGroup;

  private selectedRow: any = null;

  constructor(
    private rolesService: RolesService, 
    private fb: FormBuilder, 
    private confirmationService: ConfirmationService
  ) { }

  newFbGroupRoleAdd() {
    return this.fb.group({
      roleName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  newFbGroupRoleEdit(row: any) {
    return this.fb.group({
      roleName: [row.role_name, Validators.required],
      description: [row.description, Validators.required]
    });
  }



  ngOnInit() {
    this.getData();
    this.roleColumns = [{
      prop: 'role_name',
      name: 'Role Name'
    }, {
      prop: 'description',
      name: 'Description'
    }, {
      prop: 'action',
      name: 'Action',
      cellTemplate: this.actionTmpl
    }]
    this.myForm = this.newFbGroupRoleAdd();
  }

  getData() {
    this.rolesService.getData()
      .subscribe((response: any) => {
        if (response.data) {
          this.roleList = response.data;
        };
      })
  }

  onClickIsAdd(condition: boolean) {
    this.state.isAdd = condition;
    if (condition) {
      this.myForm = this.newFbGroupRoleAdd();
    }
  }

  onCLickIsEdit(condition: boolean, row: any) {
    this.state.isEdit = condition;
    if (condition) {
      this.selectedRow = row;
      this.myForm = this.newFbGroupRoleEdit(row);
    }
  }

  onClickDelete(row: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.rolesService.submitDelete(row.id_role)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.roleList.splice(row.$$index, 1);
            };
          })
      }
    });
  }

  onSubmitMyForm(model: IRoles, isValid: boolean) {
    if (isValid) {
      if (this.state.isAdd) {
        this.rolesService.submitAdd(model)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.state.isAdd = false;
              this.roleList.push({
                id_role: response.id,
                role_name: model.roleName,
                description: model.description
              })
            };
          })
      }

      if (this.state.isEdit) {
        this.rolesService.submitEdit(this.selectedRow.id_role, model)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.state.isEdit = false;
              this.selectedRow.role_name = model.roleName;
              this.selectedRow.description = model.description;
            };
          })
      }
    }
  }
}
