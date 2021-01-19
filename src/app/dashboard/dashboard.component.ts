import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      // La primera vez que se entra, el usuario es nulo porque todavía
      // no tenemos la respuesta desde firebase, inmediatamente nos cambia
      // con un valor. Nosotros debemos quedarnos sólo con el valor y no
      // pasar si es nulo, por eso usamos el pipe con el filter.
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        this.ingresoEgresoService.initIngresosEgresosListener(user.uid);
      });
  }

}
