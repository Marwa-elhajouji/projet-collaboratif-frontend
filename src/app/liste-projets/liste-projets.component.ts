
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

  constructor(private projetService: ProjetService, private fb: FormBuilder) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
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
    if (this.projetForm.valid) {
      this.projetService.addProjet(this.projetForm.value).subscribe(() => {
        this.projetForm.reset();
        this.chargerProjets();
      });
    }
  }
}
