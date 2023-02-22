import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';
import { MoviesComponent } from './components/movies/movies.component';


import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EditEntryComponent } from './components/edit-entry/edit-entry.component';


//Enables navigation in the webpage under an array of given paths
const routes: Routes =[

  //Empty path
  {path: '', component: MoviesComponent},

  //User request DETAILS page
  {path: 'movies/:id', component: MoviesDetailsComponent},

  //User request unauthorized page (Wildcard)
  {path: '**', component: MoviesComponent, pathMatch: 'full'},


  //Delete this section on CLEANUP
  //Comments handler
  { path: '', pathMatch: 'full', redirectTo: 'add-entry' },
  { path: 'add-entry', component: AddEntryComponent },
  { path: 'edit-entry/:id', component: EditEntryComponent },
  { path: 'entry-list', component: EntryListComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
