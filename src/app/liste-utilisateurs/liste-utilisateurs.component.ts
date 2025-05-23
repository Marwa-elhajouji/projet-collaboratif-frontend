import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  providers: [UtilisateurService],
  templateUrl: './liste-utilisateurs.component.html',
})
export class ListeUtilisateursComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }
}
