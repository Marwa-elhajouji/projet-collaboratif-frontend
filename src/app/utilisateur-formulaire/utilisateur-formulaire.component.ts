import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateur-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './utilisateur-formulaire.component.html',
})
export class UtilisateurFormulaireComponent {
  utilisateurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.utilisateurForm.valid) {
      this.utilisateurService.addUtilisateur(this.utilisateurForm.value).subscribe(() => {
        this.utilisateurForm.reset();
      });
    }
  }
}
