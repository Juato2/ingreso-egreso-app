import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({ items }) => this.ingresosEgresos = items);
  }

  borrar(uid: string): void {
    console.log(uid);
  }

}
