import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetService, Projet } from '../projet.service';

@Component({
  selector: 'app-liste-projets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-projets.component.html'
})
export class ListeProjetsComponent implements OnInit {
  projets: Projet[] = [];

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projetService.getProjets().subscribe(data => {
      this.projets = data;
    });
  }
}
