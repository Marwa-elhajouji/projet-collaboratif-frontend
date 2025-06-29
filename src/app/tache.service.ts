import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

export interface Tache {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  statut: 'A_FAIRE' | 'EN_COURS' | 'TERMINEE';
  utilisateurId: number;
  projetId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private baseUrl = `${environment.apiUrl}/taches`;

  constructor(private http: HttpClient) {}

  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.baseUrl);
  }

  addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.baseUrl, tache);
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
