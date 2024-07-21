import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsRestService {
  private readonly entityUrl = `${environment.apiUrl}/questions`;

  constructor(private http: HttpClient) { }

  getRandom(): Observable<any> {
    return this.http.get(`${this.entityUrl}/random`);
  }
}
