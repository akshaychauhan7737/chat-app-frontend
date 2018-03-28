import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,  } from "@angular/http";
import { AppConfig } from '../../app/app.config';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class CommonMethodService {
  private headers = new Headers({ 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
  private options: any;
  public innerHeight: number;
  public current_user: any = null;
  constructor(private http: Http, private parentRouter: Router, private snackBar: MatSnackBar) {
    this.innerHeight = window['innerHeight'];
  }

  serverRequest(url: string, type: string, data: any) {
    if (type === 'get')
      return this.http[type](AppConfig.SERVER_DEMAIN + url, this.options);
    if (type === 'post' || type === 'put')
      return this.http[type](AppConfig.SERVER_DEMAIN + url, data, this.options);
  }

  webApiError(error: any) {
    if (error && error.status === 401) {
      this.parentRouter.navigate(['./login']);
    } else if (error && error.status === 400 && error._body) {
      let err = JSON.parse(error._body);
      if (err.length) {
        error.statusText = err[0].msg;
      }
    }
    this.openSnackBar(error.statusText || 'Unknown Error');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '!', {
      duration: 2000,
    });
  }
}
