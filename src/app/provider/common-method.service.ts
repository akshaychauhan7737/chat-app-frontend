import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,  } from "@angular/http";
import { AppConfig } from '../../app/app.config';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class CommonMethodService {
  /* Common header for HTTP request */
  private headers = new Headers({ 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
  /* Common header options for HTTP request */
  private options: any;
  /* Window height variable */
  public innerHeight: number;
  /* Current user variable */
  public current_user: any = null;
  constructor(private http: Http, private parentRouter: Router, private snackBar: MatSnackBar) {
    this.innerHeight = window['innerHeight'];
  }
  /* Http service method */
  serverRequest(url: string, type: string, data: any) {
    if(navigator.onLine) {
      if (type === 'get')
        return this.http[type](AppConfig.SERVER_DEMAIN + url, this.options);
      if (type === 'post' || type === 'put')
        return this.http[type](AppConfig.SERVER_DEMAIN + url, data, this.options);
    } else {
      this.openSnackBar(AppConfig.ERROR_MESSAGE.NO_INTERNET_ERROR);
    }
  }
  /* handle web service error method */
  webApiError(error: any) {
    if (error && error.status === 401) {
      this.parentRouter.navigate(['./login']);
      this.current_user = null;
    } else if (error && error.status === 400 && error._body) {
      let err = JSON.parse(error._body);
      if (err.length) {
        error.statusText = err[0].msg;
      }
    }
    this.openSnackBar(error.statusText || AppConfig.ERROR_MESSAGE.UNKNOWN_ERROR);
  }
  /* Show message on snack bar method */
  openSnackBar(message: string) {
    this.snackBar.open(message, '!', {
      duration: 2000,
    });
  }
  /* Scroll to bottom chat div */
  scrollChat() {
    var element = document.getElementById('message-list');
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
}
