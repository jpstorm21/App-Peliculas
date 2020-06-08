import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { PeliculaDetalle } from "../Interfaces/Interfaces";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = this.peliculas.find((x) => x.id === pelicula.id);
    let mensaje = "";
    if (!existe) {
      mensaje = "Película Agregada a favoritos";
      this.peliculas.push(pelicula);
    } else {
      this.peliculas = this.peliculas.filter((x) => x.id !== pelicula.id);
      mensaje = "Película removida de favoritos";
    }
    this.storage.set("peliculas", this.peliculas);
    this.presentToast(mensaje);
    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get("peliculas");
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);
    await this.cargarFavoritos();
    const existe = this.peliculas.find((x) => x.id === id);
    return existe ? true : false;
  }
}
