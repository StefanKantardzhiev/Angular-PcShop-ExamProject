import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser | null = null;

  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$.asObservable();

  get isLoggedIn() {
    return this.user !== null;
  }
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post<IUser>('/auth/register', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http.post<IUser>('/auth/login', { email, password });
  }

  logout() {
    return this.http.post<void>('/auth/logout', {});
  }
  getProfile() {
    return this.http.get<IUser>('/auth/profile');
  }
}
