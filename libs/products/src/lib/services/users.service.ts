import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
 
@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/users/');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/api/v1/users/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/api/v1/users/${userId}`);

  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  
}
