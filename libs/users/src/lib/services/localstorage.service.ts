import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  setToken(data) {
    localStorage.setItem(TOKEN, data);
  }
 
  getToken(): any {
   
 
    return localStorage.getItem(TOKEN);
  }
 
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
