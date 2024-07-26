import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../services/toastService/toast.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.error(errorMsg);
        this.handleError(error);
        return throwError(errorMsg);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        this.toast.showError('Bad Request: The request was invalid or cannot be served', 'Error');
        break;
      case 401:
        this.toast.showError('Unauthorized: The request requires authentication', 'Error');
        // Optionally, redirect to login page
        this.router.navigate(['/login']);
        break;
      case 403:
        this.toast.showError('Forbidden: The server refused to respond to the request', 'Error');
        break;
      case 404:
        this.toast.showError('Not Found: The requested resource could not be found', 'Error');
        break;
      case 500:
        this.toast.showError('Internal Server Error: The server encountered an unexpected condition', 'Error');
        break;
      default:
        this.toast.showError('An unexpected error occurred', 'Error');
    }
  }
}

//enum