import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { Projet, ProjetService } from '../projet.service';

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

  it('should retrieve all projets', () => {
    const mockProjets: Projet[] = [
      { id: 1, nom: 'Projet 1', description: 'Description 1' },
      { id: 2, nom: 'Projet 2', description: 'Description 2' },
    ];

    service.getProjets().subscribe((projets: Projet[]) => {
      expect(projets.length).toBe(2);
      expect(projets).toEqual(mockProjets);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjets);
  });

  it('should add a new projet', () => {
    const newProjet: Projet = {
      nom: 'Nouveau Projet',
      description: 'Description test',
    };

    service.addProjet(newProjet).subscribe((projet: Projet) => {
      expect(projet).toEqual({ ...newProjet, id: 1 });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newProjet, id: 1 });
  });

  it('should delete a projet', () => {
    const projetId = 1;

    service.deleteProjet(projetId).subscribe(() => {
      expect(true).toBeTruthy(); 
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${projetId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle errors when retrieving projets', () => {
    service.getProjets().subscribe({
      next: () => fail('Expected an error, not projets'),
      error: (error: HttpErrorResponse) => {
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

  it('should handle errors when adding a projet', () => {
    const newProjet: Projet = {
      nom: 'Nouveau Projet',
      description: 'Description test',
    };

    service.addProjet(newProjet).subscribe({
      next: () => fail('Expected an error, not a successful response'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    req.flush('Requête invalide', { status: 400, statusText: 'Bad Request' });
  });
});
