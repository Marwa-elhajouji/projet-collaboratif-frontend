import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjetService } from '../projet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projet-formulaire.component.html',
})
export class ProjetFormulaireComponent implements OnInit {
  projetForm: FormGroup;
  projets: any[] = [];
  editing = false;
  editedProjetId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.projetService.getAllProjets().subscribe((data) => {
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
          this.refreshList();
          this.cancelEdit();
          alert('Projet mis à jour avec succès !');
        });
    } else {
      this.projetService.addProjet(projetData).subscribe(() => {
        this.refreshList();
        this.projetForm.reset();
        alert('Projet ajouté avec succès !');
      });
    }
  }

  onEdit(projet: any): void {
    this.editing = true;
    this.editedProjetId = projet.id!;
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
        this.refreshList();
        alert('Projet supprimé.');
      });
    }
  }
}
