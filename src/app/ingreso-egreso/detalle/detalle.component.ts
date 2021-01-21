import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({ items }) => this.ingresosEgresos = items);
  }

  borrar(uid: string): void {
    console.log(uid);
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire({
          title: 'Borrado',
          text: 'Item borrado',
          icon: 'success',
          timer: 2000
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      });
  }

}
