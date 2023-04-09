import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RestaurantFormService } from './restaurant-form.service';
import { RestaurantService } from '../service/restaurant.service';
import { IRestaurant } from '../restaurant.model';
import { ICooperative } from 'app/entities/cooperative/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/service/cooperative.service';

import { RestaurantUpdateComponent } from './restaurant-update.component';

describe('Restaurant Management Update Component', () => {
  let comp: RestaurantUpdateComponent;
  let fixture: ComponentFixture<RestaurantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let restaurantFormService: RestaurantFormService;
  let restaurantService: RestaurantService;
  let cooperativeService: CooperativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RestaurantUpdateComponent],
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
      .overrideTemplate(RestaurantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    restaurantFormService = TestBed.inject(RestaurantFormService);
    restaurantService = TestBed.inject(RestaurantService);
    cooperativeService = TestBed.inject(CooperativeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cooperative query and add missing value', () => {
      const restaurant: IRestaurant = { id: 456 };
      const cooperative: ICooperative = { id: 39643 };
      restaurant.cooperative = cooperative;

      const cooperativeCollection: ICooperative[] = [{ id: 4916 }];
      jest.spyOn(cooperativeService, 'query').mockReturnValue(of(new HttpResponse({ body: cooperativeCollection })));
      const additionalCooperatives = [cooperative];
      const expectedCollection: ICooperative[] = [...additionalCooperatives, ...cooperativeCollection];
      jest.spyOn(cooperativeService, 'addCooperativeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ restaurant });
      comp.ngOnInit();

      expect(cooperativeService.query).toHaveBeenCalled();
      expect(cooperativeService.addCooperativeToCollectionIfMissing).toHaveBeenCalledWith(
        cooperativeCollection,
        ...additionalCooperatives.map(expect.objectContaining)
      );
      expect(comp.cooperativesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const restaurant: IRestaurant = { id: 456 };
      const cooperative: ICooperative = { id: 71442 };
      restaurant.cooperative = cooperative;

      activatedRoute.data = of({ restaurant });
      comp.ngOnInit();

      expect(comp.cooperativesSharedCollection).toContain(cooperative);
      expect(comp.restaurant).toEqual(restaurant);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRestaurant>>();
      const restaurant = { id: 123 };
      jest.spyOn(restaurantFormService, 'getRestaurant').mockReturnValue(restaurant);
      jest.spyOn(restaurantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurant }));
      saveSubject.complete();

      // THEN
      expect(restaurantFormService.getRestaurant).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(restaurantService.update).toHaveBeenCalledWith(expect.objectContaining(restaurant));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRestaurant>>();
      const restaurant = { id: 123 };
      jest.spyOn(restaurantFormService, 'getRestaurant').mockReturnValue({ id: null });
      jest.spyOn(restaurantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurant: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurant }));
      saveSubject.complete();

      // THEN
      expect(restaurantFormService.getRestaurant).toHaveBeenCalled();
      expect(restaurantService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRestaurant>>();
      const restaurant = { id: 123 };
      jest.spyOn(restaurantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(restaurantService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCooperative', () => {
      it('Should forward to cooperativeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cooperativeService, 'compareCooperative');
        comp.compareCooperative(entity, entity2);
        expect(cooperativeService.compareCooperative).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
