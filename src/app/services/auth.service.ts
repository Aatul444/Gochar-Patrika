import * as auth from 'firebase/auth';
import { Injectable,NgZone } from '@angular/core';
import{AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/compat/firestore'
import{GoogleAuthProvider} from 'firebase/auth';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import{Router} from '@angular/router';
import { User } from '../shared/services/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; 
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone 
  ) {
  
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user !== null && user.emailVerified !== false ? true : false) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.setUserData(result.user);
        this.router.navigate(['/dashboard']);
      }
    } catch (error:any) {
      window.alert(error.message);
    }
  }
  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
      this.setUserData(result.user);
      this.router.navigate(['/login']);
    } catch (error:any) {
      window.alert(error.message);
    }
  }
  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
  async forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  async googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  async authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: any) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      emailVerified: user.emailVerified,
    };
    return userData
    // return userRef.set(userData, {
    //   merge: true,
    // });
  }
  // Sign out
  async signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}