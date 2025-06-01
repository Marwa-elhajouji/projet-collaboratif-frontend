import { Routes } from '@angular/router';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { UtilisateurFormulaireComponent } from './utilisateur-formulaire/utilisateur-formulaire.component';
import { ProjetFormulaireComponent } from './projet-formulaire/projet-formulaire.component';
import { TacheComponent } from './tache/tache.component';
import { ListeProjetsComponent } from './liste-projets/liste-projets.component';

export const routes: Routes = [
  { path: 'utilisateurs', component: ListeUtilisateursComponent },
  { path: 'utilisateurs/nouveau', component: UtilisateurFormulaireComponent },
  {
    path: 'utilisateurs/modifier/:id',
    component: UtilisateurFormulaireComponent,
  },
  // { path: 'projets', component: ProjetFormulaireComponent },
  { path: 'projets', component: ListeProjetsComponent },

  { path: 'projets/nouveau', component: ProjetFormulaireComponent },

  { path: 'taches', component: TacheComponent },
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
];
