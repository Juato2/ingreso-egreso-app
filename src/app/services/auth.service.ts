import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
// import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: Subscription;

  // Este _user es para poder obtener el uid en el servicio de ingreso-egreso.service.ts
  // que está aquí disponible y se usa pero sin necesidad de almacenarlo, pero para que lo
  // pueda usar en otro servicio lo inicializo y almaceno,
  // aunque, insisto, no lo necesito almacenar expresamente para este servicio. Por esta razón
  // creo la propiedad de sólo lectura y para eso hago lo siguiente:
  //  La propiedad es privada.
  //  El nombre de la propiedad va con un guión bajo delante '_'.
  //  Creo un getter para obtener su valor.
  private _user: Usuario;

  get user(): Usuario {
    // para prevenir mutaciones el return se haría así:
    // return { ...this._user };
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe((fbUser) => {
      // console.log(fbUser?.uid);
      if (fbUser) {
        // existe
        this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        // no existe
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
      }

    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  // El tipo devuelto por la Promesa no me lo reconocía VSCode hasta que he visto
  // el sigiente artículo https://jsmobiledev.com/article/ionic-firebase-tutorial-auth
  // y he añadido SÓLO la primera de las dos importaciones:
  //    import firebase from 'firebase/app';
  //    import 'firebase/auth';
  loginUsuario(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
