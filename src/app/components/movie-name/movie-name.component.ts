import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieDetail } from '../home/home.component';

@Component({
  selector: 'app-movie-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-name.component.html',
  styleUrls: ['./movie-name.component.css']
})
export class MovieNameComponent implements OnInit {
  movies: MovieDetail[] = [];
  @Output() movieSelected = new EventEmitter<number>();

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies.map(movie => ({
        id: movie.id,
        movie: movie.movie,
        rating: movie.rating,
        image: movie.image,
        imdb_url: movie.imdb_url
      }));
    });
  }

  onMovieSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedMovieId = Number(selectElement.value);
    this.movieSelected.emit(selectedMovieId);
  }
}
// export class MovieNameComponent {
//   movies: any[] = [];
//   @Output() movieSelected = new EventEmitter<number>();

//   constructor(private movieService: MovieService) { }

//   ngOnInit() {
//     this.movieService.movieNames$.subscribe(data => this.movies = data);
//   }

//   onMovieSelect(event: Event) {
//     const selectElement = event.target as HTMLSelectElement;
//     const selectedMovieId = Number(selectElement.value);
//     this.movieSelected.emit(selectedMovieId);
//   }
// }
