import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
// import { MovieNameComponent } from './components/movie-name/movie-name.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movie-page/:id', component: MoviePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
