import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'c:/Users/firas/eshop/libs/products/src/lib/models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
    ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/api/v1/users/login`, { email, password });
  }
  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

}
