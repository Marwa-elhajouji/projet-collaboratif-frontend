import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { UtilisateurService } from './utilisateur.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    UtilisateurService
  ]
};
