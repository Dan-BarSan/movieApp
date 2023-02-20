import { Component, OnInit } from '@angular/core';
import { commentSQL } from 'src/app/_models/commentSQL';
import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  //array for any given movies and related data
  movies: Movie[] = [];
  
  constructor(private movieService: MovieService){}

  

  ngOnInit(): void {
    //Loads inital movie catalog
    this.loadCatalog();
  }


  //Method to collect data from service with given string
  getMovies(searchString : string){
    this.movieService.getMovies(searchString).subscribe((movie: Movie[]) => {
      console.log(movie);
      this.movies = movie;
    })
  }


  loadCatalog(){
    this.movieService.getMovies("Avatar").subscribe((movie: Movie[]) => {
      console.log(movie);
      this.movies = movie;
    })
  }




}
