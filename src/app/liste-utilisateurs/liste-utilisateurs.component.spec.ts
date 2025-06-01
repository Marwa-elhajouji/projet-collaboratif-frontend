import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeUtilisateursComponent } from './liste-utilisateurs.component';
import { UtilisateurService } from '../utilisateur.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Utilisateur } from '../utilisateur';

describe('ListeUtilisateursComponent', () => {
  let component: ListeUtilisateursComponent;
  let fixture: ComponentFixture<ListeUtilisateursComponent>;
  let utilisateurService: UtilisateurService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeUtilisateursComponent, HttpClientTestingModule],
      providers: [UtilisateurService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeUtilisateursComponent);
    component = fixture.componentInstance;
    utilisateurService = TestBed.inject(UtilisateurService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load utilisateurs', () => {
    const fakeUtilisateurs: Utilisateur[] = [
      {
        id: 1,
        nom: 'Test',
        email: 'test@example.com',
        motDePasse: '123456',
        role: {id: 2}
      }
    ];

    spyOn(utilisateurService, 'getUtilisateurs').and.returnValue(of(fakeUtilisateurs));

    component.ngOnInit();

    expect(component.utilisateurs.length).toBe(1);
    expect(component.utilisateurs[0].nom).toBe('Test');
  });
  it('should call getUtilisateurs on init', () => {
  const fakeUtilisateurs = [{
    id: 1,
    nom: 'John Doe',
    email: 'john@example.com',
    motDePasse: '123456',
    role: { id: 1 }
  }];
  spyOn(utilisateurService, 'getUtilisateurs').and.returnValue(of(fakeUtilisateurs));

  component.ngOnInit();

  expect(component.utilisateurs.length).toBe(1);
});

});
