import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TacheComponent } from './tache.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Tache, TacheService } from '../tache.service';
import { of } from 'rxjs';

describe('TacheComponent', () => {
  let component: TacheComponent;
  let fixture: ComponentFixture<TacheComponent>;
  let tacheService: TacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TacheComponent);
    component = fixture.componentInstance;
    tacheService = TestBed.inject(TacheService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTache and reset nouvelleTache', () => {
    const expectedTache = {
      titre: 'Test',
      description: 'Desc',
      dateDebut: '2025-06-01',
      dateFin: '2025-06-02',
      statut: 'A_FAIRE' as 'A_FAIRE',
      utilisateurId: 1,
      projetId: 1,
    };

    const spy = spyOn(tacheService, 'addTache').and.returnValue(
      of(expectedTache)
    );
    const chargerSpy = spyOn(component, 'chargerTaches');

    component.nouvelleTache = { ...expectedTache };

    component.ajouterTache();

    expect(spy).toHaveBeenCalledWith(expectedTache);
    expect(chargerSpy).toHaveBeenCalled();
    expect(component.nouvelleTache).toEqual({
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      statut: 'A_FAIRE',
      utilisateurId: 1,
      projetId: 1,
    });
  });

  it('should load tasks on init', () => {
    const mockTaches: Tache[] = [
      {
        titre: 'Tâche 1',
        description: 'Description 1',
        dateDebut: '2025-06-01',
        dateFin: '2025-06-02',
        statut: 'A_FAIRE',
        utilisateurId: 1,
        projetId: 1,
      },
      {
        titre: 'Tâche 2',
        description: 'Description 2',
        dateDebut: '2025-06-03',
        dateFin: '2025-06-04',
        statut: 'EN_COURS',
        utilisateurId: 2,
        projetId: 1,
      },
    ];

    spyOn(tacheService, 'getAllTaches').and.returnValue(of(mockTaches));

    component.ngOnInit();

    expect(component.taches).toEqual(mockTaches);
  });

  it('should call deleteTache and refresh list', () => {
    const deleteSpy = spyOn(tacheService, 'deleteTache').and.returnValue(
      of(undefined)
    );
    const chargerSpy = spyOn(component, 'chargerTaches');

    component.supprimerTache(123);

    expect(deleteSpy).toHaveBeenCalledWith(123);
    expect(chargerSpy).toHaveBeenCalled();
  });
});
