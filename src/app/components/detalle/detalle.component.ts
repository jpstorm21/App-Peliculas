import { Component, OnInit, Input } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { PeliculaDetalle, Cast } from "../../Interfaces/Interfaces";
import { ModalController } from "@ionic/angular";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  oculto = 150;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  existe: string = 'star-outline';
  slidesOptActores = {
    slidesPerView: 3.3,
    freMode: true,
    spaceBetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {
    this.dataLocal.existePelicula(this.id)
      .then( resp => {
        if(resp) this.existe = 'star'
      })
    this.moviesService.getPeliculaDetalle(this.id).subscribe((resp) => {
      this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe((resp) => {
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.existe = existe ? 'star': 'star-outline';
  }
}
