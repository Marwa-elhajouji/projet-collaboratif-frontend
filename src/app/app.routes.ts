import { Routes } from '@angular/router';
import { UtilisateurFormulaireComponent } from './utilisateur-formulaire/utilisateur-formulaire.component';
import { ProjetFormulaireComponent } from './projet-formulaire/projet-formulaire.component';
import { TacheComponent } from './tache/tache.component';

export const routes: Routes = [
  { path: 'utilisateurs', component: UtilisateurFormulaireComponent },
  { path: 'projets', component: ProjetFormulaireComponent },
  { path: 'taches', component: TacheComponent },
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
];
