import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { commentSQL } from '../_models/commentSQL';
import { environment } from '../enviroments/enviroment';
import { Router, UrlSerializer } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CommentSQLService {

  //Service URL
  private url="Comment"

  constructor(private http: HttpClient, private router: Router,
     private serializer: UrlSerializer) { }

  public getComments(searchString: string) : Observable<commentSQL[]>{

  
    //Angular objeto a URL ---> Buscar

    //Construccion de cadena
    //https://localhost:7033/api/Comment?id=1&publi_name=Dan&title_id=tt0499549&comment=something%20RENOVATED%20%233%20
    const tree = this.router.createUrlTree([],{
      queryParams: {
        id: 0,
        publi_name: "na",
        comment: "na",
        title_id: searchString
      }
    });
     console.log(this.serializer.serialize(tree));
    
    return this.http.get<commentSQL[]>(`${environment.apiUrl}/${this.url}${this.serializer.serialize(tree)}`).pipe(
      map(response =>{
        return response;
      })
    )

  }


  //Connection Test
  public getTest(): Observable<any>{
    return this.http.get<any>('https://localhost:7033/api/Comment');
  } 

}
