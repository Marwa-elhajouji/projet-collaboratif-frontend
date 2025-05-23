import { Component, OnInit } from '@angular/core';
import { Tache, TacheService } from '../tache.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
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
    projetId: 1
  };

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.chargerTaches();
  }

  chargerTaches(): void {
    this.tacheService.getAllTaches().subscribe(data => this.taches = data);
  }

  ajouterTache(): void {
    this.tacheService.addTache(this.nouvelleTache).subscribe(() => {
      this.chargerTaches();
      this.nouvelleTache = {
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        statut: 'A_FAIRE',
        utilisateurId: 1,
        projetId: 1
      };
    });
  }

  supprimerTache(id: number): void {
    this.tacheService.deleteTache(id).subscribe(() => this.chargerTaches());
  }
}
