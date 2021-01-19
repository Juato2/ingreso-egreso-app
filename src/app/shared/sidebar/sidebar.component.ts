import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre = '';
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter((auth) => {
          return auth.user !== null;
        })
      )
      .subscribe(({ user }) => this.nombre = user.nombre);
  }

  cerrarSesion(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
