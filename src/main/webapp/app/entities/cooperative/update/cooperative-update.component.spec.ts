import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CooperativeFormService } from './cooperative-form.service';
import { CooperativeService } from '../service/cooperative.service';
import { ICooperative } from '../cooperative.model';
import { IConseil } from 'app/entities/conseil/conseil.model';
import { ConseilService } from 'app/entities/conseil/service/conseil.service';

import { CooperativeUpdateComponent } from './cooperative-update.component';

describe('Cooperative Management Update Component', () => {
  let comp: CooperativeUpdateComponent;
  let fixture: ComponentFixture<CooperativeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cooperativeFormService: CooperativeFormService;
  let cooperativeService: CooperativeService;
  let conseilService: ConseilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CooperativeUpdateComponent],
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
      .overrideTemplate(CooperativeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CooperativeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cooperativeFormService = TestBed.inject(CooperativeFormService);
    cooperativeService = TestBed.inject(CooperativeService);
    conseilService = TestBed.inject(ConseilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call conseil query and add missing value', () => {
      const cooperative: ICooperative = { id: 456 };
      const conseil: IConseil = { id: 61001 };
      cooperative.conseil = conseil;

      const conseilCollection: IConseil[] = [{ id: 87242 }];
      jest.spyOn(conseilService, 'query').mockReturnValue(of(new HttpResponse({ body: conseilCollection })));
      const expectedCollection: IConseil[] = [conseil, ...conseilCollection];
      jest.spyOn(conseilService, 'addConseilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cooperative });
      comp.ngOnInit();

      expect(conseilService.query).toHaveBeenCalled();
      expect(conseilService.addConseilToCollectionIfMissing).toHaveBeenCalledWith(conseilCollection, conseil);
      expect(comp.conseilsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cooperative: ICooperative = { id: 456 };
      const conseil: IConseil = { id: 33800 };
      cooperative.conseil = conseil;

      activatedRoute.data = of({ cooperative });
      comp.ngOnInit();

      expect(comp.conseilsCollection).toContain(conseil);
      expect(comp.cooperative).toEqual(cooperative);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICooperative>>();
      const cooperative = { id: 123 };
      jest.spyOn(cooperativeFormService, 'getCooperative').mockReturnValue(cooperative);
      jest.spyOn(cooperativeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cooperative });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cooperative }));
      saveSubject.complete();

      // THEN
      expect(cooperativeFormService.getCooperative).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cooperativeService.update).toHaveBeenCalledWith(expect.objectContaining(cooperative));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICooperative>>();
      const cooperative = { id: 123 };
      jest.spyOn(cooperativeFormService, 'getCooperative').mockReturnValue({ id: null });
      jest.spyOn(cooperativeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cooperative: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cooperative }));
      saveSubject.complete();

      // THEN
      expect(cooperativeFormService.getCooperative).toHaveBeenCalled();
      expect(cooperativeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICooperative>>();
      const cooperative = { id: 123 };
      jest.spyOn(cooperativeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cooperative });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cooperativeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareConseil', () => {
      it('Should forward to conseilService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(conseilService, 'compareConseil');
        comp.compareConseil(entity, entity2);
        expect(conseilService.compareConseil).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
