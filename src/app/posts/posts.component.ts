import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from '../app.service';

import { PostsService } from '../shared/services/posts.service';
import { ConfirmationService } from 'primeng/primeng';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { IPost } from './post.interface';

import * as _ from 'lodash';

@Component({
  selector: 'posts',
  providers: [
    PostsService
  ],
  styleUrls: ['./posts.component.css'],
  templateUrl: './posts.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  @ViewChild('actionTmpl') public actionTmpl: TemplateRef<any>;

  public postList: Array<object> = [];
  public postColumns: Array<object> = [];
  public state: any = {
    isAdd: false,
    isEdit: false
  };

  public myForm: FormGroup;

  private selectedRow: any = null;

  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  newFbGroupPostAdd() {
    return this.fb.group({
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  newFbGroupPostEdit(row: any) {
    return this.fb.group({
      postTitle: [row.post_title, Validators.required],
      postContent: [row.post_content, Validators.required],
      description: [row.description, Validators.required]
    });
  }

  ngOnInit() {
    this.getData();
    this.postColumns = [{
      prop: 'post_title',
      name: 'Post Title'
    }, {
      prop: 'description',
      name: 'Description'
    }, {
      prop: 'action',
      name: 'Action',
      cellTemplate: this.actionTmpl,
      maxWidth: 80
    }];

    this.myForm = this.newFbGroupPostAdd();
  }

  getData() {
    this.postsService.getData()
      .subscribe((response: any) => {
        if (response.data) {
          this.postList = response.data;
        };
      });
  }

  onClickIsAdd(condition: boolean) {
    this.state.isAdd = condition;
    if (condition) {
      this.myForm = this.newFbGroupPostAdd();
    }
  }

  onClickIsEdit(condition: boolean, row: any) {
    this.state.isEdit = condition;
    if (condition) {
      this.selectedRow = row;
      this.myForm = this.newFbGroupPostEdit(row);
    }
  }

  onClickDelete(row: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.postsService.submitDelete(row.id_post)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.postList.splice(row.$$index, 1);
            };
          })
      }
    });
  }

  onSubmitMyForm(model: IPost, isValid: boolean) {
    if (isValid) {
      if (this.state.isAdd) {
        this.postsService.submitAdd(model)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.state.isAdd = false;
              this.postList.push({
                id_post: response.id,
                post_title: model.postTitle,
                post_content: model.postContent,
                description: model.Description,
              })
            };
          })
      }

      if (this.state.isEdit) {
        model.idPost = this.selectedRow.id_post;
        this.postsService.submitEdit(model)
          .subscribe((response: any) => {
            if (response.success_message) {
              this.state.isEdit = false;
              this.selectedRow.post_title = model.postTitle;
              this.selectedRow.post_content = model.postContent;
              this.selectedRow.description = model.Description;
            };
          })
      }
    }
  }

  onChange() {

  }
}
