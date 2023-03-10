import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movie-flix.herokuapp.com/';
// const apiUrl = `https://my-movie-flix.herokuapp.com/login?Username=${username}&Password=${password}`;


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
    // this.http = http;
    }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<Response>(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<Response>(apiUrl + `login?Username=${userDetails.Username}&Password=${userDetails.Password}`, userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'movies?Username=rehan&Password=password', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  


  // get one movie
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + '/movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // get director name
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + '/movies/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // get genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + '/movies/genres/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // get a single user info 
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // get list of favorite movies for selected user
  getFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // update user info 
  editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<Response>(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // delete user 
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<Response>(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // delete favorite movie from user 
  deleteFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<Response>(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  
// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }


private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}











// @Injectable({
//   providedIn: 'root'
// })
// export class FetchApiDataService {

//   constructor() { }
// }
