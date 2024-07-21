import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersRestService {
  private readonly entityUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.entityUrl);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.entityUrl}/${id}`);
  }

  revive(id: string): Observable<User> {
    return this.http.put<User>(`${this.entityUrl}/revive/${id}`, {});
  }
}
