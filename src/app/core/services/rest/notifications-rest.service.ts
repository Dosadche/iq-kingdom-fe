import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fight } from 'src/app/shared/models/fight.model';
import { Notification } from 'src/app/shared/models/notification.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsRestService {
  private readonly entityUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  getByUserId(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.entityUrl}/${userId}`);
  }

  read(ids: string[]): Observable<Notification[]> {
    return this.http.put<Notification[]>(`${this.entityUrl}/read`, { notificationsIds: ids });
  }
}
