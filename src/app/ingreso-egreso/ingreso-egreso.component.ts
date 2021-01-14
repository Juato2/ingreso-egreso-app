import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo = 'ingreso';

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar(): void {
    if (this.ingresoForm.invalid) { return; }

    // console.log(this.ingresoForm.value);
    // console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch( (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      });
    });
  }

}
