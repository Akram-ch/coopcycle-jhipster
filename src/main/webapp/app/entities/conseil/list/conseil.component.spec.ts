import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConseilService } from '../service/conseil.service';

import { ConseilComponent } from './conseil.component';

describe('Conseil Management Component', () => {
  let comp: ConseilComponent;
  let fixture: ComponentFixture<ConseilComponent>;
  let service: ConseilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'conseil', component: ConseilComponent }]), HttpClientTestingModule],
      declarations: [ConseilComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ConseilComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConseilComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConseilService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.conseils?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to conseilService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConseilIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConseilIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
