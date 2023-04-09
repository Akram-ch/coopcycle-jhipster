import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConseilFormService } from './conseil-form.service';
import { ConseilService } from '../service/conseil.service';
import { IConseil } from '../conseil.model';

import { ConseilUpdateComponent } from './conseil-update.component';

describe('Conseil Management Update Component', () => {
  let comp: ConseilUpdateComponent;
  let fixture: ComponentFixture<ConseilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conseilFormService: ConseilFormService;
  let conseilService: ConseilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConseilUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ConseilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConseilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conseilFormService = TestBed.inject(ConseilFormService);
    conseilService = TestBed.inject(ConseilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const conseil: IConseil = { id: 456 };

      activatedRoute.data = of({ conseil });
      comp.ngOnInit();

      expect(comp.conseil).toEqual(conseil);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConseil>>();
      const conseil = { id: 123 };
      jest.spyOn(conseilFormService, 'getConseil').mockReturnValue(conseil);
      jest.spyOn(conseilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conseil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conseil }));
      saveSubject.complete();

      // THEN
      expect(conseilFormService.getConseil).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conseilService.update).toHaveBeenCalledWith(expect.objectContaining(conseil));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConseil>>();
      const conseil = { id: 123 };
      jest.spyOn(conseilFormService, 'getConseil').mockReturnValue({ id: null });
      jest.spyOn(conseilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conseil: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conseil }));
      saveSubject.complete();

      // THEN
      expect(conseilFormService.getConseil).toHaveBeenCalled();
      expect(conseilService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConseil>>();
      const conseil = { id: 123 };
      jest.spyOn(conseilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conseil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conseilService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
