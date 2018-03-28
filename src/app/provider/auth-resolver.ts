import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CommonMethodService } from './common-method.service';
import { AppConfig } from '../app.config';
@Injectable()
export class AuthResolver implements Resolve<any> {
  constructor(
    private commonMehod: CommonMethodService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return new Observable(observer => {
      this.commonMehod.serverRequest(AppConfig.SERVER_URLS.IS_AUTHENTICATE, 'get', null)
        .map((response: any) => response.json()).subscribe(
          (success: any) => {
            this.commonMehod.current_user = success.user;
            observer.next(success);
            observer.complete();
          },
          (error: any) => {
            this.commonMehod.webApiError(error);
            observer.complete();
          })
    })
  }
}