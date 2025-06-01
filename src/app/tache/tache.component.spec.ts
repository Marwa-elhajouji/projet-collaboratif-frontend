import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TacheComponent } from './tache.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TacheService } from '../tache.service';
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
    const spy = spyOn(tacheService, 'addTache').and.returnValue(
      of({
        titre: 'Tâche test',
        description: 'Desc test',
        dateDebut: '2025-06-01',
        dateFin: '2025-06-10',
        statut: 'A_FAIRE' as 'A_FAIRE',
        utilisateurId: 1,
        projetId: 1,
      })
    );
    const tacheMock = {
      titre: 'Tâche test',
      description: 'Desc test',
      dateDebut: '2025-06-02',
      dateFin: '2025-06-10',
      statut: 'A_FAIRE' as 'A_FAIRE',

      utilisateurId: 1,
      projetId: 1,
    };

    component.nouvelleTache = { ...tacheMock };

    component.ajouterTache();
  });
});
