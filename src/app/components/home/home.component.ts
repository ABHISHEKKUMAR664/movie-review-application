import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface MovieDetail {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {
  moviesData: MovieDetail[] = [];
  filteredMovies: MovieDetail[] = [];
  searchQuery: string = '';

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.filterMovies();
    });

    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.moviesData = movies;
      this.filterMovies();
    });
  }


  // filterMovies(): void {
  //   if (this.searchQuery) {
  //     this.filteredMovies = this.moviesData.filter(movie => movie.movie.toLowerCase().includes(this.searchQuery.toLowerCase()));
  //   } else {
  //     this.filteredMovies = [...this.moviesData];
  //   }
  // }
  filterMovies(): void {
    if (this.searchQuery) {
      const matchingMovies = this.moviesData.filter(movie =>
        movie.movie.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (matchingMovies.length === 1) {
        // If exactly one movie matches the search query, navigate to the movie page
        const movieId = matchingMovies[0].id;
        this.router.navigate(['/movie-page', movieId]);
      } else {
        this.filteredMovies = matchingMovies;
      }
    } else {
      this.filteredMovies = [...this.moviesData];
    }
  }

}

