import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConseil } from '../conseil.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../conseil.test-samples';

import { ConseilService } from './conseil.service';

const requireRestSample: IConseil = {
  ...sampleWithRequiredData,
};

describe('Conseil Service', () => {
  let service: ConseilService;
  let httpMock: HttpTestingController;
  let expectedResult: IConseil | IConseil[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConseilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Conseil', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const conseil = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(conseil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Conseil', () => {
      const conseil = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(conseil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Conseil', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Conseil', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Conseil', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConseilToCollectionIfMissing', () => {
      it('should add a Conseil to an empty array', () => {
        const conseil: IConseil = sampleWithRequiredData;
        expectedResult = service.addConseilToCollectionIfMissing([], conseil);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conseil);
      });

      it('should not add a Conseil to an array that contains it', () => {
        const conseil: IConseil = sampleWithRequiredData;
        const conseilCollection: IConseil[] = [
          {
            ...conseil,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConseilToCollectionIfMissing(conseilCollection, conseil);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Conseil to an array that doesn't contain it", () => {
        const conseil: IConseil = sampleWithRequiredData;
        const conseilCollection: IConseil[] = [sampleWithPartialData];
        expectedResult = service.addConseilToCollectionIfMissing(conseilCollection, conseil);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conseil);
      });

      it('should add only unique Conseil to an array', () => {
        const conseilArray: IConseil[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const conseilCollection: IConseil[] = [sampleWithRequiredData];
        expectedResult = service.addConseilToCollectionIfMissing(conseilCollection, ...conseilArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conseil: IConseil = sampleWithRequiredData;
        const conseil2: IConseil = sampleWithPartialData;
        expectedResult = service.addConseilToCollectionIfMissing([], conseil, conseil2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conseil);
        expect(expectedResult).toContain(conseil2);
      });

      it('should accept null and undefined values', () => {
        const conseil: IConseil = sampleWithRequiredData;
        expectedResult = service.addConseilToCollectionIfMissing([], null, conseil, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conseil);
      });

      it('should return initial array if no Conseil is added', () => {
        const conseilCollection: IConseil[] = [sampleWithRequiredData];
        expectedResult = service.addConseilToCollectionIfMissing(conseilCollection, undefined, null);
        expect(expectedResult).toEqual(conseilCollection);
      });
    });

    describe('compareConseil', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConseil(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConseil(entity1, entity2);
        const compareResult2 = service.compareConseil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConseil(entity1, entity2);
        const compareResult2 = service.compareConseil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConseil(entity1, entity2);
        const compareResult2 = service.compareConseil(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
