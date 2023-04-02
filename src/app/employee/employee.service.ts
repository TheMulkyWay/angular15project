import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IEmployee } from './IEmployee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{

private employeesUrlOrig='api/employees';
private employeesUrl='http://localhost:3000/employees';

constructor(private http: HttpClient){}

getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.employeesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getEmployees2(): Observable<IEmployee[]>{ 
    return this.http.get<IEmployee[]>(this.employeesUrl);}



  getEmployee(id: number): Observable<IEmployee> {
    if (id === 0) {
      return of(this.initializeEmployee());
    }
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<IEmployee>(url)
      .pipe(
        tap(data => console.log('getIEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  addEmployee(employee: IEmployee): Observable<IEmployee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    employee.id = 0;
    return this.http.post<IEmployee>(this.employeesUrl, employee, { headers })
      .pipe(
        tap(data => console.log('addEmployess: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put<IEmployee>(url, employee, { headers })
      .pipe(
        tap(() => console.log('updateEmployee: ' + employee.id)),
        // Return the employeeon an update
        map(() => employee),
        catchError(this.handleError)
      );
  }



deleteEmployee(id: number): Observable<{}> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.employeesUrl}/${id}`;
  return this.http.delete<IEmployee>(url, { headers })
    .pipe(
      tap(data => console.log('deleteEmployee: ' + id)),
      catchError(this.handleError)
    );
}



  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  initializeEmployee(): IEmployee
{
    return {
		id:0, 
		fullName: '',
		email: '',
		phone: '',
		contactPreference: '',
		skills :  []
            }
}



}