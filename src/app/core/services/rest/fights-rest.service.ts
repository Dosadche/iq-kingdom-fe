import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fight } from 'src/app/shared/models/fight.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FightsRestService {
  private readonly entityUrl = `${environment.apiUrl}/fights`;

  constructor(private http: HttpClient) { }

  getByUserId(userId: string): Observable<Fight[]> {
    return this.http.get<Fight[]>(`${this.entityUrl}/${userId}`);
  }

  attack(fight: Fight, defenderId: string): Observable<Fight> {
    return this.http.post<Fight>(`${this.entityUrl}/attack/${defenderId}`, fight);
  }
  
  defend(fightId: string, correctAnswers: number): Observable<Fight> {
    return this.http.put<Fight>(`${this.entityUrl}/defend/${fightId}`, { correctAnswers });
  }
}
