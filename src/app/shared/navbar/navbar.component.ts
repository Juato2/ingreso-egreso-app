import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombre = '';
  userSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

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

}
