import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../conseil.test-samples';

import { ConseilFormService } from './conseil-form.service';

describe('Conseil Form Service', () => {
  let service: ConseilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConseilFormService);
  });

  describe('Service methods', () => {
    describe('createConseilFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConseilFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            directeur: expect.any(Object),
          })
        );
      });

      it('passing IConseil should create a new form with FormGroup', () => {
        const formGroup = service.createConseilFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            directeur: expect.any(Object),
          })
        );
      });
    });

    describe('getConseil', () => {
      it('should return NewConseil for default Conseil initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConseilFormGroup(sampleWithNewData);

        const conseil = service.getConseil(formGroup) as any;

        expect(conseil).toMatchObject(sampleWithNewData);
      });

      it('should return NewConseil for empty Conseil initial value', () => {
        const formGroup = service.createConseilFormGroup();

        const conseil = service.getConseil(formGroup) as any;

        expect(conseil).toMatchObject({});
      });

      it('should return IConseil', () => {
        const formGroup = service.createConseilFormGroup(sampleWithRequiredData);

        const conseil = service.getConseil(formGroup) as any;

        expect(conseil).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConseil should not enable id FormControl', () => {
        const formGroup = service.createConseilFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConseil should disable id FormControl', () => {
        const formGroup = service.createConseilFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
