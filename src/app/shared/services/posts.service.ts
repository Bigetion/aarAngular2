import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AppConfig } from '../config/app.config';

@Injectable()
export class PostsService {

  private API_BASE_URL = AppConfig.API_ENDPOINT;

  constructor(public httpService: HttpService) { }

  getData(): Observable<object> {
    return this.httpService.get(this.API_BASE_URL + 'posts/getData', {}, "Get Data");
  }

  submitAdd(inputData): Observable<object> {
    let data = {
      postTitle: inputData.postTitle,
      postContent: inputData.postContent,
      description: inputData.description
    }
    return this.httpService.execute(this.API_BASE_URL + 'posts/submitAdd', data, "Add Data");
  }
  submitEdit(inputData): Observable<object> {
    let data = {
      idPost: inputData.idPost,
      postTitle: inputData.postTitle,
      postContent: inputData.postContent,
      description: inputData.description
    }
    return this.httpService.execute(this.API_BASE_URL + 'posts/submitEdit', data, "Update Data");
  }
  submitDelete(idPost): Observable<object> {
    let data = {
      idPost: idPost,
    }
    return this.httpService.execute(this.API_BASE_URL + 'posts/submitDelete', data, "Delete Data");
  }
}

