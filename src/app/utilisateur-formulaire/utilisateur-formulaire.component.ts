import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './utilisateur-formulaire.component.html',
})
export class UtilisateurFormulaireComponent implements OnInit {
  utilisateurForm: FormGroup;
  utilisateurId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.utilisateurId = +idParam;
      this.utilisateurService
        .getUtilisateur(this.utilisateurId)
        .subscribe((data) => {
          this.utilisateurForm.patchValue({
            nom: data.nom,
            email: data.email,
            motDePasse: data.motDePasse,
            roleId: data.role?.id,
          });
        });
    }
  }

  onSubmit(): void {
    if (this.utilisateurForm.valid) {
      const formValue = this.utilisateurForm.value;
      const utilisateurData = {
        nom: formValue.nom,
        email: formValue.email,
        motDePasse: formValue.motDePasse,
        role: { id: Number(formValue.roleId) },
      };

      if (this.utilisateurId) {
        this.utilisateurService
          .updateUtilisateur(this.utilisateurId, utilisateurData)
          .subscribe({
            next: () => {
              alert('Utilisateur mis à jour avec succès !');
              this.router.navigate(['/utilisateurs']);
            },
            error: () => {
              alert('Une erreur est survenue lors de la mise à jour.');
            },
          });
      } else {
        this.utilisateurService.addUtilisateur(utilisateurData).subscribe({
          next: () => {
            alert('Utilisateur ajouté avec succès !');
            this.router.navigate(['/utilisateurs']);
          },
          error: () => {
            alert("Une erreur est survenue lors de l'ajout.");
          },
        });
      }
    }
  }
}
