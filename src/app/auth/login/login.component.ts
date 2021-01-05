import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }
    Swal.showLoading();
    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then(usuario => {
        Swal.hideLoading();
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: '¡Oops..!',
          text: error.message,
          // footer: '<a href>Why do I have this issue?</a>'
        })
      })
  }

}
