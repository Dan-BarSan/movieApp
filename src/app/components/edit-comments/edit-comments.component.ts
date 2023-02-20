import { Component, Input, OnInit } from '@angular/core';
import { commentSQL } from 'src/app/_models/commentSQL';

@Component({
  selector: 'app-edit-comments',
  templateUrl: './edit-comments.component.html',
  styleUrls: ['./edit-comments.component.css']
})
export class EditCommentsComponent implements OnInit{

  @Input() comm?: commentSQL;

  constructor(){}


  ngOnInit(): void{

  }

}
