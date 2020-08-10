import { Injectable } from '@angular/core';
import { UserI } from '../shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<UserI>;


  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,

  ) {
    this.checkUserState();
  }

  checkUserState() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<UserI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }


  async resentPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  async loginGoogle(): Promise<UserI> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  async register(email: string, password: string): Promise<UserI> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  async login(email: string, password: string): Promise<UserI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  isEmailVerified(user: UserI): boolean {
    return user.emailVerified === true ? true : false;
  }
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error --> ', error);
    }
  }

  private updateUserData(user: UserI) {
    const userRef: AngularFirestoreDocument<UserI> = this.afStore.doc(`users/${user.uid}`);

    const data: UserI = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };
    return userRef.set(data, { merge: true });
  }
}
