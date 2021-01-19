import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

import { ChartsModule } from 'ng2-charts';

// Módulos
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';

// Módulos
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrdenIngresoPipe
  ],
  imports: [
    BrowserModule,

    AuthModule,

    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    StoreModule.forRoot(appReducers),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
