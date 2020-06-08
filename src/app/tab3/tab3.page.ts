import { Component, OnInit } from "@angular/core";
import { PeliculaDetalle, Genre } from "../Interfaces/Interfaces";
import { DataLocalService } from "../services/data-local.service";
import { MoviesService } from "../services/movies.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private movieService: MoviesService
  ) {}

  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.movieService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];
    generos.forEach((genero) => {
      this.favoritoGenero.push({
        genero: genero.name,
        peliculas: peliculas.filter((x) => {
          return x.genres.find((y) => y.id === genero.id);
        }),
      });
    });
  }
}
