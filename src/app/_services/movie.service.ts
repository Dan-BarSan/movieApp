import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../_models/responseApi';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL: string ='http://www.omdbapi.com/?';
  private API_KEY: string ='&apikey=4c93e1af';


  constructor(private http: HttpClient) { }


  //Gets a list of movies by TITLE
  getMovies(searchString: string): Observable<Movie[]>{
    return this.http.get<ResponseApi>(`${this.API_URL}&s=${searchString}${this.API_KEY}`).pipe(
      map(response =>{
        return response.Search;
      })
    )
  }

  //Gets an especific movie by given ID
  getMovie(id: string){
    return this.http.get<Movie>(`${this.API_URL}i=${id}${this.API_KEY}`).pipe(
      map(response => {
        return response;
      })
    )
  }

}
