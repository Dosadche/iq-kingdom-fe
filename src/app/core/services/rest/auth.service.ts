import { Injectable } from '@angular/core';
import { LoginCredentials, RegisterCredentials } from '../../../shared/models/auth-credentials.model';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface JWTTokens {
  accessToken: string,
  refreshToken: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  private readonly entityUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(credentials: RegisterCredentials): Observable<User> {
    return this.http.post<User>(`${this.entityUrl}/register`, credentials);
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.entityUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.entityUrl}/logout`);
  }

  refreshToken(refreshToken: string): Observable<JWTTokens> {
    return this.http.post<JWTTokens>(`${this.entityUrl}/refresh-token`, {
      refreshToken
    });
  }
}
