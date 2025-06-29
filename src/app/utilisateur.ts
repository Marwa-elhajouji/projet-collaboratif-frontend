import { Role } from './role';

export interface Utilisateur {
  id?: number;
  nom: string;
  email: string;
  motDePasse: string;
  role?: Role | { id: number };
}
