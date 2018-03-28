import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,  } from "@angular/http";
import { AppConfig } from '../../app/app.config';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class CommonMethodService {
  private headers = new Headers({ 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
  private options: any;
  public innerHeight: number
  constructor(private http: Http, private parentRouter: Router, private snackBar: MatSnackBar) {
    this.innerHeight = Window['innerHeight'];
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
    } else if (error && error.status === 400) {
      this.parentRouter.navigate(['./project-panel/no-access']);
    }
    this.openSnackBar(error.statusText || 'Unknown Error');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '!', {
      duration: 2000,
    });
  }
}
