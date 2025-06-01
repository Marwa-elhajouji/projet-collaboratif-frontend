import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetFormulaireComponent } from './projet-formulaire.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjetService } from '../projet.service';
import { of } from 'rxjs';

describe('ProjetFormulaireComponent', () => {
  let component: ProjetFormulaireComponent;
  let fixture: ComponentFixture<ProjetFormulaireComponent>;
  let projetService: ProjetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ProjetFormulaireComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetFormulaireComponent);
    component = fixture.componentInstance;
    projetService = TestBed.inject(ProjetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate empty form', () => {
    expect(component.projetForm.valid).toBeFalse();
  });

  it('should validate form with values', () => {
    component.projetForm.patchValue({
      nom: 'Projet test',
      description: 'Description test',
      utilisateurId: 1,
    });
    expect(component.projetForm.valid).toBeTrue();
  });


});
