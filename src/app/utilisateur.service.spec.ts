import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';

describe('UtilisateurService', () => {
  let service: UtilisateurService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilisateurService],
    });
    service = TestBed.inject(UtilisateurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getUtilisateurs', () => {
    it('should retrieve all utilisateurs', () => {
      const mockUtilisateurs: Utilisateur[] = [
        {
          id: 1,
          nom: 'Utilisateur 1',
          email: 'user1@example.com',
          motDePasse: 'hashedPassword1',
          role: { id: 1, nom: 'ADMIN' },
        },
        {
          id: 2,
          nom: 'Utilisateur 2',
          email: 'user2@example.com',
          motDePasse: 'hashedPassword2',
          role: { id: 2, nom: 'USER' },
        },
      ];

      service.getUtilisateurs().subscribe((utilisateurs) => {
        expect(utilisateurs.length).toBe(2);
        expect(utilisateurs).toEqual(mockUtilisateurs);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUtilisateurs);
    });

    it('should handle errors when retrieving utilisateurs', () => {
      service.getUtilisateurs().subscribe({
        next: () => fail('Expected an error, not utilisateurs'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush('Erreur serveur', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getUtilisateur', () => {
    it('should retrieve a single utilisateur by ID', () => {
      const mockUtilisateur: Utilisateur = {
        id: 1,
        nom: 'Utilisateur 1',
        email: 'user1@example.com',
        motDePasse: 'hashedPassword1',
        role: { id: 1, nom: 'ADMIN' },
      };

      service.getUtilisateur(1).subscribe((utilisateur) => {
        expect(utilisateur).toEqual(mockUtilisateur);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUtilisateur);
    });

    it('should return an error if utilisateur not found', () => {
      service.getUtilisateur(1).subscribe({
        next: () => fail('Expected an error, not utilisateur'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/1`);
      req.flush('Utilisateur not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });


  describe('addUtilisateur', () => {
    it('should add a new utilisateur', () => {
      const newUtilisateur: Utilisateur = {
        nom: 'Utilisateur Nouveau',
        email: 'newuser@example.com',
        motDePasse: 'hashedPassword3',
        role: { id: 2 },
      };

      service.addUtilisateur(newUtilisateur).subscribe((utilisateur) => {
        expect(utilisateur).toEqual({ ...newUtilisateur, id: 3 });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUtilisateur);
      req.flush({ ...newUtilisateur, id: 3 });
    });

    it('should handle errors when adding a utilisateur', () => {
      const newUtilisateur: Utilisateur = {
        nom: 'Utilisateur Nouveau',
        email: 'newuser@example.com',
        motDePasse: 'hashedPassword3',
        role: { id: 2 },
      };

      service.addUtilisateur(newUtilisateur).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateUtilisateur', () => {
    it('should update an existing utilisateur', () => {
      const updatedUtilisateur: Utilisateur = {
        id: 1,
        nom: 'Utilisateur Modifié',
        email: 'modifieduser@example.com',
        motDePasse: 'hashedPassword4',
        role: { id: 1 },
      };

      service
        .updateUtilisateur(1, updatedUtilisateur)
        .subscribe((utilisateur) => {
          expect(utilisateur).toEqual(updatedUtilisateur);
        });

      const req = httpMock.expectOne(`${service['apiUrl']}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedUtilisateur);
      req.flush(updatedUtilisateur);
    });

    it('should handle errors when updating a utilisateur', () => {
      const updatedUtilisateur: Utilisateur = {
        id: 1,
        nom: 'Utilisateur Modifié',
        email: 'modifieduser@example.com',
        motDePasse: 'hashedPassword4',
        role: { id: 1 },
      };

      service.updateUtilisateur(1, updatedUtilisateur).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/1`);
      req.flush('Utilisateur not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });

  describe('deleteUtilisateur', () => {
    it('should delete a utilisateur', () => {
      const utilisateurId = 1;

      service.deleteUtilisateur(utilisateurId).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${utilisateurId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle errors when deleting a utilisateur', () => {
      const utilisateurId = 1;

      service.deleteUtilisateur(utilisateurId).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${utilisateurId}`);
      req.flush('Utilisateur not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
