import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router= inject(Router)
  const token = sessionStorage.getItem('token')
  if(token){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(req).pipe(catchError(error=>{
      console.log("Error :", error)
      if(error){
        sessionStorage.removeItem('token')
        router.navigate(['/'])
      }
      return throwError(() => new Error('Error with user token'))
    }))
  }
  return next(req)

 
};
