import { Component, OnInit } from '@angular/core';
import { Tache, TacheService } from '../tache.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../utilisateur.service';
import { ProjetService } from '../projet.service';
@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css'],
})
export class TacheComponent implements OnInit {
  taches: Tache[] = [];
  nouvelleTache: Tache = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: 'A_FAIRE',
    utilisateurId: 1,
    projetId: 1,
  };

  constructor(
    private tacheService: TacheService,
    private utilisateurService: UtilisateurService,
    private projetService: ProjetService
  ) {}
  utilisateurs: any[] = [];
  projets: any[] = [];

  ngOnInit(): void {
    this.chargerTaches();
    this.utilisateurService
      .getUtilisateurs()
      .subscribe((data) => (this.utilisateurs = data));
    this.projetService.getProjets().subscribe((data) => (this.projets = data));
  }

  chargerTaches(): void {
    this.tacheService.getAllTaches().subscribe((data) => (this.taches = data));
  }

  ajouterTache(): void {
    if (this.nouvelleTache.id) {

      this.tacheService
        .updateTache(this.nouvelleTache.id, this.nouvelleTache)
        .subscribe(() => {
          this.chargerTaches();
          this.resetFormulaire();
        });
    } else {
      this.tacheService.addTache(this.nouvelleTache).subscribe(() => {
        this.chargerTaches();
        this.resetFormulaire();
      });
    }
  }

  supprimerTache(id: number): void {
    this.tacheService.deleteTache(id).subscribe(() => this.chargerTaches());
  }
  getTachesParStatut(statut: string): Tache[] {
    return this.taches.filter((t) => t.statut === statut);
  }
  modifierTache(tache: Tache): void {
    this.nouvelleTache = {
      ...tache,
      utilisateurId: tache.utilisateurAssigne?.id ?? 1,
      projetId: tache.projet?.id ?? 1,
    };
  }
  resetFormulaire(): void {
    this.nouvelleTache = {
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      statut: 'A_FAIRE',
      utilisateurId: 1,
      projetId: 1,
    };
  }
}
