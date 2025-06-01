import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeProjetsComponent } from './liste-projets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Projet, ProjetService } from '../projet.service';


describe('ListeProjetsComponent', () => {
  let component: ListeProjetsComponent;
  let fixture: ComponentFixture<ListeProjetsComponent>;
  let projetService: ProjetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeProjetsComponent, HttpClientTestingModule],
      providers: [ProjetService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeProjetsComponent);
    component = fixture.componentInstance;
    projetService = TestBed.inject(ProjetService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projets', () => {
    const fakeProjets: Projet[] = [
      {
        id: 1,
        nom: 'Projet Test',
        description: 'Description test',

      }
    ];

    spyOn(projetService, 'getProjets').and.returnValue(of(fakeProjets));

    component.ngOnInit();

    expect(component.projets.length).toBe(1);
    expect(component.projets[0].nom).toBe('Projet Test');
  });
  
});
