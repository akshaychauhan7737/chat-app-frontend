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
          (successs: any) => {
            console.log(successs)
            observer.next(successs);
            observer.complete();
          },
          (error: any) => {
            if (error && error.status === 400) {
              observer.next(JSON.parse(error._body));
            } else if (error.status === 401) {
              this.router.navigate(['./login']);
            } else {
              this.commonMehod.webApiError(error);
            }
            observer.complete();
          })
    })
  }
}