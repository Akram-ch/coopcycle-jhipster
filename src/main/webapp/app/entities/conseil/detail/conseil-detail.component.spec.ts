import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConseilDetailComponent } from './conseil-detail.component';

describe('Conseil Management Detail Component', () => {
  let comp: ConseilDetailComponent;
  let fixture: ComponentFixture<ConseilDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConseilDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ conseil: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConseilDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConseilDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load conseil on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.conseil).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
