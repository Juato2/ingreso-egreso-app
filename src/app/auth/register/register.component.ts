import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import  * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( (ui) => this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(
        (credenciales) => {
          console.log(credenciales);
          this.store.dispatch(ui.stopLoading());

          // Swal.close();
          this.router.navigate(['/']);
        }
      )
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: '¡Oops..!',
          text: error.message,
          // footer: '<a href>Why do I have this issue?</a>'
        })
      }
      )
  }

}
