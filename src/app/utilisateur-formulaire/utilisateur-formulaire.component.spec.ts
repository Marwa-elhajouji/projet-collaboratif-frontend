import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurFormulaireComponent } from './utilisateur-formulaire.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UtilisateurService } from '../utilisateur.service';
import { ActivatedRoute } from '@angular/router';

describe('UtilisateurFormulaireComponent', () => {
  let component: UtilisateurFormulaireComponent;
  let fixture: ComponentFixture<UtilisateurFormulaireComponent>;
  let utilisateurService: UtilisateurService;

  describe('in create mode', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          UtilisateurFormulaireComponent,
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => null,
                },
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UtilisateurFormulaireComponent);
      component = fixture.componentInstance;
      utilisateurService = TestBed.inject(UtilisateurService);
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
    it('should call utilisateurService.addUtilisateur on submit if form is valid', () => {
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

  describe('in edit mode', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          UtilisateurFormulaireComponent,
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '1',
                },
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UtilisateurFormulaireComponent);
      component = fixture.componentInstance;
      utilisateurService = TestBed.inject(UtilisateurService);

      spyOn(utilisateurService, 'getUtilisateur').and.returnValue(
        of({
          id: 1,
          nom: 'Edit Nom',
          email: 'edit@test.com',
          motDePasse: 'edit123',
          role: { id: 2 },
        })
      );

      fixture.detectChanges();
    });

    it('should fetch and patch form values on init', () => {
      component.ngOnInit();

      expect(utilisateurService.getUtilisateur).toHaveBeenCalledWith(1);
      expect(component.utilisateurForm.value).toEqual({
        nom: 'Edit Nom',
        email: 'edit@test.com',
        motDePasse: 'edit123',
        roleId: 2,
      });
    });
  });
});
