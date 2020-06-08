import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../Interfaces/Interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos : Genre [] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&languaje=es&include_image_languaje=es`;
    return this.http.get<T>(query);
  }

  getPopulares(){
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  buscarPeliculas( texto: string ){
    const query = `/search/movie?query=${texto}`
    return this.ejecutarQuery(query);
  }

  getFeatures() {

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`)
  }

  getPeliculaDetalle(id:string){
    const query = `/movie/${id}?a=1`;
    return this.ejecutarQuery<PeliculaDetalle>(query); 
  }

  getActoresPelicula(id:string){
    const query = `/movie/${id}/credits?a=1`;
    return this.ejecutarQuery<RespuestaCredits>(query); 
  }

  cargarGeneros(): Promise<Genre[]>{
    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp => {
        this.generos = resp['genres'];
        resolve(this.generos);
      })
    })
  }

}
