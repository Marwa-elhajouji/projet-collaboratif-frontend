import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-utilisateurs.component.html',
})
export class ListeUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => {},
    });
  }

  ajouterUtilisateur(): void {
    this.router.navigate(['/utilisateurs/nouveau']);
  }

  modifierUtilisateur(id: number): void {
    this.router.navigate(['/utilisateurs/modifier', id]);
  }

  supprimerUtilisateur(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
        this.utilisateurs = this.utilisateurs.filter((u) => u.id !== id);
      });
    }
  }
}
