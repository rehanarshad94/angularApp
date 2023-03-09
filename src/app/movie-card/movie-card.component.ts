// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-movie-card',
//   templateUrl: './movie-card.component.html',
//   styleUrls: ['./movie-card.component.scss']
// })
// export class MovieCardComponent {

// }


import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  
  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {}

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiDataService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //opens genre window
openGenreCardComponent(name: string, description: string): void {
  this.dialog.open(GenreCardComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '450px',
  });
}

// opens director window
openDirectorCardComponent(name: string, bio: string, birth: string): void {
  this.dialog.open(DirectorCardComponent, {
    data: {
      Name: name,
        Bio: bio,
        Birth: birth
    },
    width: '450px',
  });
}

openSynopsisComponent(title: string, description: string): void {
  this.dialog.open(SynopsisComponent, {
    data: {
      Name: title,
      Description: description
    }
  });
}

}
