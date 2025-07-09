import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Tache, TacheService } from './tache.service';

describe('TacheService', () => {
  let service: TacheService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TacheService],
    });
    service = TestBed.inject(TacheService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAllTaches', () => {
    it('should retrieve all taches', () => {
      const mockTaches: Tache[] = [
        {
          id: 1,
          titre: 'Tâche 1',
          description: 'Description 1',
          dateDebut: '2023-06-01',
          dateFin: '2023-06-10',
          statut: 'A_FAIRE',
          utilisateurId: 1,
          projetId: 1,
        },
        {
          id: 2,
          titre: 'Tâche 2',
          description: 'Description 2',
          dateDebut: '2023-07-01',
          dateFin: '2023-07-10',
          statut: 'EN_COURS',
          utilisateurId: 2,
          projetId: 2,
        },
      ];

      service.getAllTaches().subscribe((taches) => {
        expect(taches.length).toBe(2);
        expect(taches).toEqual(mockTaches);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}`);
      expect(req.request.method).toBe('GET'); 
      req.flush(mockTaches); 
    });

    it('should handle errors when retrieving taches', () => {
      service.getAllTaches().subscribe({
        next: () => fail('Expected an error, not taches'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        },
      });

      const req = httpMock.expectOne(`${service['baseUrl']}`);
      req.flush('Erreur serveur', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should handle empty list of taches', () => {
      service.getAllTaches().subscribe((taches) => {
        expect(taches.length).toBe(0); 
      });

      const req = httpMock.expectOne(`${service['baseUrl']}`);
      req.flush([]); 
    });
  });


  describe('addTache', () => {
    it('should add a new tache', () => {
      const newTache: Tache = {
        titre: 'Nouvelle Tâche',
        description: 'Description de la tâche',
        dateDebut: '2023-06-01',
        dateFin: '2023-06-10',
        statut: 'A_FAIRE',
        utilisateurId: 1,
        projetId: 1,
      };
      const apiResponse: Tache = {
        ...newTache,
        id: 3,
      };

      service.addTache(newTache).subscribe((tache) => {
        expect(tache).toEqual(apiResponse);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        ...newTache,
        utilisateurAssigne: { id: 1 },
        projet: { id: 1 },
      });
      req.flush(apiResponse);
    });

    it('should handle errors when adding a tache', () => {
      const newTache: Tache = {
        titre: 'Nouvelle Tâche',
        description: 'Description de la tâche',
        dateDebut: '2023-06-01',
        dateFin: '2023-06-10',
        statut: 'A_FAIRE',
        utilisateurId: 1,
        projetId: 1,
      };

      service.addTache(newTache).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        },
      });

      const req = httpMock.expectOne(`${service['baseUrl']}`);
      req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
    });
  });


  describe('deleteTache', () => {
    it('should delete a tache', () => {
      const tacheId = 1;

      service.deleteTache(tacheId).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/${tacheId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle errors when deleting a tache', () => {
      const tacheId = 1;

      service.deleteTache(tacheId).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/${tacheId}`);
      req.flush('Tache not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
