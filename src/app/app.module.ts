import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AccordionModule} from 'ngx-bootstrap/accordion';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { AngularMaterialModule } from './material.module';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './enviroments/enviroment';

import { AngularFireModule} from '@angular/fire/compat' 
import { EntryService } from './shared/entry.service';
import { MatTableModule } from '@angular/material/table';

import{FormsModule,ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesDetailsComponent,
    CardMovieComponent,
    AddEntryComponent,
    EditEntryComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    
  ],
  providers: [EntryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
