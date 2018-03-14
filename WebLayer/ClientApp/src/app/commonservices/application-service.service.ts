import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Student, Enrollment } from './../applicationDomainModel';



@Injectable()
export class ApplicationServiceService {


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl) {

  }

  getAllStudents(): Observable<Student[]> {

    return this.http.get<Student[]>('api/FetchData/GetAllStudents')
      .pipe(catchError(this.handleError));
  }

  getStudentsEnrollment(studentId: number): Observable<Enrollment[]> {
    let params = new HttpParams();
    params = params.append('studentID', studentId.toString());
    return this.http.get<Enrollment[]>('api/FetchData/GetStudentCourseEnrollment', { params: params })
    .pipe(catchError(this.handleError));
  }

  private handleError<T>(error: HttpErrorResponse, caught: T) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    return new ErrorObservable(
      {
        hasError: true,
        HttpCode: error.status,
        Message: error.error
      });
  }


}
