
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjetService, Projet } from '../projet.service';

@Component({
  selector: 'app-liste-projets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './liste-projets.component.html',
})
export class ListeProjetsComponent implements OnInit {
  projets: Projet[] = [];
  projetForm: FormGroup;
  editing = false;
  editedProjetId: number | null = null;

  constructor(private projetService: ProjetService, private fb: FormBuilder) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.chargerProjets();
  }

  chargerProjets(): void {
    this.projetService.getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

  onSubmit(): void {
    if (this.projetForm.invalid) return;

    const projetData = this.projetForm.value;

    if (this.editing && this.editedProjetId !== null) {
      this.projetService
        .updateProjet(this.editedProjetId, projetData)
        .subscribe((response) => {
          this.chargerProjets();
          this.cancelEdit();
          alert('Projet mis à jour avec succès !');
        });
    } else {
      this.projetService.addProjet(projetData).subscribe(() => {
        this.projetForm.reset();
        this.chargerProjets();
        alert('Projet ajouté avec succès !');
      });
    }
  }

  onEdit(projet: Projet): void {
    this.editing = true;
    this.editedProjetId = projet.id || null;
    this.projetForm.patchValue({
      nom: projet.nom,
      description: projet.description,
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.editedProjetId = null;
    this.projetForm.reset();
  }

  onDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(() => {
        this.chargerProjets();
        alert('Projet supprimé.');
      });
    }
  }
}
