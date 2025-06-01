import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjetService } from '../projet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projet-formulaire.component.html',
})
export class ProjetFormulaireComponent {
  projetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      this.projetService.addProjet(this.projetForm.value).subscribe(() => {
        this.projetForm.reset();
        alert('Projet ajouté avec succès !');
        this.router.navigate(['/projets']);
      });
    }
  }
}
