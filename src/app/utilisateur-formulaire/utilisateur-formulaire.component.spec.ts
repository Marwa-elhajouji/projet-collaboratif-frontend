import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurFormulaireComponent } from './utilisateur-formulaire.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UtilisateurService } from '../utilisateur.service';

describe('UtilisateurFormulaireComponent', () => {
  let component: UtilisateurFormulaireComponent;
  let fixture: ComponentFixture<UtilisateurFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UtilisateurFormulaireComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilisateurFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate empty form', () => {
    expect(component.utilisateurForm.valid).toBeFalse();
  });
  it('should validate form with correct values', () => {
    component.utilisateurForm.setValue({
      nom: 'Test Nom',
      email: 'test@example.com',
      motDePasse: '123456',
      roleId: 1,
    });

    expect(component.utilisateurForm.valid).toBeTrue();
  });
  it('should call utilisateurService.ajouterUtilisateur on submit if form is valid', () => {
    const utilisateurService = TestBed.inject(UtilisateurService);
    spyOn(utilisateurService, 'addUtilisateur').and.returnValue(
      of({
        id: 1,
        nom: 'Test',
        email: 'test@test.com',
        motDePasse: '123456',
        role: { id: 2 },
      })
    );

    component.utilisateurForm.setValue({
      nom: 'Test',
      email: 'test@test.com',
      motDePasse: '123456',
      roleId: 2,
    });

    component.onSubmit();

    expect(utilisateurService.addUtilisateur).toHaveBeenCalled();
  });
});
