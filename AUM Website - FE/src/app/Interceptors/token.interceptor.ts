import { TokenApiModel } from './../Models/token-api.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:UserService, private router:Router, private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(catchError((err:any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          return this.handleUnauthorizedError(request, next);
        }
      }

      return throwError(() => new Error("Error in token.interceptor.ts"));
    }))
  }

  handleUnauthorizedError(req:HttpRequest<any>, next:HttpHandler){
    let tokenApiModel = new TokenApiModel();

    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel).pipe(
      switchMap((data:TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);

        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })

        return next.handle(req);
      }),
      catchError((error) => {
        return throwError(() => {
          // alert("Token is expired, Login again!");
          this.toast.error("Token is expired, Login again!", 'Error!', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['login']);
        })
      })
    )
  }
}
