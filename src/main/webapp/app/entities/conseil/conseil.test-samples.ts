import { IConseil, NewConseil } from './conseil.model';

export const sampleWithRequiredData: IConseil = {
  id: 5426,
  directeur: 'methodologies input Ball',
};

export const sampleWithPartialData: IConseil = {
  id: 47668,
  directeur: 'Ridge Marketing',
};

export const sampleWithFullData: IConseil = {
  id: 33813,
  directeur: 'Executive Concrete synthesize',
};

export const sampleWithNewData: NewConseil = {
  directeur: 'invoice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
