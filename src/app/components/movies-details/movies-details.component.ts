import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/_services/movie.service';
import {ActivatedRoute} from '@angular/router';
import { Movie } from 'src/app/_models/movie';
import { CommentSQLService } from 'src/app/_services/comment-sql.service';
import { Entry } from 'src/app/shared/entry';
import { commentSQL } from 'src/app/_models/commentSQL';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  @Input() comment?: commentSQL;

  //Adds commentSQL class
  comms: commentSQL[] = [];


  //Adds movie class
  movie: Movie;

  constructor(private commentSQLService: CommentSQLService, private movieService: MovieService, private route: ActivatedRoute,){}

  ngOnInit(): void {
    this.loadMovie();

    //VACIO --->>CORREGIR
    //this.loadComments(this.movie.imdbID);

    //Default string for testing
    this.loadComments("tt0499549");


    //Disable - duplicate

    // this.comment.title_id  is changed to "tt0499549" for testing purpose 
    /*
    this.commentSQLService.getComments("tt0499549").subscribe((comm: commentSQL[]) => {
      console.log(comm);
      this.comms = comm;
    })*/
  }

  loadMovie(){
    this.movieService.getMovie(this.route.snapshot.paramMap.get('id')).subscribe(movie => {
      this.movie = movie;
      console.log(movie);
    })
  }

  loadComments(searchString: string){

    //Con string adds an extra '/movies' in the URL ---> cannot send data to proper section.
    // modify for this  particular instance? - change API?
    this.commentSQLService.getComments(searchString).subscribe((
      comment : commentSQL[]) =>{

        console.log(comment);
        this.comms = comment;

    })

  }

  

 

}
