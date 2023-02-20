import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {
  //Create interface
  @Input('movie') movie : any;

  constructor(){}
  ngOnInit(): void {
    
  }

  //Gets Image for given title
  getImage(){
    //Set a genereic image in case no cover is found
    if(this.movie.Poster == 'N/A'){
      return 'https://via.placeholder.com/350';
    }else{
      //Returns movie cover
      return this.movie.Poster;
    };
  }z

}
