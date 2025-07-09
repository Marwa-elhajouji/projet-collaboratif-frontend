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
  utilisateurAssigne?: {
    id: number;
    nom: string;
    prenom?: string;
    email?: string;
  };
  projet?: {
    id: number;
    nom: string;
  };
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
    const payload = {
      ...tache,
      utilisateurAssigne: { id: tache.utilisateurId },
      projet: { id: tache.projetId },
    };
    return this.http.post<Tache>(this.baseUrl, payload);
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateTache(id: number, tache: Tache): Observable<Tache> {
    const payload = {
      ...tache,
      utilisateurAssigne: { id: tache.utilisateurId },
      projet: { id: tache.projetId },
    };
    return this.http.put<Tache>(`${this.baseUrl}/${id}`, payload);
  }
}
