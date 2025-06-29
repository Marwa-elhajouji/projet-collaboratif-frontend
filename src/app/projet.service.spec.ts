import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Projet, ProjetService } from './projet.service';
import { TestBed } from '@angular/core/testing';

describe('ProjetService', () => {
  let service: ProjetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjetService],
    });
    service = TestBed.inject(ProjetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getProjets', () => {
    it('should retrieve all projets', () => {
      const mockProjets: Projet[] = [
        { id: 1, nom: 'Projet 1', description: 'Description 1' },
        { id: 2, nom: 'Projet 2', description: 'Description 2' },
      ];

      service.getProjets().subscribe((projets) => {
        expect(projets.length).toBe(2);
        expect(projets).toEqual(mockProjets);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProjets);
    });

    it('should handle errors when retrieving projets', () => {
      service.getProjets().subscribe({
        next: () => fail('Expected an error, not projets'),
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

    it('should handle empty list of projets', () => {
      service.getProjets().subscribe((projets) => {
        expect(projets.length).toBe(0); 
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush([]); 
    });
  });


  describe('getAllProjets', () => {
    it('should retrieve all projets using getAllProjets', () => {
      const mockProjets: Projet[] = [
        { id: 1, nom: 'Projet 1', description: 'Description 1' },
        { id: 2, nom: 'Projet 2', description: 'Description 2' },
      ];

      service.getAllProjets().subscribe((projets) => {
        expect(projets.length).toBe(2);
        expect(projets).toEqual(mockProjets);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProjets);
    });
  });


  describe('addProjet', () => {
    it('should add a new projet', () => {
      const newProjet: Projet = {
        nom: 'Nouveau Projet',
        description: 'Description du projet',
      };

      service.addProjet(newProjet).subscribe((projet) => {
        expect(projet).toEqual({ ...newProjet, id: 1 });
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProjet);
      req.flush({ ...newProjet, id: 1 }); 
    });

    it('should handle errors when adding a projet', () => {
      const newProjet: Projet = {
        nom: 'Nouveau Projet',
        description: 'Description test',
      };

      service.addProjet(newProjet).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
    });

    it('should throw an error when adding an invalid projet', () => {
      const invalidProjet: any = { description: 'Description sans nom' }; 

      service.addProjet(invalidProjet).subscribe({
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


  describe('deleteProjet', () => {
    it('should delete a projet', () => {
      const projetId = 1;

      service.deleteProjet(projetId).subscribe(() => {
        expect(true).toBeTruthy(); 
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${projetId}`);
      expect(req.request.method).toBe('DELETE'); 
      req.flush(null); 
    });

    it('should handle errors when deleting a projet', () => {
      const projetId = 1;

      service.deleteProjet(projetId).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${projetId}`);
      req.flush('Projet not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
