import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurFormulaireComponent } from '../app/utilisateur-formulaire/utilisateur-formulaire.component';
import { ProjetFormulaireComponent } from '../app/projet-formulaire/projet-formulaire.component';
import { TacheComponent } from './tache/tache.component';

const routes: Routes = [
  { path: 'utilisateurs', component: UtilisateurFormulaireComponent },
  { path: 'projets', component: ProjetFormulaireComponent },
  { path: 'taches', component: TacheComponent },
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
