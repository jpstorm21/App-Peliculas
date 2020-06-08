import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../Interfaces/Interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private MoviesService: MoviesService) { }

  ngOnInit() {
    this.MoviesService.getFeatures().subscribe(
      res => {
        this.peliculasRecientes = res.results;
      }
    )
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.MoviesService.getPopulares()
      .subscribe(resp => {
        const arrTemp = [...this.populares,...resp.results]
        this.populares = arrTemp;
      })
  }
}
